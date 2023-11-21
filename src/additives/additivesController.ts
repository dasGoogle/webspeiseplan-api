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
  @Get("{location}")
  public async getAllergens(
    @Path() location: string,
    @Query() lang = "en"
  ): Promise<Additive[]> {
    const additives: Additive[] = await api.getAdditives(location, lang);
    return additives;
  }
}
