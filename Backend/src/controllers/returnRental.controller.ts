import { Request, Response } from "express";
import { returnRentalService } from "../services/returnRental.service";

export const returnRentalController = async (
  req: Request,
  res: Response
) => {
  try {
    const rentalId = Number(req.params.id);

    if (Number.isNaN(rentalId)) {
      return res.status(400).json({
        message: "ID noleggio non valido",
      });
    }

    const rental = await returnRentalService(rentalId);

    return res.status(200).json({
      message: "Libro restituito con successo",
      rental,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RENTAL_NOT_FOUND") {
      return res.status(404).json({
        message: "Noleggio non trovato",
      });
    }

    if (error instanceof Error && error.message === "ALREADY_RETURNED") {
      return res.status(400).json({
        message: "Questo noleggio è già stato restituito",
      });
    }

    console.error("Errore restituzione noleggio:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};