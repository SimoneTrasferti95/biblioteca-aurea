import { Request, Response } from "express";
import { deleteBook } from "../services/book.service";

export const deleteExistingBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "ID libro non valido",
      });
    }

    await deleteBook(id);

    return res.status(200).json({
      message: "Libro eliminato con successo",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Libro non trovato",
      });
    }

    console.error("Errore eliminazione libro:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};