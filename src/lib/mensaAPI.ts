import { HTTPClient, CachedHTTPClient } from "./cachedHTTPClient";

class Meal {
  name: string;
  studentPrice: number;
  guestPrice: number;
  date: Date;
  allergens: Allergen[];
  additives: Additive[];
  features: Feature[];
  isEveningMeal = false;
  constructor(
    name: string,
    studentPrice: number,
    guestPrice: number,
    date: Date,
    allergens: Allergen[],
    additives: Additive[],
    features: Feature[],
    isEveningMeal = false
  ) {
    this.name = name;
    this.studentPrice = studentPrice;
    this.guestPrice = guestPrice;
    this.date = date;
    this.allergens = allergens;
    this.additives = additives;
    this.features = features;
    this.isEveningMeal = isEveningMeal;
  }
}

class Allergen {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

class Additive {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

class Feature {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

class Location {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

class Language {
  name: string;
  code: string;
  id: number;
  constructor(id: number, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}

type MealAPIRespose = {
  success: boolean;
  content: [
    {
      speiseplanAdvanced: { titel: string };
      speiseplanGerichtData: [
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
            gerichtnameAlternative: string;
          };
          allergeneIds: string;
          zusatzstoffeIds: string;
          gerichtmerkmaleIds: string;
        }
      ];
    }
  ];
};

type AllergenAPIResponse = {
  success: boolean;
  content: [
    {
      name: string;
      kuerzel: string;
      allergeneID: number;
    }
  ];
};

type AdditiveAPIResponse = {
  success: boolean;
  content: [
    {
      zusatzstoffeID: number;
      name: string;
      kuerzel: string;
    }
  ];
};

type FeatureAPIResponse = {
  success: boolean;
  content: [
    {
      gerichtmerkmalID: number;
      name: string;
      kuerzel: string;
    }
  ];
};

type LocationAPIResponse = {
  success: boolean;
  content: [
    {
      id: number;
      name: string;
    }
  ];
};

type LanguageAPIResponse = {
  success: boolean;
  content: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
};

type RequestOptions = {
  location?: number;
  language?: number;
};

export class MensaApi {
  TOKEN = "55ed21609e26bbf68ba2b19390bf7961";
  BASE_URL = "https://swp.webspeiseplan.de/index.php";
  client: HTTPClient = new CachedHTTPClient();

  private getURLForModel(model: string, options: RequestOptions = {}): string {
    // Request url format https://swp.webspeiseplan.de/index.php?token=55ed21609e26bbf68ba2b19390bf7961&model=menu&location=9601

    let url = `${this.BASE_URL}?token=${this.TOKEN}&model=${model}`;

    if (options.location) {
      url += `&location=${options.location}`;
    }
    if (options.language) {
      url += `&languagetype=${options.language}`;
    }
    return url;
  }

  async getMensaId(mensa: string): Promise<number> {
    const locations = await this.getLocations();
    for (const location of locations) {
      if (
        location.name.toLowerCase().replace(/ /g, "") ===
        mensa.toLowerCase().replace(/ /g, "")
      ) {
        return location.id;
      }
    }
    throw new Error("Mensa not found");
  }

  async getLanguages(): Promise<Language[]> {
    const url = this.getURLForModel("language");
    const data = await this.client.getJSON<LanguageAPIResponse>(url);
    const languages = data.content.map(
      (language) => new Language(language.id, language.name, language.code)
    );
    return languages;
  }

  async getLanguageForCode(code: string): Promise<Language> {
    const languages = await this.getLanguages();
    for (const language of languages) {
      if (language.code === code) {
        return language;
      }
    }
    throw new Error("Language not found");
  }

  private async getAllergensResponse(
    mensaId: number,
    languageId: number
  ): Promise<AllergenAPIResponse> {
    const url = this.getURLForModel("allergens", {
      location: mensaId,
      language: languageId,
    });
    const data = await this.client.getJSON<AllergenAPIResponse>(url);
    return data;
  }

  async getLocations(): Promise<Location[]> {
    const url = this.getURLForModel("location");
    const data = await this.client.getJSON<LocationAPIResponse>(url);
    const locations = data.content.map((location) => {
      return new Location(location.name, location.id);
    });
    return locations;
  }

  private async getAllergenForId(
    id: number,
    mensaId: number,
    languageId: number
  ): Promise<Allergen> {
    const allergens = await this.getAllergensResponse(mensaId, languageId);
    for (const allergen of allergens.content) {
      if (allergen.allergeneID === id) {
        return new Allergen(allergen.name.trim(), allergen.kuerzel.trim());
      }
    }
    throw new Error(
      "Allergen not found: " + id + " " + mensaId + " " + languageId
    );
  }

  private async getAdditivesResponse(
    mensaId: number,
    languageId: number
  ): Promise<AdditiveAPIResponse> {
    const url = this.getURLForModel("additives", {
      location: mensaId,
      language: languageId,
    });
    const data = await this.client.getJSON<AdditiveAPIResponse>(url);
    return data;
  }

