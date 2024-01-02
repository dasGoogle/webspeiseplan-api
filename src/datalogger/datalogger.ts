import { MensaApi } from "../lib/mensaAPI";
import * as path from "path";
import * as fs from "fs/promises";
import { existsSync } from "fs";
import { Meal } from "../lib/mensaAPI";

type MealLog = {
  firstSaved: Date;
  lastUpdate: Date;
  meal: Meal;
};

export class DataLogger {
  interval: number;
  storagePath: string;
  mensaApi: MensaApi;

  constructor(interval: number, storagePath: string) {
    this.interval = interval;
    this.storagePath = storagePath;
    this.mensaApi = new MensaApi();
  }

  start() {
    console.log("Starting data logger with interval " + this.interval + "ms");
    this.log();
    setInterval(() => this.log(), this.interval);
  }

  async log() {
    console.debug("Logging data");
    // Load all available locations
    const locations = await this.mensaApi.getLocations();
    // load all meals for each location
    for (const location of locations) {
      const meals = await this.mensaApi.getMensaMenu(location.name, "de");
      for (const meal of meals) {
        await this.syncMealFile(meal, location.name);
      }
    }
    console.log("Finished logging data");
  }

  async syncMealFile(meal: Meal, locationName: string) {
    const localDateString = this.convertToDateString(new Date(meal.date));
    const storagePath = path.join(
      this.storagePath,
      locationName,
      localDateString,
      meal.id.toString(),
      "current.json"
    );

    let newMealLog: MealLog = {
      firstSaved: new Date(),
      lastUpdate: new Date(),
      meal: meal,
    };

    // check if file exists
    if (existsSync(storagePath)) {
      // load file and parse
      const file = await fs.readFile(storagePath);
      const storedMealLog = JSON.parse(file.toString()) as MealLog;

      // check if meal has changed
      if (!meal.isEqualTo(Meal.fromJSON(storedMealLog.meal))) {
        // move old file to archive in the format /YYYY-MM-DD/mealId/<date>.json
        const archivePath = path.join(
          this.storagePath,
          locationName,
          localDateString,
          meal.id.toString(),
          new Date(storedMealLog.lastUpdate).toISOString() + ".json"
        );
        await fs.mkdir(path.dirname(archivePath), { recursive: true });
        await fs.rename(storagePath, archivePath);
      } else {
        storedMealLog.lastUpdate = new Date();
        newMealLog = storedMealLog;
      }
    }

    // write file as prettified json
    await fs.mkdir(path.dirname(storagePath), { recursive: true });
    await fs.writeFile(storagePath, JSON.stringify(newMealLog, null, 2));
  }

  convertToDateString(date: Date) {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    const formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }
}
