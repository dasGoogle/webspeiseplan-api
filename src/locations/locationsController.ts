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
import { Location } from "./location";
const api = new MensaApi();

@Route("locations")
export class LocationController extends Controller {
  @Get()
  public async getLocations(): Promise<Location[]> {
    const locations: Location[] = await api.getLocations();
    return locations;
  }
}