  private async getAdditiveForId(
    id: number,
    mensaId: number,
    languageId: number
  ): Promise<Additive> {
    const additives = await this.getAdditivesResponse(mensaId, languageId);
    for (const additive of additives.content) {
      if (additive.zusatzstoffeID === id) {
        return new Additive(additive.name.trim(), additive.kuerzel.trim());
      }
    }
    throw new Error("Additive not found");
  }

  private async getFeaturesResponse(
    mensaId: number,
    languageId: number
  ): Promise<FeatureAPIResponse> {
    const url = this.getURLForModel("features", {
      location: mensaId,
      language: languageId,
    });
    const data = await this.client.getJSON<FeatureAPIResponse>(url);
    return data;
  }

  private async getFeatureForId(
    id: number,
    mensaId: number,
    languageId: number
  ): Promise<Feature> {
    const features = await this.getFeaturesResponse(mensaId, languageId);
    for (const feature of features.content) {
      if (feature.gerichtmerkmalID === id) {
        return new Feature(feature.name.trim(), feature.kuerzel.trim());
      }
    }
    throw new Error("Feature not found");
  }

  async getMensaMenu(mensa: string, language = "en"): Promise<Meal[]> {
    const mensaId = await this.getMensaId(mensa);
    const languageId = (await this.getLanguageForCode(language)).id;
    const url = this.getURLForModel("menu", {
      location: mensaId,
      language: languageId,
    });
    const data: MealAPIRespose = await this.client.getJSON<MealAPIRespose>(url);
    const content = data.content;
    const meals: Meal[] = [];
    for (const plan of content) {
      const isEvening = plan.speiseplanAdvanced.titel.includes("Abend");
      for (const meal of plan.speiseplanGerichtData) {
        if (meal.zusatzinformationen.mitarbeiterpreisDecimal2 === 0) {
          continue;
        }
        // Construct proper object from API Response
        const allergens: Allergen[] = [];
        if (meal.allergeneIds) {
          const allergeneIds = meal.allergeneIds.split(",");
          for (const allergenId of allergeneIds) {
            const allergen = await this.getAllergenForId(
              parseInt(allergenId),
              mensaId,
              languageId
            );
            allergens.push(allergen);
          }
        }

        const additives: Additive[] = [];
        if (meal.zusatzstoffeIds) {
          const zusatzstoffeIds = meal.zusatzstoffeIds.split(",");
          for (const zusatzstoffId of zusatzstoffeIds) {
            const additive = await this.getAdditiveForId(
              parseInt(zusatzstoffId),
              mensaId,
              languageId
            );
            additives.push(additive);
          }
        }

        const gerichtmerkmale: Feature[] = [];
        if (meal.gerichtmerkmaleIds) {
          const gerichtmerkmaleIds = meal.gerichtmerkmaleIds.split(",");
          for (const gerichtmerkmalId of gerichtmerkmaleIds) {
            const feature = await this.getFeatureForId(
              parseInt(gerichtmerkmalId),
              mensaId,
              languageId
            );
            gerichtmerkmale.push(feature);
          }
        }

        // Get the english meal name if requested since the API provides the english name in a different field and ignores the language parameter
        const mealName =
          language === "en"
            ? meal.zusatzinformationen.gerichtnameAlternative
            : meal.speiseplanAdvancedGericht.gerichtname;

        const menuItem = new Meal(
          mealName.trim(),
          meal.zusatzinformationen.mitarbeiterpreisDecimal2,
          meal.zusatzinformationen.gaestepreisDecimal2,
          new Date(meal.speiseplanAdvancedGericht.datum),
          allergens,
          additives,
          gerichtmerkmale,
          isEvening
        );

        meals.push(menuItem);
      }
    }

    return meals;
  }

  async getAdditives(mensa: string, language = "en"): Promise<Additive[]> {
    const mensaId = await this.getMensaId(mensa);
    const languageId = (await this.getLanguageForCode(language)).id;
    const additivesResponse = await this.getAdditivesResponse(
      mensaId,
      languageId
    );
    const additives = additivesResponse.content.map(
      (additive) => new Additive(additive.name, additive.kuerzel)
    );
    return additives;
  }

  async getAllergens(mensa: string, language = "en"): Promise<Allergen[]> {
    const mensaId = await this.getMensaId(mensa);
    const languageId = (await this.getLanguageForCode(language)).id;
    const allergensResponse = await this.getAllergensResponse(
      mensaId,
      languageId
    );
    const allergens = allergensResponse.content.map(
      (allergen) => new Allergen(allergen.name, allergen.kuerzel)
    );
    return allergens;
  }

  async getFeatures(mensa: string, language = "en"): Promise<Feature[]> {
    const mensaId = await this.getMensaId(mensa);
    const languageId = (await this.getLanguageForCode(language)).id;
    const featuresResponse = await this.getFeaturesResponse(
      mensaId,
      languageId
    );
    const features = featuresResponse.content.map(
      (feature) => new Feature(feature.name, feature.kuerzel)
    );
    return features;
  }
}

const mensaApi = new MensaApi();
