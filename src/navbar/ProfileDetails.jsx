import PropTypes from 'prop-types';

export default function ProfileDetails() {
  return (
    <section className="profile-section" aria-label="Detalles del perfil">
      <h3>Detalles del Perfil</h3>
      <ul className="profile-list">
        <li><b>Nombre:</b> Juan Pérez</li>
        <li><b>Email:</b> juan@mail.com</li>
        <li><b>Teléfono:</b> 123456789</li>
        <li><b>Rol:</b> Administrador</li>
      </ul>
    </section>
  );
}

ProfileDetails.propTypes = {};