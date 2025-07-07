import prisma from "../prismaClient.js";

// Obtener todos los contactos
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo contacto
export const createContact = async (req, res) => {
  const { nombre, numero, pais, mensaje, tipo } = req.body;
  if (!nombre || !numero || !pais || !tipo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  try {
    const contact = await prisma.contact.create({
      data: { nombre, numero, pais, mensaje, tipo },
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error al crear contacto:", error);
    res.status(400).json({ error: "Error al crear contacto" });
  }
};

// Actualizar un contacto
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { nombre, numero, pais, mensaje, tipo } = req.body;
  try {
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: { nombre, numero, pais, mensaje, tipo },
    });
    res.json(contact);
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    res.status(404).json({ error: "Contacto no encontrado" });
  }
};

// Eliminar un contacto
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({ where: { id: Number(id) } });
    res.json({ message: "Contacto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    res.status(404).json({ error: "Contacto no encontrado" });
  }
};
