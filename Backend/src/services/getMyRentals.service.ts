import prisma from "../config/prisma";

export const getMyRentalsService = async (userId: number) => {
  return prisma.rental.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};