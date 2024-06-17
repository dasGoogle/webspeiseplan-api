import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
} from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use(cors());
app.options("*", cors());

RegisterRoutes(app);

app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.get("/openapi.json", async (_req: ExRequest, res: ExResponse) => {
  return res.json(await import("../build/swagger.json"));
});
