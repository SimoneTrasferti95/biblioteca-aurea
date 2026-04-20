import api from "./axios";

export const getMyLoyaltyRequest = async () => {
  const response = await api.get("/loyalty/me");
  return response.data;
};