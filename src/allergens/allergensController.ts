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
import { Allergen } from "./allergen";
const api = new MensaApi();

@Route("allergens")
export class AllergensController extends Controller {
  /**
   * Retrieve all allergens available at a location
   * @param location The location for which to retrieve allergens. This is matched ignoring whitespace and capitalization.
   * @param lang The language in which to return the allergens. Currently supported: en, de
   * @returns A list of allergens including their abbreviations
   */
  @Get("{location}")
  public async getAllergens(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Allergen[]> {
    const allergens: Allergen[] = await api.getAllergens(location, lang);
    return allergens;
  }
}
