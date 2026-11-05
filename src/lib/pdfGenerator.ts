import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import type { CBPFormData } from '../types/form';
import { fillCbpForm } from './fillCbpForm';

/**
 * Build a watermarked preview from the blank CBP template.
 * The clean (no watermark) PDF is not produced here. It is returned by the
 * payment worker after Stripe reports payment_status === "paid".
 */
export async function generateWatermarkedPreview(data: CBPFormData): Promise<Uint8Array> {
  const templateUrl = `${import.meta.env.BASE_URL}cbp_form_3299.pdf`;
  const response = await fetch(templateUrl);
  if (!response.ok) {
    throw new Error(`Failed to load base PDF template from ${templateUrl}`);
  }
  const existingPdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  fillCbpForm(pdfDoc, data);

  const fields = pdfDoc.getForm().getFields();
  for (const field of fields) {
    try {
      field.enableReadOnly();
    } catch {
      // Ignore fields without read-only support.
    }
  }

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();
    page.drawText('PREVIEW ONLY • NOT VALID FOR CBP FILING', {
      x: width * 0.1,
      y: height * 0.72,
      size: 22,
      font: boldFont,
      color: rgb(0.85, 0.2, 0.2),
      rotate: degrees(38),
      opacity: 0.22,
    });
    page.drawText('PREVIEW COPY • NOT FOR CBP SUBMISSION', {
      x: width * 0.05,
      y: height * 0.44,
      size: 26,
      font: boldFont,
      color: rgb(0.85, 0.15, 0.15),
      rotate: degrees(38),
      opacity: 0.25,
    });
    page.drawText('cbpform3299.com • PROOFREAD DRAFT • UNVERIFIED', {
      x: width * 0.12,
      y: height * 0.18,
      size: 18,
      font: boldFont,
      color: rgb(0.4, 0.4, 0.4),
      rotate: degrees(38),
      opacity: 0.22,
    });
  }

  return await pdfDoc.save();
}
