import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getMeController } from "../auth/getMe.controller";
import { logoutController } from "../auth/logout.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMeController);
router.post("/logout", isAuthenticated, logoutController);

export default router;