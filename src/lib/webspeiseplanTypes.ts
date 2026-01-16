export type MealAPIRespose = {
  success: boolean;
  content: [
    {
      speiseplanAdvanced: { titel: string };
      speiseplanGerichtData?: [
        {
          speiseplanAdvancedGericht: {
            id: number;
            aktiv: boolean;
            datum: string;
            gerichtname: string;
          };
          zusatzinformationen: {
            mitarbeiterpreisDecimal2: number;
            gaestepreisDecimal2: number;
            price3Decimal2: number;
            gerichtnameAlternative: string;
            nwkjInteger: number;
            nwkcalInteger: number;
            nwfettDecimal1: number;
            nwfettsaeurenDecimal1: number;
            nwkohlehydrateDecimal1: number;
            nwzuckerDecimal1: number;
            nweiweissDecimal1: number;
            nwsalzDecimal1: number;
          };
          allergeneIds: string;
          zusatzstoffeIds: string;
          gerichtmerkmaleIds: string;
        }
      ];
    }
  ];
};

export type AllergenAPIResponse = {
  success: boolean;
  content: [
    {
      name: string;
      kuerzel: string;
      allergeneID: number;
    }
  ];
};

export type AdditiveAPIResponse = {
  success: boolean;
  content: [
    {
      zusatzstoffeID: number;
      name: string;
      kuerzel: string;
    }
  ];
};

export type FeatureAPIResponse = {
  success: boolean;
  content: [
    {
      gerichtmerkmalID: number;
      name: string;
      kuerzel?: string;
      nameAlternative?: string;
    }
  ];
};

export type LocationAPIResponse = {
  success: boolean;
  content: [
    {
      id: number;
      name: string;
      isPublic: boolean;
    }
  ];
};

export type LanguageAPIResponse = {
  success: boolean;
  content: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
};
