import type { PDFDocument, PDFForm } from 'pdf-lib';
import type { CBPFormData } from '../types/form';

function safeSetText(form: PDFForm, fieldName: string, value: string | undefined) {
  try {
    if (!value) return;
    const field = form.getTextField(fieldName);
    field.setText(value);
  } catch {
    // Field names differ on some template revisions; skip those boxes.
  }
}

function safeCheck(form: PDFForm, fieldName: string, shouldCheck: boolean) {
  try {
    const field = form.getCheckBox(fieldName);
    if (shouldCheck) field.check();
    else field.uncheck();
  } catch {
    // Ignore missing checkboxes.
  }
}

/** Write wizard answers onto the blank CBP Form 3299 AcroForm. Does not watermark. */
export function fillCbpForm(pdfDoc: PDFDocument, data: CBPFormData) {
  const form = pdfDoc.getForm();

  safeSetText(form, 'F[0].P1[0].ImportersName[0]', data.lastName.toUpperCase());
  safeSetText(form, 'F[0].P1[0].ImportersName[1]', data.firstName.toUpperCase());
  safeSetText(form, 'F[0].P1[0].ImportersName[2]', data.middleInitial.toUpperCase());
  safeSetText(form, 'F[0].P1[0].ImportersDateOfBirth[0]', data.dateOfBirth);
  safeSetText(form, 'F[0].P1[0].ImportersDateOfArrival[0]', data.dateOfArrival);
  safeSetText(form, 'F[0].P1[0].ImportersUSAddress[0]', data.usAddress.toUpperCase());
  safeSetText(form, 'F[0].P1[0].ImportersPortOfArrival[0]', data.portOfArrival.toUpperCase());
  safeSetText(form, 'F[0].P1[0].NameOfArrivingVessel[0]', data.arrivingVesselOrFlight.toUpperCase());
  safeSetText(form, 'F[0].P1[0].NamesOfHousehold[0]', data.householdMembers.toUpperCase());

  safeSetText(form, 'F[0].P1[0].ImportedBelongingsDate[0]', data.belongingsArrivalDate);
  safeSetText(form, 'F[0].P1[0].NameOfVesselCarrier[0]', data.carrierName.toUpperCase());
  safeSetText(form, 'F[0].P1[0].FromCountry[0]', data.fromCountry.toUpperCase());
  safeSetText(form, 'F[0].P1[0].BLorAWBorIT_Number[0]', data.billOfLadingOrAwb.toUpperCase());
  safeSetText(form, 'F[0].P1[0].NumberOfContainers[0]', data.numberOfContainers.toUpperCase());
  safeSetText(form, 'F[0].P1[0].Marks_Numbers[0]', data.marksAndNumbers.toUpperCase());

  if (data.residencyStatus === 'returning_resident') {
    safeCheck(form, 'F[0].P1[0].ReturningResidentUS[0]', true);
    safeCheck(form, 'F[0].P1[0].was[0]', true);
    safeSetText(form, 'F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
    safeSetText(form, 'F[0].P1[0].LengthOfTime_Year[0]', data.lengthOfStayYears);
    safeSetText(form, 'F[0].P1[0].LengthOfTime_Month[0]', data.lengthOfStayMonths);
  } else if (data.residencyStatus === 'emigrating') {
    safeCheck(form, 'F[0].P1[0].EmigratingToTheUS[0]', true);
    safeCheck(form, 'F[0].P1[0].is[0]', true);
    safeSetText(form, 'F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
  } else if (data.residencyStatus === 'visiting') {
    safeCheck(form, 'F[0].P1[0].VisitingTheUS[0]', true);
    safeCheck(form, 'F[0].P1[0].is[0]', true);
    safeSetText(form, 'F[0].P1[0].NameOfCountry[0]', data.countryOfResidency.toUpperCase());
  }

  if (data.isUsPersonnelOrEvacuee) {
    safeSetText(form, 'F[0].P1[0].DateOfImportersLast[0]', data.dateOfDepartureAbroad);
    safeSetText(form, 'F[0].P1[0].DateOrdersIssued[0]', data.dateOrdersIssued);
  }

  safeCheck(form, 'F[0].P1[0].CheckBoxA1[0]', data.allPersonalEffectsTakenAbroad);
  safeCheck(form, 'F[0].P1[0].CheckBoxA1[1]', data.listOfArticlesAttached);
  safeCheck(form, 'F[0].P1[0].CheckBoxB1[0]', data.articlesAcquiredAbroadResident);
  safeCheck(form, 'F[0].P1[0].CheckBoxC1[0]', data.nonresidentPersonalEffects);
  safeCheck(form, 'F[0].P1[0].CheckBoxC2[0]', data.nonresidentHouseholdEffects1Year);
  safeCheck(form, 'F[0].P1[0].CheckBoxA1a[0]', data.articlesForOtherPerson);
  safeCheck(form, 'F[0].P1[0].CheckBoxA2a[0]', data.articlesForSaleCommercial);
  safeCheck(form, 'F[0].P1[0].CheckBoxA3a[0]', data.firearmsAmmunition);
  safeCheck(form, 'F[0].P1[0].CheckBoxA4a[0]', data.alcoholOrTobacco);
  safeCheck(form, 'F[0].P1[0].CheckBoxA5a[0]', data.fruitsPlantsMeatsBirds);
  safeCheck(form, 'F[0].P1[0].CheckBoxA6a[0]', data.fishWildlifeProducts);
  safeCheck(form, 'F[0].P1[0].CheckBoxB7[0]', data.householdEffectsUnder1Year);
  safeCheck(form, 'F[0].P1[0].CheckBoxB8[0]', data.householdEffectsOver1Year);
  safeCheck(form, 'F[0].P1[0].CheckBoxC9[0]', data.personalEffectsAcquiredAbroad);
  safeCheck(form, 'F[0].P1[0].CheckBoxC10[0]', data.foreignArticlesAcquiredInUS);
  safeCheck(form, 'F[0].P1[0].CheckBoxC11[0]', data.articlesRepairedAbroad);

  if (data.itemizedArticles && data.itemizedArticles.length > 0) {
    data.itemizedArticles.slice(0, 9).forEach((item, index) => {
      const row = index + 1;
      safeSetText(form, `F[0].P2[0].itemnumber${row}[0]`, item.itemNumber || `${row}`);
      safeSetText(form, `F[0].P2[0].DescriptionOfMerchandise${row}[0]`, item.description);
      safeSetText(form, `F[0].P2[0].value${row}[0]`, item.value);
      safeSetText(form, `F[0].P2[0].ForeignMerchandise${row}[0]`, item.placeAcquiredDate);
    });
  }

  if (data.certificationRole === 'importer') {
    safeCheck(form, 'F[0].P2[0].B_Importer[0]', true);
    safeCheck(form, 'F[0].P2[0].A_AuthorizedAgent[0]', false);
  } else {
    safeCheck(form, 'F[0].P2[0].A_AuthorizedAgent[0]', true);
    safeCheck(form, 'F[0].P2[0].B_Importer[0]', false);
    safeSetText(form, 'F[0].P2[0].SignatureOfAgentPrint[0]', data.agentNamePrint || '');
  }
  safeSetText(form, 'F[0].P2[0].DateFreeEntrySignature[0]', data.signatureDate);
}
