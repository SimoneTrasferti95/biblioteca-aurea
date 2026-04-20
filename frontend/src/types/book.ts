export type Book = {
  id: number;
  title: string;
  author: string;
  genre?: string | null;
  description?: string | null;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
};