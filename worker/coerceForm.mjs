const STRING_FIELDS = [
  'lastName',
  'firstName',
  'middleInitial',
  'dateOfBirth',
  'dateOfArrival',
  'usAddress',
  'portOfArrival',
  'arrivingVesselOrFlight',
  'householdMembers',
  'belongingsArrivalDate',
  'carrierName',
  'fromCountry',
  'billOfLadingOrAwb',
  'numberOfContainers',
  'marksAndNumbers',
  'countryOfResidency',
  'lengthOfStayYears',
  'lengthOfStayMonths',
  'dateOfDepartureAbroad',
  'dateOrdersIssued',
  'signatureDate',
  'agentNamePrint',
];

const BOOLEAN_FIELDS = [
  'isUsPersonnelOrEvacuee',
  'allPersonalEffectsTakenAbroad',
  'listOfArticlesAttached',
  'articlesAcquiredAbroadResident',
  'nonresidentPersonalEffects',
  'nonresidentHouseholdEffects1Year',
  'articlesForOtherPerson',
  'articlesForSaleCommercial',
  'firearmsAmmunition',
  'alcoholOrTobacco',
  'fruitsPlantsMeatsBirds',
  'fishWildlifeProducts',
  'householdEffectsUnder1Year',
  'householdEffectsOver1Year',
  'personalEffectsAcquiredAbroad',
  'foreignArticlesAcquiredInUS',
  'articlesRepairedAbroad',
];

function clip(value) {
  return typeof value === 'string' ? value.slice(0, 500) : '';
}

/** Turn untrusted JSON into the form shape the PDF filler expects. */
export function coerceForm(input) {
  const src = input && typeof input === 'object' ? input : {};
  /** @type {Record<string, unknown>} */
  const data = {};
  for (const key of STRING_FIELDS) data[key] = clip(src[key]);
  for (const key of BOOLEAN_FIELDS) data[key] = Boolean(src[key]);
  data.residencyStatus = ['returning_resident', 'emigrating', 'visiting'].includes(src.residencyStatus)
    ? src.residencyStatus
    : 'returning_resident';
  data.certificationRole = src.certificationRole === 'authorized_agent' ? 'authorized_agent' : 'importer';
  const items = Array.isArray(src.itemizedArticles) ? src.itemizedArticles.slice(0, 9) : [];
  data.itemizedArticles = items.map((item) => {
    const row = item && typeof item === 'object' ? item : {};
    return {
      itemNumber: clip(row.itemNumber),
      description: clip(row.description),
      value: clip(row.value),
      placeAcquiredDate: clip(row.placeAcquiredDate),
    };
  });
  return data;
}
