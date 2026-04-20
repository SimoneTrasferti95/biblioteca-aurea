import  prisma  from "../config/prisma";

type CreateBookInput = {
  title: string;
  author: string;
  genre?: string;
  description?: string;
  totalCopies: number;
};

type UpdateBookInput = {
  title: string;
  author: string;
  genre?: string;
  description?: string;
  totalCopies: number;
};

export const getAllBooks = async () => {
  return prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createBook = async ({
  title,
  author,
  genre,
  description,
  totalCopies,
}: CreateBookInput) => {
  return prisma.book.create({
    data: {
      title,
      author,
      genre,
      description,
      totalCopies,
      availableCopies: totalCopies,
    },
  });
};

export const updateBook = async (
  id: number,
  { title, author, genre, description, totalCopies }: UpdateBookInput
) => {
  const existingBook = await prisma.book.findUnique({
    where: { id },
  });

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (totalCopies < existingBook.availableCopies) {
    throw new Error("INVALID_TOTAL_COPIES");
  }

  return prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      genre,
      description,
      totalCopies,
    },
  });
};

export const updateBookAvailability = async (
  id: number,
  availableCopies: number
) => {
  const existingBook = await prisma.book.findUnique({
    where: { id },
  });

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (availableCopies < 0 || availableCopies > existingBook.totalCopies) {
    throw new Error("INVALID_AVAILABLE_COPIES");
  }

  return prisma.book.update({
    where: { id },
    data: {
      availableCopies,
    },
  });
};

export const deleteBook = async (id: number) => {
  const existingBook = await prisma.book.findUnique({
    where: { id },
  });

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return prisma.book.delete({
    where: { id },
  });
};