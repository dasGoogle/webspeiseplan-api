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

import { MensaApi } from "../lib/mensaAPI";
import { Feature } from "./feature";
const api = new MensaApi();

@Route("features")
export class FeaturesController extends Controller {
  /**
   * Retrieve all features a meal can have at a given location (i.e., being vegan, vegetarian, etc.)
   * @param location The name of the location. This is matched ignoring whitespace and capitalization.
   * @param lang The language in which to return the meals. Currently supported: en, de
   * @returns A list of features including their abbreviations
   */
  @Get("{location}")
  public async getFeatures(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Feature[]> {
    const allergens: Feature[] = await api.getFeatures(location, lang);
    return allergens;
  }
}
