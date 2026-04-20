import { Request, Response } from "express";
import { createBook, getAllBooks } from "../services/book.service";

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

export const createNewBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, description, totalCopies } = req.body || {};

    if (!title || !author || !totalCopies) {
      return res.status(400).json({
        message: "Titolo, autore e numero copie sono obbligatori",
      });
    }

    const numericTotalCopies = Number(totalCopies);

    if (Number.isNaN(numericTotalCopies) || numericTotalCopies <= 0) {
      return res.status(400).json({
        message: "Il numero totale di copie deve essere maggiore di 0",
      });
    }

    const newBook = await createBook({
      title,
      author,
      genre,
      description,
      totalCopies: numericTotalCopies,
    });

    return res.status(201).json({
      message: "Libro creato con successo",
      book: newBook,
    });
  } catch (error) {
    console.error("Errore creazione libro:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};