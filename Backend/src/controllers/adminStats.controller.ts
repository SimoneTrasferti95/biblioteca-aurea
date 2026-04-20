import { Request, Response } from "express";
import { getAdminStatsService } from "../services/adminStats.service";

export const getAdminStatsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats = await getAdminStatsService();

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Errore recupero statistiche admin:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};