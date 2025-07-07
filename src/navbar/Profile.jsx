import { Outlet, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from "react";
import { User, Edit2, Save, X, Camera } from "lucide-react";

export default function Profile({ currentUser, setCurrentUser, showNotification }) {
  const [bio, setBio] = useState(currentUser?.bio || "Administrador apasionado por la tecnología.");
  const [editing, setEditing] = useState(false);
  const [bioInput, setBioInput] = useState(bio);
  const [avatar, setAvatar] = useState(currentUser?.avatar || "https://img.icons8.com/color/96/000000/user-male-circle--v2.png");
  const [name, setName] = useState(currentUser?.name || "Juan Pérez");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBio = () => {
    if (!bioInput.trim()) return;
    setBio(bioInput);
    setEditing(false);
    showNotification && showNotification("Biografía actualizada");
  };

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    setName(nameInput);
    setEditingName(false);
    showNotification && showNotification("Nombre actualizado");
  };

  return (
    <div className="profile-container" style={{
      background: "linear-gradient(120deg, #f4f8ff 60%, #e0e7ff 100%)",
      boxShadow: "0 4px 24px #7b2ff222"
    }}>
      <div className="profile-header">
        <div style={{ position: "relative" }}>
          <img
            src={avatar}
            alt="profile"
            className="profile-avatar"
            style={{ border: "3px solid #7b2ff2" }}
          />
          <label
            className="button"
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%) scale(0.8)",
              fontSize: "0.9em",
              padding: "0.3em 1em",
              cursor: "pointer",
              background: "#7b2ff2",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            title="Cambiar avatar"
          >
            <Camera size={16} />
            Cambiar
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <div>
          {editingName ? (
            <div>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="input-modern"
                style={{ width: "100%", marginBottom: "0.5em" }}
                aria-label="Nombre de usuario"
              />
              <button className="button" onClick={handleSaveName} aria-label="Guardar nombre"><Save size={16} /> Guardar</button>
              <button className="button" onClick={() => setEditingName(false)}><X size={16} /> Cancelar</button>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: 0, fontWeight: 800, color: "#4f8cff" }}>
                <User size={20} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {name}
              </h2>
              <button className="button" onClick={() => setEditingName(true)} style={{ marginBottom: "0.5em" }}>
                <Edit2 size={16} /> Editar Nombre
              </button>
            </>
          )}
          <p className="profile-role" style={{ color: "#7b2ff2" }}>Administrador</p>
          {editing ? (
            <div>
              <textarea
                value={bioInput}
                onChange={e => setBioInput(e.target.value)}
                rows={2}
                className="input-modern"
                style={{ width: "100%", marginBottom: "0.5em" }}
                aria-label="Biografía"
              />
              <button className="button" onClick={handleSaveBio} aria-label="Guardar biografía"><Save size={16} /> Guardar</button>
              <button className="button" onClick={() => setEditing(false)}><X size={16} /> Cancelar</button>
            </div>
          ) : (
            <>
              <p className="profile-bio">{bio}</p>
              <button className="button" onClick={() => setEditing(true)}><Edit2 size={16} /> Editar Bio</button>
            </>
          )}
        </div>
      </div>
      <nav className="profile-nav">
        <Link className="button" to="details">Detalles</Link>
        <Link className="button" to="settings">Configuración</Link>
      </nav>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
  showNotification: PropTypes.func
};