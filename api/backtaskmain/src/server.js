import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";
import contactApiRouter from "./routes/contactApiRouter.js";
import { connect } from "./prismaClient.js";

dotenv.config();

const app = express();

app.use(cors()); // Permite peticiones desde otros orígenes (ej: frontend)
app.use(express.json()); // Permite recibir JSON desde el frontend
app.use("/api", contactsRouter); // Prefijo para nuestras rutas
app.use("/api/simple", contactApiRouter); // Nueva ruta para registro simple

// conectarme a la base de datos

connect();

const PORT = typeof process !== 'undefined' && process.env && process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT} o https://proyecto-numero-3.onrender.com`);
});
