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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.numero) newErrors.numero = 'El número es obligatorio';
    if (!form.tipo) newErrors.tipo = 'El tipo es obligatorio';
    if (!form.pais) newErrors.pais = 'El país es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onEdit(contact.id, form);
    setEditing(false);
    setErrors({});
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.nombre || '')}&background=7b2ff2&color=fff`;

  return (
    <div className="contact-item" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <img
        src={avatarUrl}
        alt="avatar"
        style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #7b2ff2", objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        {editing ? (
          <>
            <div className="input-group">
              <label htmlFor={`nombre-${contact.id}`} className="sr-only">Nombre</label>
              <input
                id={`nombre-${contact.id}`}
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-modern"
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>
            <div className="input-group">
              <label htmlFor={`numero-${contact.id}`} className="sr-only">Número</label>
              <input
                id={`numero-${contact.id}`}
                name="numero"
                type="tel"
                value={form.numero}
                onChange={handleChange}
                placeholder="Número"
                className="input-modern"
              />
              {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
            </div>
            <div className="input-group">
              <label htmlFor={`tipo-${contact.id}`} className="sr-only">Tipo</label>
              <input
                id={`tipo-${contact.id}`}
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                placeholder="Tipo"
                className="input-modern"
              />
              {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
            </div>
            <div className="input-group">
              <label htmlFor={`pais-${contact.id}`} className="sr-only">País</label>
              <input
                id={`pais-${contact.id}`}
                name="pais"
                value={form.pais}
                onChange={handleChange}
                placeholder="País"
                className="input-modern"
              />
              {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais}</p>}
            </div>
            <div className="input-group">
              <label htmlFor={`mensaje-${contact.id}`} className="sr-only">Mensaje o nota</label>
              <input
                id={`mensaje-${contact.id}`}
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Mensaje o nota"
                className="input-modern"
              />
            </div>
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
                aria-label={contact.favorite ? "Quitar de favoritos" : "Marcar como favorito"}
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
