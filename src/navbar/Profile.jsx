import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Profile({ setCurrentUser, showNotification }) {
  const [bio, setBio] = useState("Administrador apasionado por la tecnología.");
  const [editing, setEditing] = useState(false);
  const [bioInput, setBioInput] = useState(bio);
  const [avatar, setAvatar] = useState("https://img.icons8.com/color/96/000000/user-male-circle--v2.png");
  const [name, setName] = useState("Juan Pérez");
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
    setBio(bioInput);
    setEditing(false);
  };

  const handleSaveName = () => {
    setName(nameInput);
    setEditingName(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div style={{ position: "relative" }}>
          <img
            src={avatar}
            alt="profile"
            className="profile-avatar"
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
              cursor: "pointer"
            }}
            title="Cambiar avatar"
          >
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
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                style={{ width: "100%", marginBottom: "0.5em" }}
              />
              <button className="button" onClick={handleSaveName}>Guardar</button>
              <button className="button" onClick={() => setEditingName(false)}>Cancelar</button>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: 0 }}>{name}</h2>
              <button className="button" onClick={() => setEditingName(true)} style={{ marginBottom: "0.5em" }}>Editar Nombre</button>
            </>
          )}
          <p className="profile-role">Administrador</p>
          {editing ? (
            <div>
              <textarea
                value={bioInput}
                onChange={e => setBioInput(e.target.value)}
                rows={2}
                style={{ width: "100%", marginBottom: "0.5em" }}
              />
              <button className="button" onClick={handleSaveBio}>Guardar</button>
              <button className="button" onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          ) : (
            <>
              <p className="profile-bio">{bio}</p>
              <button className="button" onClick={() => setEditing(true)}>Editar Bio</button>
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