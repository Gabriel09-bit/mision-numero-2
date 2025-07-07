import express from "express";
import {
  createContacts,
  getContacts,
  updateContacts,
  deleteContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Endpoints CRUD
router.post("/contacts", createContacts);
router.get("/contacts", getContacts);
router.put("/contacts/:id", updateContacts);
router.delete("/contacts/:id", deleteContacts);

export default router;
