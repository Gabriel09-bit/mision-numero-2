import React, { useState } from 'react';

const ContactItem = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(contact.id, form);
    setEditing(false);
  };

  // Avatar: usa imagen si existe, si no, iniciales
  const avatarUrl = contact.avatar
    ? contact.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=7b2ff2&color=fff`;

  return (
    <div className="contact-item" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <img
        src={avatarUrl}
        alt="avatar"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid #7b2ff2",
          objectFit: "cover",
          marginTop: 4
        }}
      />
      <div style={{ flex: 1 }}>
        {editing ? (
          <>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="input-modern"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-modern"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="input-modern"
            />
            <input
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Mensaje o nota"
              className="input-modern"
            />
            <button className="button" onClick={handleSave}>Guardar</button>
            <button className="button" onClick={() => setEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <h3 style={{ marginBottom: 4 }}>
              {contact.name}
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: contact.favorite ? "#FFD700" : "#bbb",
                  fontSize: "1.2em",
                  marginLeft: "0.5em",
                  cursor: "pointer"
                }}
                title={contact.favorite ? "Quitar de favoritos" : "Marcar como favorito"}
                onClick={() => onToggleFavorite(contact.id)}
              >
                {contact.favorite ? "★" : "☆"}
              </button>
            </h3>
            <p style={{ margin: 0 }}>Email: {contact.email}</p>
            <p style={{ margin: 0 }}>Teléfono: {contact.phone}</p>
            <p style={{ margin: "0.5em 0", color: "#7b2ff2", fontStyle: "italic" }}>
              {contact.message || <span style={{ color: "#aaa" }}>Sin mensaje</span>}
            </p>
            <button className="button" onClick={() => setEditing(true)}>Editar</button>
            <button className="button" onClick={() => onDelete(contact.id)}>Eliminar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
