import { Router } from "express";
import { signIn } from "../controllers/signin.controllers.js";
import { validateSchema } from "../middlewares/schema.validation.js";
import { signinSchema } from "../schemas/signin.schemas.js";

const signInRouter = Router();

signInRouter.post("/signin", validateSchema(signinSchema), signIn);

export default signInRouter;