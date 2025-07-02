import React, { useState } from 'react';
import { Plus, Mail, Phone, User } from 'lucide-react';

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, completa todos los campos');
      return;
    }
    addContact(formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('¡Contacto agregado exitosamente!');
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
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold">
            <User className="w-4 h-4" />
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa el nombre completo"
            className="input-modern"
            maxLength={30}
            required
          />
          {formData.name.length >= 30 && (
            <span className="limited-warning">Máximo 30 caracteres</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold">
            <Mail className="w-4 h-4" />
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa el correo electrónico"
            className="input-modern"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold">
            <Phone className="w-4 h-4" />
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ingresa el número de teléfono"
            className="input-modern"
            maxLength={15}
            required
          />
          {formData.phone.length >= 15 && (
            <span className="limited-warning">Máximo 15 caracteres</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold">
            Mensaje / Nota
          </label>
          <input
            id="message"
            name="message"
            type="text"
            value={formData.message || ""}
            onChange={handleChange}
            placeholder="Mensaje o nota para este contacto"
            className="input-modern"
          />
        </div>

        <button type="submit" className="button-gradient w-full">
          <Plus className="w-4 h-4 mr-2" />
          Agregar contacto
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
