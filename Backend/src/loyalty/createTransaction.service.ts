export const createLoyaltyTransaction = async (
  loyaltyCardId: number,
  points: number,
  reason: string,
  tx: any
) => {
  return tx.loyaltyTransaction.create({
    data: {
      loyaltyCardId,
      points,
      reason,
    },
  });
};