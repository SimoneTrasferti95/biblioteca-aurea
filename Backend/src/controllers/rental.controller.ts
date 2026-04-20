import { Request, Response } from "express";
import { createRental } from "../services/rental.service";

export const createNewRental = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body || {};

    if (!req.session.user) {
      return res.status(401).json({
        message: "Non autenticato",
      });
    }

    const numericBookId = Number(bookId);

    if (Number.isNaN(numericBookId)) {
      return res.status(400).json({
        message: "ID libro non valido",
      });
    }

    const rental = await createRental(req.session.user.id, numericBookId);

    return res.status(201).json({
      message: "Noleggio creato con successo",
      rental,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Libro non trovato",
      });
    }

    if (error instanceof Error && error.message === "NO_AVAILABLE_COPIES") {
      return res.status(400).json({
        message: "Nessuna copia disponibile",
      });
    }

    console.error("Errore creazione noleggio:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};