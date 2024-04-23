import { Controller, Get, Path, Query, Route } from "tsoa";
import { Meal } from "./meal";

import { MensaApi } from "../lib/mensaAPI";
const api = new MensaApi();

@Route("meals")
export class MealController extends Controller {
  /**
   * Retrieves all meals available at a location that match the given filters. The meals contain details on prices, allgergens, etc.
   * @param location The name of the location. This is matched ignoring whitespace and capitalization.
   * @param date The date for which to retrieve meals. Format: YYYY-MM-DD
   * @param evening Whether to retrieve evening meals or not. If not specified, all meals are returned.
   * @param lang The language in which to return the meals. Currently supported: en, de
   * @returns
   */
  @Get("{location}")
  public async getMeals(
    @Path() location: string,
    @Query() date?: string,
    @Query() evening?: boolean,
    @Query() lang = "en"
  ): Promise<Meal[]> {
    let meals = await api.getMensaMenu(location, lang);
    if (date) {
      //check date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) throw new Error("Invalid date format");

      // Filter meals by matching date
      meals = meals.filter((meal) => {
        const mealDate = new Date(meal.date);
        const queryDate = new Date(date);
        return (
          mealDate.getFullYear() === queryDate.getFullYear() &&
          mealDate.getMonth() === queryDate.getMonth() &&
          mealDate.getDate() === queryDate.getDate()
        );
      });
    }

    if (evening === true || evening === false) {
      meals = meals.filter((meal) => meal.isEveningMeal === evening);
    }

    return meals;
  }
}
