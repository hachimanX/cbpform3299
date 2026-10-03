import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface RenderedPagesResult {
  pageImages: string[];
  combinedBlob: Blob;
}

/**
 * Renders the filled CBP Form 3299 PDF pages into high-resolution PNG images.
 * This flattens all text and fields into pure raster pixels with watermarks,
 * preventing copying, pasting, or AcroForm extraction.
 */
export async function renderPdfToRasterImages(
  pdfBytes: Uint8Array,
  scale = 1.75
): Promise<RenderedPagesResult> {
  // Use array slice to ensure proper ArrayBuffer typing for PDF.js
  const buffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const pageImages: string[] = [];
  const canvases: HTMLCanvasElement[] = [];

  // We only render Page 1 and Page 2 (the actual declarant form fields and articles)
  // Page 3 is standard boilerplate regulations instructions
  const pagesToRender = Math.min(pdf.numPages, 2);

  for (let pageNum = 1; pageNum <= pagesToRender; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) continue;

    // Fill white background before rendering
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      canvas: canvas,
      viewport: viewport,
      annotationMode: pdfjsLib.AnnotationMode.ENABLE_FORMS,
    }).promise;

    canvases.push(canvas);
    pageImages.push(canvas.toDataURL('image/png'));
  }

  // Create combined vertical image (Page 1 + Page 2 stacked)
  const combinedCanvas = document.createElement('canvas');
  const maxWidth = Math.max(...canvases.map((c) => c.width), 1000);
  const gap = 24; // Divider space between pages
  const totalHeight = canvases.reduce((sum, c) => sum + c.height, 0) + gap * (canvases.length - 1);

  combinedCanvas.width = maxWidth;
  combinedCanvas.height = totalHeight;
  const combinedCtx = combinedCanvas.getContext('2d');

  if (combinedCtx) {
    combinedCtx.fillStyle = '#f1f5f9'; // Slate 100 divider background
    combinedCtx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

    let currentY = 0;
    for (const c of canvases) {
      combinedCtx.drawImage(c, (maxWidth - c.width) / 2, currentY);
      currentY += c.height + gap;
    }
  }

  const combinedBlob = await new Promise<Blob>((resolve, reject) => {
    combinedCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to encode combined PNG'));
    }, 'image/png');
  });

  return { pageImages, combinedBlob };
}

/**
 * Downloads a Blob as a file in the browser
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Downloads a base64 Data URL as a file in the browser
 */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
