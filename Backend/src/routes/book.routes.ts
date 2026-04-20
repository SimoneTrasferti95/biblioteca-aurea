import { Router } from "express";
import { isAdmin } from "../middlewares/auth.middleware";

import { getBooks } from "../book/getBooks.controller";
import { createNewBook } from "../book/createBook.controller";
import { updateExistingBook } from "../book/updateBook.controller";
import { updateBookAvailabilityController } from "../book/updateBookAvailability.controller";
import { deleteExistingBook } from "../book/deleteBook.controller";

const router = Router();

router.get("/", getBooks);
router.post("/", isAdmin, createNewBook);
router.put("/:id", isAdmin, updateExistingBook);
router.patch("/:id/availability", isAdmin, updateBookAvailabilityController);
router.delete("/:id", isAdmin, deleteExistingBook);

export default router;