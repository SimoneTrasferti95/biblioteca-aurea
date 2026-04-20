import { Request, Response } from "express";
import { getMyRentalsService } from "../services/getMyRentals.service";

export const getMyRentalsController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        message: "Non autenticato",
      });
    }

    const rentals = await getMyRentalsService(req.session.user.id);

    return res.status(200).json(rentals);
  } catch (error) {
    console.error("Errore recupero noleggi utente:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};