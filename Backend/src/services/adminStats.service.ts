import prisma from "../config/prisma";

export const getAdminStatsService = async () => {
  const totalBooks = await prisma.book.count();

  const totalRentals = await prisma.rental.count();

  const activeRentals = await prisma.rental.count({
    where: {
      status: "ACTIVE",
    },
  });

  const returnedRentals = await prisma.rental.count({
    where: {
      status: "RETURNED",
    },
  });

  return {
    totalBooks,
    totalRentals,
    activeRentals,
    returnedRentals,
  };
};