import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onEdit, onDelete, onToggleFavorite }) => (
  <div className="contact-list">
    <h2 className="text-2xl font-bold text-gradient" style={{ textAlign: "center", marginBottom: "1em" }}>
      {contacts.length > 0 ? "Contactos encontrados" : "Sin contactos"}
    </h2>
    {contacts.length === 0 ? (
      <p style={{ textAlign: "center", color: "#888", fontSize: "1.1em" }}>
        No hay contactos que coincidan con tu búsqueda.<br />
        ¡Agrega tu primer contacto!
      </p>
    ) : (
      contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))
    )}
  </div>
);

export default ContactList;

// Ejemplo de ContactItem.jsx
function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-item">
      <div>
        <b>Número:</b> {contact.numero}<br />
        <b>Tipo:</b> {contact.tipo}<br />
        <b>País:</b> {contact.pais}
      </div>
      <button onClick={() => onEdit(contact.id, contact)}>Editar</button>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
}