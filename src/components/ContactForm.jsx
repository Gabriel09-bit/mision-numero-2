import React, { useState, useRef, useEffect } from 'react';
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
  const nombreRef = useRef(null);

  useEffect(() => {
    if (nombreRef.current) nombreRef.current.focus();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (formData.nombre.length > NAME_MAX) newErrors.nombre = `Máx. ${NAME_MAX} caracteres`;
    if (!formData.numero) newErrors.numero = 'El número es obligatorio';
    if (!/^[0-9]+$/.test(formData.numero)) newErrors.numero = 'Solo dígitos permitidos';
    if (formData.numero.length > PHONE_MAX) newErrors.numero = `Máx. ${PHONE_MAX} dígitos`;
    if (!formData.tipo) newErrors.tipo = 'El tipo es obligatorio';
    if (!formData.pais) newErrors.pais = 'El país es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    addContact({
      nombre: formData.nombre.trim(),
      numero: formData.numero.trim(),
      tipo: formData.tipo,
      pais: formData.pais,
      mensaje: formData.mensaje.trim()
    });
    setFormData({ nombre: '', numero: '', tipo: '', pais: '', mensaje: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') {
      if (value.length > NAME_MAX) return;
      setFormData({ ...formData, nombre: value.replace(/\n/g, '') });
    } else if (name === 'numero') {
      // Solo dígitos
      const digits = value.replace(/\D/g, '');
      if (digits.length > PHONE_MAX) return;
      setFormData({ ...formData, numero: digits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="card-modern hover-lift animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Agregar nuevo contacto</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Formulario de contacto">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" className="input-modern" maxLength={NAME_MAX} ref={nombreRef} aria-label="Nombre" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: formData.nombre.length === NAME_MAX ? '#e53e3e' : '#888' }}>{formData.nombre.length}/{NAME_MAX}</span>
            {formData.nombre.length === NAME_MAX && <span style={{ color: '#e53e3e' }}>¡Límite alcanzado!</span>}
          </div>
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="numero">Número</label>
          <input id="numero" name="numero" type="tel" value={formData.numero} onChange={handleChange} placeholder="Número de teléfono" className="input-modern" maxLength={PHONE_MAX} pattern="[0-9]*" inputMode="numeric" aria-label="Número de teléfono" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: formData.numero.length === PHONE_MAX ? '#e53e3e' : '#888' }}>{formData.numero.length}/{PHONE_MAX}</span>
            {formData.numero.length === PHONE_MAX && <span style={{ color: '#e53e3e' }}>¡Límite alcanzado!</span>}
          </div>
          {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Tipo de contacto" className="input-modern" aria-label="Tipo de contacto" />
          {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
        </div>
        <div>
          <label htmlFor="pais">País</label>
          <input id="pais" name="pais" value={formData.pais} onChange={handleChange} placeholder="País" className="input-modern" aria-label="País" />
          {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais}</p>}
        </div>
        <div>
          <label>Mensaje</label>
          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Mensaje o nota" className="input-modern" rows={2} maxLength={200} aria-label="Mensaje" />
        </div>
        <button type="submit" className="button button-gradient" disabled={Object.keys(errors).length > 0} aria-label="Agregar contacto">
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
