import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body || {};

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Tutti i campi sono obbligatori",
      });
    }

    const user = await registerUser(fullName, email, password);

    return res.status(201).json({
      message: "Registrazione completata",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({
        message: "Email già registrata",
      });
    }

    console.error("Errore durante la registrazione:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e password obbligatorie",
      });
    }

    const user = await loginUser(email, password);

    req.session.user = {
      id: user.id,
      role: user.role,
    };

    return res.status(200).json({
      message: "Login effettuato con successo",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({
        message: "Credenziali non valide",
      });
    }

    console.error("Errore durante il login:", error);
    return res.status(500).json({
      message: "Errore interno del server",
    });
  }
};