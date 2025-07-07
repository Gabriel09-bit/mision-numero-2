// Centraliza las llamadas a la API de contactos
const API_URL = 'https://proyecto-numero-3.onrender.com/api/contacts';

export async function fetchContacts(userId) {
  const res = await fetch(`${API_URL}?userId=${userId}`);
  if (!res.ok) throw new Error('Error al obtener contactos');
  return res.json();
}

export async function addContact(contact) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al agregar contacto');
  return data;
}

export async function editContact(id, contact) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al editar contacto');
  return data;
}

export async function deleteContact(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar contacto');
  return res.json();
}
