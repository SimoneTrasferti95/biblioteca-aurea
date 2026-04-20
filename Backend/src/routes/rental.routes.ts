import { Router } from "express";
import { createNewRental } from "../controllers/rental.controller";
import { returnRentalController } from "../controllers/returnRental.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getMyRentalsController } from "../controllers/getMyRentals.controller";

const router = Router();

router.post("/", isAuthenticated, createNewRental);
router.patch("/:id/return", isAuthenticated, returnRentalController);
router.get("/my", isAuthenticated, getMyRentalsController);

export default router;