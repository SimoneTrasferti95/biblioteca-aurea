import { Router } from "express";
import { getMyLoyaltyController } from "../controllers/getLoyalty.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", isAuthenticated, getMyLoyaltyController);

export default router;