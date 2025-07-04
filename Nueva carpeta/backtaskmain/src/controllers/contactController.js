import prisma from "../prismaClient.js";

// CREAMOS LOS CONTROLADORES PARA EL MODELO TAREAS

// EVENT LOOP

export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        user: true,
      
      },
    });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    res.json(contact);
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
    res.status(404).json({ error: "Contacto no encontrado" });
  }
};

// Eliminar una tarea
export const deleteContacts = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({ where: { id: Number(id) } });
    res.json({ message: "contacto eliminada" });
  } catch (error) {
    res.status(404).json({ error: "contacto no encontrado" });
  }
};
