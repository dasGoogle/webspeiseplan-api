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
}
