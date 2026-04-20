import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      loyaltyCard: {
        create: {
          points: 0,
        },
      },
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
};