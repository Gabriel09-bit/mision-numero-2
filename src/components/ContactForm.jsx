import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numero: '',
    tipo: '',
    pais: '',
    mensaje: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.numero || !formData.tipo || !formData.pais) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    addContact(formData);
    setFormData({ nombre: '', numero: '', tipo: '', pais: '', mensaje: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card-modern hover-lift animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Agregar nuevo contacto</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label>Número</label>
          <input
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Número de teléfono"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label>Tipo</label>
          <input
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            placeholder="Tipo de contacto"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label>País</label>
          <input
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            placeholder="País"
            className="input-modern"
            required
          />
        </div>
        <div>
          <label>Mensaje</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Mensaje o nota"
            className="input-modern"
            rows={2}
          />
        </div>
        <button className="button" type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ContactForm;
