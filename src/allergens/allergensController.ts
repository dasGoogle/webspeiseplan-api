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
  @Get("{location}")
  public async getAllergens(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Allergen[]> {
    const allergens: Allergen[] = await api.getAllergens(location, lang);
    return allergens;
  }
}
