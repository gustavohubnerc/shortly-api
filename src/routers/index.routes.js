import { Router } from "express";
import signInRouter from "./signin.routes";
import signUpRouter from "./signup.routes";
import rankingRouter from "./ranking.routes";
import usersRouter from "./users.routes";
import urlsRouter from "./urls.routes";

const router = Router();

router.use(signInRouter);
router.use(signUpRouter);
router.use(rankingRouter);
router.use(usersRouter);
router.use(urlsRouter);

export default router;