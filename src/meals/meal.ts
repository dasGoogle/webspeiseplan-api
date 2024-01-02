import { Allergen } from "../allergens/allergen";
import { Additive } from "../additives/additive";
import { Feature } from "../features/feature";

export interface Meal {
  /**
   * The name of the meal
   */
  name: string;
  /**
   * The price of the meal for students
   */
  studentPrice: number;
  /**
   * The price of the meal for guests
   */
  guestPrice: number;
  /**
   * The when the meal is available
   */
  date: Date;
  /**
   * The allergens of the meal
   */
  allergens: Allergen[];
  /**
   * The additives of the meal
   */
  additives: Additive[];
  /**
   * The features of the meal
   */
  features: Feature[];
  /**
   * Whether the meal is an evening meal
   */
  isEveningMeal: boolean;
  /**
   * The id of the meal
   */
  id: number;
  /**
   * The nutrition information of the meal
   */
  nutritionInformation: NutritionInformation;
}

export interface NutritionInformation {
  /**
   * The energy of the meal in kJ
   */
  kj: number;
  /**
   * The energy of the meal in kcal
   */
  kcal: number;
  /**
   * The fat of the meal in g
   */
  fat: number;
  /**
   * The saturated fat of the meal in g
   */
  saturatedFat: number;
  /**
   * The carbohydrates of the meal in g
   */
  carbohydrates: number;
  /**
   * The sugar of the meal in g
   */
  sugar: number;
  /**
   * The protein of the meal in g
   */
  protein: number;
  /**
   * The salt of the meal in g
   */
  salt: number;
}
