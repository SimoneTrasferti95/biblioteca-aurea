import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMeController = async (req: Request, res: Response) => {
  try {
    if (!req.session?.user) {
      return res.status(401).json({
        message: "Non autenticato",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Utente non trovato",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Errore recupero utente loggato:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};