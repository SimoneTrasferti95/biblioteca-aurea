import api from "./axios";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export const loginRequest = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const meRequest = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};