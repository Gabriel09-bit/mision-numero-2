export default function ProfileSettings() {
  return (
    <div className="profile-section">
      <h3>Configuración del Perfil</h3>
      <form className="profile-settings-form">
        <label>
          Cambiar contraseña:
          <input type="password" placeholder="Nueva contraseña" />
        </label>
        <label>
          Notificaciones:
          <select>
            <option>Activadas</option>
            <option>Desactivadas</option>
          </select>
        </label>
        <button className="button" type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}