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
import { Additive } from "./additive";
const api = new MensaApi();

@Route("additives")
export class AdditivesController extends Controller {
  /**
   * Retrieve a list of all additives available at a location
   * @param location The location for which to retrieve additives. This is matched ignoring whitespace and capitalization.
   * @param lang The language in which to return the additives. Currently supported: en, de
   * @returns A list of additives including their abbreviations
   */
  @Get("{location}")
  public async getAdditives(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Additive[]> {
    const additives: Additive[] = await api.getAdditives(location, lang);
    return additives;
  }
}
