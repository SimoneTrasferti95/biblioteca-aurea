import { Router } from "express";
import { getAdminStatsController } from "../controllers/adminStats.controller";
import { getAdminRentalsController } from "../controllers/adminRentals.controller";
import { isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/stats", isAdmin, getAdminStatsController);
router.get("/rentals", isAdmin, getAdminRentalsController);

export default router;