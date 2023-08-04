import { Router } from "express";
import { createUser } from "../controllers/signup.controllers.js";
import { validateSchema } from "../middlewares/schema.validation.js";
import { signupSchema } from "../schemas/signup.schemas.js";

const signUpRouter = Router();

signUpRouter.post("/signup", validateSchema(signupSchema), createUser);

export default signUpRouter;