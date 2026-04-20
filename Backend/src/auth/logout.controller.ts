import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        console.error("Errore logout:", error);
        return res.status(500).json({
          message: "Errore durante il logout",
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        message: "Logout effettuato con successo",
      });
    });
  } catch (error) {
    console.error("Errore logout:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};