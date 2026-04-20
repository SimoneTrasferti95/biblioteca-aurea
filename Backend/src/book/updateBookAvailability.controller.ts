import { Request, Response } from "express";
import { updateBookAvailability } from "../services/book.service";

export const updateBookAvailabilityController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { availableCopies } = req.body || {};

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "ID libro non valido",
      });
    }

    const numericAvailableCopies = Number(availableCopies);

    if (Number.isNaN(numericAvailableCopies)) {
      return res.status(400).json({
        message: "Copie disponibili non valide",
      });
    }

    const updatedBook = await updateBookAvailability(id, numericAvailableCopies);

    return res.status(200).json({
      message: "Copie disponibili aggiornate con successo",
      book: updatedBook,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Libro non trovato",
      });
    }

    if (
      error instanceof Error &&
      error.message === "INVALID_AVAILABLE_COPIES"
    ) {
      return res.status(400).json({
        message: "Le copie disponibili devono essere tra 0 e il totale copie",
      });
    }

    console.error("Errore aggiornamento copie disponibili:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};