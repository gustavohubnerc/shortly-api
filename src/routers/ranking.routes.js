import { Router } from "express";
import { usersRanking } from "../controllers/ranking.controllers.js";

const rankingRouter = Router();

rankingRouter.get("/ranking", usersRanking);

export default rankingRouter;