import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import type { CBPFormData } from '../types/form';

export async function generateCBPForm3299(
  data: CBPFormData,
  options: { isWatermarked?: boolean } = {}
): Promise<Uint8Array> {
  const { isWatermarked = false } = options;

  // Fetch the official blank CBP Form 3299 template
  const templateUrl = `${import.meta.env.BASE_URL}cbp_form_3299.pdf`;
  const response = await fetch(templateUrl);
  if (!response.ok) {
    throw new Error(`Failed to load base PDF template from ${templateUrl}`);
  }
  const existingPdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  const safeSetText = (fieldName: string, value: string | undefined) => {
    try {
      if (!value) return;
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(value);
      }
    } catch {
      // Gracefully ignore field errors if field doesn't exist
    }
  };

  const safeCheck = (fieldName: string, shouldCheck: boolean) => {
    try {
      const field = form.getCheckBox(fieldName);
      if (field) {
        if (shouldCheck) {
          field.check();
        } else {
          field.uncheck();
        }
      }
    } catch {
      // Gracefully ignore
    }
  };

  // PART I - Importer Information
  safeSetText('F[0].P1[0].ImportersName[0]', data.lastName.toUpperCase());
  safeSetText('F[0].P1[0].ImportersName[1]', data.firstName.toUpperCase());
  safeSetText('F[0].P1[0].ImportersName[2]', data.middleInitial.toUpperCase());
  safeSetText('F[0].P1[0].ImportersDateOfBirth[0]', data.dateOfBirth);
  safeSetText('F[0].P1[0].ImportersDateOfArrival[0]', data.dateOfArrival);
  safeSetText('F[0].P1[0].ImportersUSAddress[0]', data.usAddress.toUpperCase());
  safeSetText('F[0].P1[0].ImportersPortOfArrival[0]', data.portOfArrival.toUpperCase());
  safeSetText('F[0].P1[0].NameOfArrivingVessel[0]', data.arrivingVesselOrFlight.toUpperCase());
  safeSetText('F[0].P1[0].NamesOfHousehold[0]', data.householdMembers.toUpperCase());

  // Shipment Details (Unaccompanied Belongings)
  safeSetText('F[0].P1[0].ImportedBelongingsDate[0]', data.belongingsArrivalDate);
  safeSetText('F[0].P1[0].NameOfVesselCarrier[0]', data.carrierName.toUpperCase());
  safeSetText('F[0].P1[0].FromCountry[0]', data.fromCountry.toUpperCase());
  safeSetText('F[0].P1[0].BLorAWBorIT_Number[0]', data.billOfLadingOrAwb.toUpperCase());
  safeSetText('F[0].P1[0].NumberOfContainers[0]', data.numberOfContainers.toUpperCase());
  safeSetText('F[0].P1[0].Marks_Numbers[0]', data.marksAndNumbers.toUpperCase());

  // PART II - Status of Arriving Person
  if (data.residencyStatus === 'returning_resident') {
    safeCheck('F[0].P1[0].ReturningResidentUS[0]', true);
    safeCheck('F[0].P1[0].was[0]', true);
    safeSetText('F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
    safeSetText('F[0].P1[0].LengthOfTime_Year[0]', data.lengthOfStayYears);
    safeSetText('F[0].P1[0].LengthOfTime_Month[0]', data.lengthOfStayMonths);
  } else if (data.residencyStatus === 'emigrating') {
    safeCheck('F[0].P1[0].EmigratingToTheUS[0]', true);
    safeCheck('F[0].P1[0].is[0]', true);
    safeSetText('F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
  } else if (data.residencyStatus === 'visiting') {
    safeCheck('F[0].P1[0].VisitingTheUS[0]', true);
    safeCheck('F[0].P1[0].is[0]', true);
    safeSetText('F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
  }

  // PART III - Military / Evacuees
  if (data.isUsPersonnelOrEvacuee) {
    safeSetText('F[0].P1[0].DateOfImportersLast[0]', data.dateOfDepartureAbroad);
    safeSetText('F[0].P1[0].DateOrdersIssued[0]', data.dateOrdersIssued);
  }

  // PART IV - Declaration of Articles (Page 1)
  safeCheck('F[0].P1[0].CheckBoxA1[0]', data.allPersonalEffectsTakenAbroad);
  safeCheck('F[0].P1[0].CheckBoxA1[1]', data.listOfArticlesAttached);
  safeCheck('F[0].P1[0].CheckBoxB1[0]', data.articlesAcquiredAbroadResident);

  safeCheck('F[0].P1[0].CheckBoxC1[0]', data.nonresidentPersonalEffects);
  safeCheck('F[0].P1[0].CheckBoxC2[0]', data.nonresidentHouseholdEffects1Year);

  safeCheck('F[0].P1[0].CheckBoxA1a[0]', data.articlesForOtherPerson);
  safeCheck('F[0].P1[0].CheckBoxA2a[0]', data.articlesForSaleCommercial);
  safeCheck('F[0].P1[0].CheckBoxA3a[0]', data.firearmsAmmunition);
  safeCheck('F[0].P1[0].CheckBoxA4a[0]', data.alcoholOrTobacco);
  safeCheck('F[0].P1[0].CheckBoxA5a[0]', data.fruitsPlantsMeatsBirds);
  safeCheck('F[0].P1[0].CheckBoxA6a[0]', data.fishWildlifeProducts);
  safeCheck('F[0].P1[0].CheckBoxB7[0]', data.householdEffectsUnder1Year);
  safeCheck('F[0].P1[0].CheckBoxB8[0]', data.householdEffectsOver1Year);
  safeCheck('F[0].P1[0].CheckBoxC9[0]', data.personalEffectsAcquiredAbroad);
  safeCheck('F[0].P1[0].CheckBoxC10[0]', data.foreignArticlesAcquiredInUS);
  safeCheck('F[0].P1[0].CheckBoxC11[0]', data.articlesRepairedAbroad);

  // PAGE 2 - Itemized Articles Table (Part IV D)
  if (data.itemizedArticles && data.itemizedArticles.length > 0) {
    data.itemizedArticles.slice(0, 9).forEach((item, index) => {
      const row = index + 1;
      safeSetText(`F[0].P2[0].itemnumber${row}[0]`, item.itemNumber || `${row}`);
      safeSetText(`F[0].P2[0].DescriptionOfMerchandise${row}[0]`, item.description);
      safeSetText(`F[0].P2[0].value${row}[0]`, item.value);
      safeSetText(`F[0].P2[0].ForeignMerchandise${row}[0]`, item.placeAcquiredDate);
    });
  }

  // PART VI - Certification
  if (data.certificationRole === 'importer') {
    safeCheck('F[0].P2[0].B_Importer[0]', true);
    safeCheck('F[0].P2[0].A_AuthorizedAgent[0]', false);
  } else {
    safeCheck('F[0].P2[0].A_AuthorizedAgent[0]', true);
    safeCheck('F[0].P2[0].B_Importer[0]', false);
    safeSetText('F[0].P2[0].SignatureOfAgentPrint[0]', data.agentNamePrint || '');
  }
  safeSetText('F[0].P2[0].DateFreeEntrySignature[0]', data.signatureDate);

  // Apply Watermark if requested (for sample preview)
  if (isWatermarked) {
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();
      
      // Top diagonal watermark
      page.drawText('PREVIEW ONLY • NOT VALID FOR CBP FILING', {
        x: width * 0.1,
        y: height * 0.72,
        size: 22,
        font: boldFont,
        color: rgb(0.85, 0.2, 0.2),
        rotate: degrees(38),
        opacity: 0.22,
      });

      // Center primary diagonal watermark
      page.drawText('PREVIEW COPY • NOT FOR CBP SUBMISSION', {
        x: width * 0.05,
        y: height * 0.44,
        size: 26,
        font: boldFont,
        color: rgb(0.85, 0.15, 0.15),
        rotate: degrees(38),
        opacity: 0.25,
      });

      // Bottom diagonal watermark
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
  }

  return await pdfDoc.save();
}

/**
 * Utility to trigger browser download of the generated PDF
 */
export function downloadPdf(bytes: Uint8Array, filename = 'CBP_Form_3299_Completed.pdf') {
  // Need to create a new ArrayBuffer slice if bytes is a subarray to satisfy BlobPart typing
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
