import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    return res.status(401).json({
      message: "Non autenticato",
    });
  }

  next();
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    return res.status(401).json({
      message: "Non autenticato",
    });
  }

  if (req.session.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Accesso negato",
    });
  }

  next();
};