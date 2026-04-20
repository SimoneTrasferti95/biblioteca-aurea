import { Request, Response } from "express";
import { updateBook } from "../services/book.service";

export const updateExistingBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, author, genre, description, totalCopies } = req.body || {};

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "ID libro non valido",
      });
    }

    if (!title || !author || !totalCopies) {
      return res.status(400).json({
        message: "Titolo, autore e numero copie sono obbligatori",
      });
    }

    const numericTotalCopies = Number(totalCopies);

    if (Number.isNaN(numericTotalCopies) || numericTotalCopies <= 0) {
      return res.status(400).json({
        message: "Numero copie non valido",
      });
    }

    const updatedBook = await updateBook(id, {
      title,
      author,
      genre,
      description,
      totalCopies: numericTotalCopies,
    });

    return res.status(200).json({
      message: "Libro aggiornato con successo",
      book: updatedBook,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Libro non trovato",
      });
    }

    if (error instanceof Error && error.message === "INVALID_TOTAL_COPIES") {
      return res.status(400).json({
        message:
          "Il totale copie non può essere minore delle copie disponibili attuali",
      });
    }

    console.error("Errore aggiornamento libro:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};