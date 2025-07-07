import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nombre: contact.nombre || '',
    numero: contact.numero,
    tipo: contact.tipo,
    pais: contact.pais,
    mensaje: contact.mensaje || ''
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

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent((contact.nombre || form.nombre || 'Sin nombre'))}&background=7b2ff2&color=fff`;

  return (
    <div className="contact-item" style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
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
              <label htmlFor={`mensaje-${contact.id}`} className="sr-only">Mensaje</label>
              <textarea
                id={`mensaje-${contact.id}`}
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Mensaje o nota"
                className="input-modern"
                rows={2}
              />
            </div>
            <button onClick={handleSave} className="button button-gradient" aria-label="Guardar cambios">Guardar</button>
            <button onClick={() => setEditing(false)} className="button" aria-label="Cancelar edición">Cancelar</button>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 700, fontSize: '1.1em', color: '#4f8cff', marginBottom: 2 }}>
              {contact.nombre || 'Sin nombre'}
            </div>
            <div style={{ color: '#888', fontSize: '0.98em', marginBottom: 4 }}>
              {contact.mensaje ? <span>📝 {contact.mensaje}</span> : <span style={{ color: '#bbb' }}>Sin mensaje</span>}
            </div>
            <div style={{ fontSize: '0.97em', marginBottom: 2 }}>
              <b>Número:</b> {contact.numero}
            </div>
            <div style={{ fontSize: '0.97em', marginBottom: 2 }}>
              <b>Tipo:</b> {contact.tipo} <b>País:</b> {contact.pais}
            </div>
            <button onClick={() => setEditing(true)} className="button" aria-label="Editar contacto">Editar</button>
            <button onClick={() => onDelete(contact.id)} className="button" aria-label="Eliminar contacto">Eliminar</button>
            <button onClick={() => onToggleFavorite(contact.id)} className="button" aria-label={contact.favorite ? "Quitar de favoritos" : "Marcar como favorito"}>
              {contact.favorite ? '★' : '☆'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};

export default ContactItem;
