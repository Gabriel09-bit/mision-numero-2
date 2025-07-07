import PropTypes from 'prop-types';

export default function ProfileSettings() {
  return (
    <section className="profile-section" aria-label="Configuración del perfil">
      <h3>Configuración del Perfil</h3>
      <form className="profile-settings-form">
        <label>
          Cambiar contraseña:
          <input type="password" placeholder="Nueva contraseña" aria-label="Nueva contraseña" />
        </label>
        <label>
          Notificaciones:
          <select aria-label="Notificaciones">
            <option>Activadas</option>
            <option>Desactivadas</option>
          </select>
        </label>
        <button className="button" type="submit" aria-label="Guardar cambios">Guardar Cambios</button>
      </form>
    </section>
  );
}

ProfileSettings.propTypes = {};