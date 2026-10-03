export interface CBPFormData {
  // PART I - Importer Information
  lastName: string;
  firstName: string;
  middleInitial: string;
  dateOfBirth: string; // YYYY-MM-DD
  dateOfArrival: string; // YYYY-MM-DD
  usAddress: string;
  portOfArrival: string;
  arrivingVesselOrFlight: string;
  householdMembers: string; // Accompanying family members

  // Unaccompanied Shipment Details
  belongingsArrivalDate: string;
  carrierName: string;
  fromCountry: string;
  billOfLadingOrAwb: string;
  numberOfContainers: string;
  marksAndNumbers: string;

  // PART II - Status of Arriving Person
  residencyStatus: 'returning_resident' | 'emigrating' | 'visiting';
  countryOfResidency: string;
  lengthOfStayYears: string;
  lengthOfStayMonths: string;

  // PART III - U.S. Personnel and Evacuees (Optional)
  isUsPersonnelOrEvacuee: boolean;
  dateOfDepartureAbroad: string;
  dateOrdersIssued: string;

  // PART IV - Declaration of Articles
  // General & Resident Declarations
  allPersonalEffectsTakenAbroad: boolean; // CheckBoxA1[0]
  listOfArticlesAttached: boolean; // CheckBoxA1[1]
  articlesAcquiredAbroadResident: boolean; // CheckBoxB1[0]
  
  // Nonresident Declarations
  nonresidentPersonalEffects: boolean; // CheckBoxC1[0]
  nonresidentHouseholdEffects1Year: boolean; // CheckBoxC2[0]

  // Specific Categories (Checkboxes on Page 1)
  articlesForOtherPerson: boolean; // CheckBoxA1a[0]
  articlesForSaleCommercial: boolean; // CheckBoxA2a[0]
  firearmsAmmunition: boolean; // CheckBoxA3a[0]
  alcoholOrTobacco: boolean; // CheckBoxA4a[0]
  fruitsPlantsMeatsBirds: boolean; // CheckBoxA5a[0]
  fishWildlifeProducts: boolean; // CheckBoxA6a[0]
  householdEffectsUnder1Year: boolean; // CheckBoxB7[0]
  householdEffectsOver1Year: boolean; // CheckBoxB8[0]
  personalEffectsAcquiredAbroad: boolean; // CheckBoxC9[0]
  foreignArticlesAcquiredInUS: boolean; // CheckBoxC10[0]
  articlesRepairedAbroad: boolean; // CheckBoxC11[0]

  // Itemized List for Page 2 (Item D - items under 1 year, alcohol, gifts, etc.)
  itemizedArticles: Array<{
    itemNumber: string;
    description: string;
    value: string;
    placeAcquiredDate: string;
  }>;

  // PART VI - Certification
  certificationRole: 'importer' | 'authorized_agent';
  signatureDate: string;
  agentNamePrint?: string;
}

export const initialFormData: CBPFormData = {
  lastName: '',
  firstName: '',
  middleInitial: '',
  dateOfBirth: '',
  dateOfArrival: '',
  usAddress: '',
  portOfArrival: '',
  arrivingVesselOrFlight: '',
  householdMembers: '',

  belongingsArrivalDate: '',
  carrierName: '',
  fromCountry: '',
  billOfLadingOrAwb: '',
  numberOfContainers: '',
  marksAndNumbers: '',

  residencyStatus: 'returning_resident',
  countryOfResidency: '',
  lengthOfStayYears: '',
  lengthOfStayMonths: '',

  isUsPersonnelOrEvacuee: false,
  dateOfDepartureAbroad: '',
  dateOrdersIssued: '',

  allPersonalEffectsTakenAbroad: true,
  listOfArticlesAttached: true,
  articlesAcquiredAbroadResident: false,

  nonresidentPersonalEffects: false,
  nonresidentHouseholdEffects1Year: false,

  articlesForOtherPerson: false,
  articlesForSaleCommercial: false,
  firearmsAmmunition: false,
  alcoholOrTobacco: false,
  fruitsPlantsMeatsBirds: false,
  fishWildlifeProducts: false,
  householdEffectsUnder1Year: false,
  householdEffectsOver1Year: true,
  personalEffectsAcquiredAbroad: false,
  foreignArticlesAcquiredInUS: false,
  articlesRepairedAbroad: false,

  itemizedArticles: [
    { itemNumber: '1', description: 'Used Household Goods & Personal Effects (Owned > 1 Yr)', value: 'N/A', placeAcquiredDate: 'Abroad / Various' }
  ],

  certificationRole: 'importer',
  signatureDate: new Date().toISOString().split('T')[0],
  agentNamePrint: ''
};
