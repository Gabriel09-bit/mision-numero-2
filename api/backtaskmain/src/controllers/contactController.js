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
  console.log('Datos recibidos en backend:', req.body); // LOG para depuración
  // Validaciones de backend
  if (!numero || !tipo || !pais || !userId || !nombre) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  if (typeof nombre !== 'string' || nombre.length < 2 || nombre.length > 30) {
    return res.status(400).json({ error: "El nombre debe tener entre 2 y 30 caracteres" });
  }
  if (!/^[0-9]{7,15}$/.test(numero)) {
    return res.status(400).json({ error: "El número debe tener entre 7 y 15 dígitos y solo números" });
  }
  if (typeof tipo !== 'string' || tipo.length < 2 || tipo.length > 20) {
    return res.status(400).json({ error: "El tipo debe tener entre 2 y 20 caracteres" });
  }
  if (typeof pais !== 'string' || pais.length < 2 || pais.length > 30) {
    return res.status(400).json({ error: "El país debe tener entre 2 y 30 caracteres" });
  }
  if (mensaje && mensaje.length > 200) {
    return res.status(400).json({ error: "El mensaje no puede superar 200 caracteres" });
  }
  try {
    const contact = await prisma.contact.create({
      data: { numero, tipo, pais, userId, nombre, mensaje },
    });
    console.log('Contacto creado y enviado al frontend:', contact); // LOG para depuración
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
