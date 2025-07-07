import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';

const NAME_MAX = 30;
const PHONE_MAX = 15;

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numero: '',
    tipo: '',
    pais: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (formData.nombre.length > NAME_MAX) newErrors.nombre = `El nombre no puede superar ${NAME_MAX} caracteres`;
    if (!formData.numero) newErrors.numero = 'El número es obligatorio';
    if (!/^[0-9]+$/.test(formData.numero)) newErrors.numero = 'El número solo puede contener dígitos';
    if (formData.numero.length > PHONE_MAX) newErrors.numero = `El número no puede superar ${PHONE_MAX} dígitos`;
    if (!formData.tipo) newErrors.tipo = 'El tipo es obligatorio';
    if (!formData.pais) newErrors.pais = 'El país es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    addContact({
      ...formData,
      nombre: formData.nombre.trim(),
      numero: formData.numero.trim()
    });
    setFormData({ nombre: '', numero: '', tipo: '', pais: '', mensaje: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre' && value.length > NAME_MAX) return;
    if (name === 'numero' && value.length > PHONE_MAX) return;
    setFormData({ ...formData, [name]: value });
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
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" className="input-modern" maxLength={NAME_MAX} />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="numero">Número</label>
          <input id="numero" name="numero" type="tel" value={formData.numero} onChange={handleChange} placeholder="Número de teléfono" className="input-modern" maxLength={PHONE_MAX} pattern="[0-9]*" inputMode="numeric" />
          {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Tipo de contacto" className="input-modern" />
          {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
        </div>
        <div>
          <label htmlFor="pais">País</label>
          <input id="pais" name="pais" value={formData.pais} onChange={handleChange} placeholder="País" className="input-modern" />
          {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais}</p>}
        </div>
        <div>
          <label>Mensaje</label>
          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Mensaje o nota" className="input-modern" rows={2} />
        </div>
        <button type="submit" className="button button-gradient" disabled={Object.keys(errors).length > 0}>
          Agregar contacto
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default ContactForm;
