import {
  Meal as MealInterface,
  NutritionInformation as NutritionInformationInterface,
} from "../meals/meal";

export class Meal {
  name: string;
  studentPrice: number;
  guestPrice: number;
  date: Date;
  allergens: Allergen[];
  additives: Additive[];
  features: Feature[];
  isEveningMeal = false;
  id: number;
  nutritionInformation: NutritionInformation;
  constructor(
    name: string,
    studentPrice: number,
    guestPrice: number,
    date: Date,
    allergens: Allergen[],
    additives: Additive[],
    features: Feature[],
    isEveningMeal = false,
    id: number,
    nutritionInformation: NutritionInformation
  ) {
    this.name = name;
    this.studentPrice = studentPrice;
    this.guestPrice = guestPrice;
    this.date = date;
    this.allergens = allergens;
    this.additives = additives;
    this.features = features;
    this.isEveningMeal = isEveningMeal;
    this.id = id;
    this.nutritionInformation = nutritionInformation;
  }

  isEqualTo(other: Meal): boolean {
    const basicEquality =
      this.name === other.name &&
      this.studentPrice === other.studentPrice &&
      this.guestPrice === other.guestPrice &&
      this.date.getTime() === other.date.getTime() &&
      this.isEveningMeal === other.isEveningMeal &&
      this.id === other.id;
    const allergensEquality =
      this.allergens.length === other.allergens.length &&
      this.allergens.every((allergen) => {
        return other.allergens.some((otherAllergen) => {
          return allergen.name === otherAllergen.name;
        });
      });
    const additivesEquality =
      this.additives.length === other.additives.length &&
      this.additives.every((additive) => {
        return other.additives.some((otherAdditive) => {
          return additive.name === otherAdditive.name;
        });
      });
    const featuresEquality =
      this.features.length === other.features.length &&
      this.features.every((feature) => {
        return other.features.some((otherFeature) => {
          return feature.name === otherFeature.name;
        });
      });
    return (
      basicEquality &&
      allergensEquality &&
      additivesEquality &&
      featuresEquality
    );
  }

  static fromJSON(json: MealInterface): Meal {
    const meal = new Meal(
      json.name,
      json.studentPrice,
      json.guestPrice,
      new Date(json.date),
      json.allergens,
      json.additives,
      json.features,
      json.isEveningMeal,
      json.id,
      NutritionInformation.fromJSON(json.nutritionInformation)
    );
    return meal;
  }
}

export class Allergen {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

export class Additive {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

export class Feature {
  name: string;
  abbreviation: string;
  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
}

export class NutritionInformation {
  kj: number;
  kcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  salt: number;
  constructor(
    kj: number,
    kcal: number,
    fat: number,
    saturatedFat: number,
    carbohydrates: number,
    sugar: number,
    protein: number,
    salt: number
  ) {
    this.kj = kj;
    this.kcal = kcal;
    this.fat = fat;
    this.saturatedFat = saturatedFat;
    this.carbohydrates = carbohydrates;
    this.sugar = sugar;
    this.protein = protein;
    this.salt = salt;
  }

  static fromJSON(json: NutritionInformationInterface): NutritionInformation {
    const nutritionInformation = new NutritionInformation(
      json.kj,
      json.kcal,
      json.fat,
      json.saturatedFat,
      json.carbohydrates,
      json.sugar,
      json.protein,
      json.salt
    );
    return nutritionInformation;
  }

  isEqualTo(other: NutritionInformation): boolean {
    return (
      this.kj === other.kj &&
      this.kcal === other.kcal &&
      this.fat === other.fat &&
      this.saturatedFat === other.saturatedFat &&
      this.carbohydrates === other.carbohydrates &&
      this.sugar === other.sugar &&
      this.protein === other.protein &&
      this.salt === other.salt
    );
  }
}

export class Location {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

export class Language {
  name: string;
  code: string;
  id: number;
  constructor(id: number, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}
