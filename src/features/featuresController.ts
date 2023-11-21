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
  @Get("{location}")
  public async getAllergens(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Feature[]> {
    const allergens: Feature[] = await api.getFeatures(location, lang);
    return allergens;
  }
}
