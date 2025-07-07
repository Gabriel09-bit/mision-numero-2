import express from "express";


import {
  createContacts,
  getContacts,
  updateContacts,
  deleteContacts,
} from "../controllers/contactController.js";

const router = express.Router(); // router es un mini servidor para agrupar rutas

// Endpoints CRUD
router.post("/contacts", createContacts); // Crear tarea
router.get("/contacts", getContacts); // Leer tareas
router.put("/contacts/:id", updateContacts); // Actualizar tarea
router.delete("/contacts/:id", deleteContacts); // Eliminar tarea

export default router;
