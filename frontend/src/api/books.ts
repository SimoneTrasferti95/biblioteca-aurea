import api from "./axios";
import type { Book } from "../types/book";

export const getBooksRequest = async (): Promise<Book[]> => {
  const response = await api.get("/books");
  return response.data;
};

type CreateBookPayload = {
  title: string;
  author: string;
  genre?: string;
  description?: string;
  totalCopies: number;
};

export const createBookRequest = async (payload: CreateBookPayload) => {
  const response = await api.post("/books", payload);
  return response.data;
};