import prisma from "../config/prisma";

type RentalStatusFilter = "ACTIVE" | "RETURNED" | "EXPIRED" | "ALL";

export const getAdminRentalsService = async (status?: string) => {
  const normalizedStatus = (status || "ALL").toUpperCase() as RentalStatusFilter;

  const where =
    normalizedStatus === "ALL"
      ? {}
      : {
          status: normalizedStatus,
        };

  return prisma.rental.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      book: {
        select: {
          id: true,
          title: true,
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};