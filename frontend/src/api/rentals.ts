import api from "./axios";

export const getMyRentalsRequest = async () => {
  const response = await api.get("/rentals/my");
  return response.data;
};

export const createRentalRequest = async (bookId: number) => {
  const response = await api.post("/rentals", { bookId });
  return response.data;
};

export const returnRentalRequest = async (rentalId: number) => {
  const response = await api.patch(`/rentals/${rentalId}/return`);
  return response.data;
};