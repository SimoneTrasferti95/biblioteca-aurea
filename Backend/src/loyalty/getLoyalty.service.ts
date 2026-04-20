import prisma from "../config/prisma";

export const getLoyaltyByUserId = async (userId: number) => {
  return prisma.loyaltyCard.findUnique({
    where: { userId },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};