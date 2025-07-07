import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";
import { connect } from "./prismaClient.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", contactsRouter);

connect();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en https://proyecto-numero-3.onrender.com/ (puerto: ${PORT})`);
});
