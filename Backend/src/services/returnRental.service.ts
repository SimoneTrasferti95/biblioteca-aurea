import prisma from "../config/prisma";
import { addPointsToUser } from "../loyalty/addPoints.service";
import { createLoyaltyTransaction } from "../loyalty/createTransaction.service";

export const returnRentalService = async (rentalId: number) => {
  const rental = await prisma.rental.findUnique({
    where: { id: rentalId },
  });

  if (!rental) {
    throw new Error("RENTAL_NOT_FOUND");
  }

  if (rental.status === "RETURNED") {
    throw new Error("ALREADY_RETURNED");
  }

  const pointsToAdd = 10;

  const updatedRental = await prisma.$transaction(async (tx) => {
    const returnedRental = await tx.rental.update({
      where: { id: rentalId },
      data: {
        returnDate: new Date(),
        status: "RETURNED",
      },
    });

    await tx.book.update({
      where: { id: rental.bookId },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });

    const loyaltyCard = await addPointsToUser(
      rental.userId,
      pointsToAdd,
      tx
    );

    await createLoyaltyTransaction(
      loyaltyCard.id,
      pointsToAdd,
      "Restituzione libro",
      tx
    );

    return returnedRental;
  });

  return updatedRental;
};