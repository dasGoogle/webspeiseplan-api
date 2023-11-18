import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Meal } from "./meal";

import { MensaApi } from "../lib/mensaAPI";
const api = new MensaApi();

@Route("meals")
export class MealController extends Controller {
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
