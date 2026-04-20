import prisma from "../config/prisma";

export const addPointsToUser = async (
  userId: number,
  points: number,
  tx: any
) => {
  const loyaltyCard = await tx.loyaltyCard.findUnique({
    where: { userId },
  });

  if (!loyaltyCard) {
    throw new Error("LOYALTY_CARD_NOT_FOUND");
  }

  const updatedCard = await tx.loyaltyCard.update({
    where: { id: loyaltyCard.id },
    data: {
      points: {
        increment: points,
      },
    },
  });

  return updatedCard;
};