import { Router } from "express";
import { urlSchema } from "../schemas/url.schemas.js";
import { validateSchema } from "../middlewares/schema.validation.js";
import { shortenUrl, getUrlById } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl);
urlsRouter.get("/urls/:id", getUrlById);

export default urlsRouter;