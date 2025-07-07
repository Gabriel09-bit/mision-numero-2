import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const connect = async function () {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export const disconnect = async function () {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
};

export default prisma;
