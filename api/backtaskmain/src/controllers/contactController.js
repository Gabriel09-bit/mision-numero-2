import prisma from "../prismaClient.js";

// Controladores para el modelo Contact

export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: { user: true },
    });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener contactos" });
  }
};

export const createContacts = async (req, res) => {
  const { numero, tipo, pais, userId, nombre, mensaje } = req.body;
  if (!numero || !tipo || !pais || !userId || !nombre) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  try {
    const contact = await prisma.contact.create({
      data: { numero, tipo, pais, userId, nombre, mensaje },
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(400).json({ error: "Error al crear contacto" });
  }
};

export const updateContacts = async (req, res) => {
  const { id } = req.params;
  const { numero, tipo, pais, userId, nombre, mensaje } = req.body;
  try {
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: { numero, tipo, pais, userId, nombre, mensaje },
    });
    res.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(404).json({ error: "Contacto no encontrado" });
  }
};

export const deleteContacts = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await prisma.contact.delete({ where: { id: Number(id) } });
    res.json({ message: "Contacto eliminado correctamente", deletedContact });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(404).json({ error: "Contacto no encontrado" });
  }
};
