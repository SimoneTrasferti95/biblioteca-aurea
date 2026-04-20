import { Request, Response } from "express";
import { getLoyaltyByUserId } from "../loyalty/getLoyalty.service";

export const getMyLoyaltyController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("SESSION USER:", req.session.user);

    if (!req.session.user) {
      return res.status(401).json({
        message: "Non autenticato",
      });
    }

    const loyalty = await getLoyaltyByUserId(req.session.user.id);

    console.log("LOYALTY RESULT:", loyalty);

    if (!loyalty) {
      return res.status(404).json({
        message: "Carta fedeltà non trovata",
      });
    }

    return res.status(200).json(loyalty);
  } catch (error) {
    console.error("Errore recupero fedeltà:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};