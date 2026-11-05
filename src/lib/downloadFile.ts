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

export function downloadPdf(bytes: Uint8Array, filename = 'CBP_Form_3299_Completed.pdf') {
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  downloadBlob(new Blob([buffer], { type: 'application/pdf' }), filename);
}

export function cleanPdfFilename(lastName: string) {
  const clean = lastName.toUpperCase().replace(/[^A-Z0-9]+/g, '').slice(0, 40);
  return `CBP_Form_3299_${clean || 'DECLARATION'}.pdf`;
}
