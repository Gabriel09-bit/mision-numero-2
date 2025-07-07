import express from "express";
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
} from "../controllers/contactApiController.js";

const router = express.Router();

router.get("/contacts", getAllContacts);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
