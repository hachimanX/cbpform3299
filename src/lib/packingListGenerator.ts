import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { CBPFormData } from '../types/form';

export async function generatePackingListPdf(data: CBPFormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { height } = page.getSize();
  let y = height - 40;

  // Header Bar
  page.drawRectangle({
    x: 40,
    y: y - 35,
    width: 532,
    height: 40,
    color: rgb(0.04, 0.1, 0.2), // Federal Navy
  });

  page.drawText('CBP FORM 3299 SUPPLEMENTAL PACKING INVENTORY', {
    x: 55,
    y: y - 22,
    size: 13,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText('DECLARATION OF UNACCOMPANIED ARTICLES & HOUSEHOLD GOODS', {
    x: 55,
    y: y - 32,
    size: 8,
    font,
    color: rgb(0.85, 0.85, 0.9),
  });

  y -= 60;

  // Importer Info Box
  page.drawRectangle({
    x: 40,
    y: y - 80,
    width: 532,
    height: 80,
    borderColor: rgb(0.8, 0.85, 0.9),
    borderWidth: 1,
    color: rgb(0.97, 0.98, 1),
  });

  page.drawText(`Importer Name: ${data.lastName.toUpperCase()}, ${data.firstName.toUpperCase()} ${data.middleInitial.toUpperCase()}`.trim(), {
    x: 50,
    y: y - 20,
    size: 10,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.25),
  });

  page.drawText(`Date of Arrival: ${data.dateOfArrival || 'N/A'}    |    Port of Arrival: ${data.portOfArrival || 'N/A'}`, {
    x: 50,
    y: y - 38,
    size: 9,
    font,
    color: rgb(0.2, 0.2, 0.3),
  });

  page.drawText(`U.S. Address: ${data.usAddress || 'N/A'}`, {
    x: 50,
    y: y - 54,
    size: 9,
    font,
    color: rgb(0.2, 0.2, 0.3),
  });

  page.drawText(`Carrier / Flight: ${data.carrierName || data.arrivingVesselOrFlight || 'N/A'}    |    B/L or AWB #: ${data.billOfLadingOrAwb || 'N/A'}`, {
    x: 50,
    y: y - 70,
    size: 9,
    font,
    color: rgb(0.2, 0.2, 0.3),
  });

  y -= 105;

  // Table Header
  page.drawRectangle({
    x: 40,
    y: y - 20,
    width: 532,
    height: 20,
    color: rgb(0.15, 0.25, 0.4),
  });

  page.drawText('ITEM #', { x: 50, y: y - 14, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('DESCRIPTION OF ARTICLES', { x: 100, y: y - 14, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('EST. VALUE (USD)', { x: 340, y: y - 14, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText('ORIGIN / ACQUISITION', { x: 440, y: y - 14, size: 8, font: fontBold, color: rgb(1, 1, 1) });

  y -= 25;

  // Table Rows
  const items = data.itemizedArticles && data.itemizedArticles.length > 0
    ? data.itemizedArticles
    : [
        { itemNumber: '1', description: 'Used Household Furniture & Linens (Used > 1 Year)', value: '$1,500', placeAcquiredDate: 'Owned > 1 Yr' },
        { itemNumber: '2', description: 'Personal Clothing, Shoes, & Toiletries', value: '$800', placeAcquiredDate: 'Owned > 1 Yr' },
        { itemNumber: '3', description: 'Kitchenware, Cookware, & Dish Sets', value: '$450', placeAcquiredDate: 'Owned > 1 Yr' },
        { itemNumber: '4', description: 'Books, Study Materials & Electronic Accessories', value: '$350', placeAcquiredDate: 'Owned > 1 Yr' },
      ];

  items.forEach((item, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      page.drawRectangle({
        x: 40,
        y: y - 18,
        width: 532,
        height: 20,
        color: rgb(0.96, 0.97, 0.99),
      });
    }

    page.drawText(item.itemNumber || `${idx + 1}`, { x: 50, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(item.description.slice(0, 48), { x: 100, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(item.value || 'N/A', { x: 340, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(item.placeAcquiredDate.slice(0, 24) || 'Abroad', { x: 440, y: y - 12, size: 8, font, color: rgb(0.2, 0.2, 0.2) });

    y -= 22;
  });

  // Regulatory Certification Notice
  y = Math.min(y - 20, 160);

  page.drawRectangle({
    x: 40,
    y: y - 55,
    width: 532,
    height: 55,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  page.drawText('DECLARANT CERTIFICATION (19 CFR 148.6 & 148.52):', {
    x: 50,
    y: y - 15,
    size: 8,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(
    'I certify under penalty of law that the articles enumerated above are for my personal use or for the use of my household,',
    { x: 50, y: y - 28, size: 7.5, font, color: rgb(0.3, 0.3, 0.3) }
  );
  page.drawText(
    'were not acquired for any other person, and are not intended for sale or commercial barter within the United States.',
    { x: 50, y: y - 38, size: 7.5, font, color: rgb(0.3, 0.3, 0.3) }
  );

  // Signature Block
  y -= 85;

  page.drawLine({
    start: { x: 50, y },
    end: { x: 280, y },
    thickness: 1,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Signature of Declarant / Importer', {
    x: 50,
    y: y - 12,
    size: 8,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawLine({
    start: { x: 340, y },
    end: { x: 520, y },
    thickness: 1,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText(`Date: ${data.signatureDate || new Date().toISOString().split('T')[0]}`, {
    x: 340,
    y: y - 12,
    size: 8,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}
