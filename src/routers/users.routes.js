import { Router } from "express";
import { getUserInfo } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/users/me", getUserInfo);

export default usersRouter;