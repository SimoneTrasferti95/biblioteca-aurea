import { Request, Response } from "express";
import { getAllBooks } from "../services/book.service";

export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error("Errore recupero libri:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};