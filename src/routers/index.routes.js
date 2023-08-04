import { Router } from "express";
import signInRouter from "./signin.routes.js";
import signUpRouter from "./signup.routes.js";
import rankingRouter from "./ranking.routes.js";
import usersRouter from "./users.routes.js";
import urlsRouter from "./urls.routes.js";

const router = Router();

router.use(signInRouter);
router.use(signUpRouter);
router.use(rankingRouter);
router.use(usersRouter);
router.use(urlsRouter);

export default router;