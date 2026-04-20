import prisma from "../config/prisma";

export const createRental = async (userId: number, bookId: number) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (book.availableCopies <= 0) {
    throw new Error("NO_AVAILABLE_COPIES");
  }

  const rentDate = new Date();

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const rental = await prisma.$transaction(async (tx) => {
    const createdRental = await tx.rental.create({
      data: {
        userId,
        bookId,
        rentDate,
        dueDate,
        status: "ACTIVE",
      },
      include: {
        book: true,
        user: true,
      },
    });

    await tx.book.update({
      where: { id: bookId },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    return createdRental;
  });

  return rental;
};