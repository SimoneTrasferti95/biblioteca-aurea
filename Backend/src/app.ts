import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import rentalRoutes from "./routes/rental.routes";
import loyaltyRoutes from "./routes/loyalty.routes";
import adminRoutes from "./routes/admin.routes";
import { isAuthenticated } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/rentals", rentalRoutes);
app.use("/loyalty", loyaltyRoutes);
app.use("/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "API Biblioteca attiva" });
});

app.get("/protected", isAuthenticated, (_req, res) => {
  res.json({ message: "Sei autenticato" });
});

export default app;