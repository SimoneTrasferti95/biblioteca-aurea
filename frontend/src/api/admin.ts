import api from "./axios";

export const getAdminStatsRequest = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getAdminRentalsRequest = async (status = "ALL") => {
  const response = await api.get(`/admin/rentals?status=${status}`);
  return response.data;
};