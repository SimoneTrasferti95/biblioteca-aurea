import { Request, Response } from "express";
import { getAdminRentalsService } from "../services/adminRentals.service";

export const getAdminRentalsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.query;

    const rentals = await getAdminRentalsService(
      typeof status === "string" ? status : undefined
    );

    return res.status(200).json(rentals);
  } catch (error) {
    console.error("Errore recupero noleggi admin:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};