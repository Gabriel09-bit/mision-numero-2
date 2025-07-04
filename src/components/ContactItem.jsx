import React, { useState } from 'react';

const ContactItem = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nombre: contact.nombre,
    numero: contact.numero,
    tipo: contact.tipo,
    pais: contact.pais,
    mensaje: contact.mensaje || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(contact.id, form);
    setEditing(false);
  };

  // Avatar: usa iniciales del nombre
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.nombre || '')}&background=7b2ff2&color=fff`;

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
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="input-modern"
            />
            <input
              name="numero"
              value={form.numero}
              onChange={handleChange}
              placeholder="Número"
              className="input-modern"
            />
            <input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Tipo"
              className="input-modern"
            />
            <input
              name="pais"
              value={form.pais}
              onChange={handleChange}
              placeholder="País"
              className="input-modern"
            />
            <input
              name="mensaje"
              value={form.mensaje}
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
              {contact.nombre}
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
            <p style={{ margin: 0 }}><b>Número:</b> {contact.numero}</p>
            <p style={{ margin: 0 }}><b>Tipo:</b> {contact.tipo}</p>
            <p style={{ margin: 0 }}><b>País:</b> {contact.pais}</p>
            <p style={{ margin: "0.5em 0", color: "#7b2ff2", fontStyle: "italic" }}>
              {contact.mensaje || <span style={{ color: "#aaa" }}>Sin mensaje</span>}
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
