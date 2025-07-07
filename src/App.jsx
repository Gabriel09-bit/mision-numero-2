import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import ContactList from './components/ContactList';
import Login from './navbar/Login';
import Info from './navbar/info';
import Profile from './navbar/Profile';
import ProfileDetails from './navbar/ProfileDetails';
import ProfileSettings from './navbar/ProfileSettings';
import ContactForm from './components/ContactForm';
import ContactChart from './components/ContactChart';
import './styles/App.css';

function App() {
  // Multiusuario: lista de usuarios y usuario actual
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@mail.com", password: "1234", avatar: "" },
    { id: 2, name: "Ana López", email: "ana@mail.com", password: "abcd", avatar: "" }
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  // Contactos por usuario
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  // Notificaciones
  const showNotification = (msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(""), 2500);
  };

  // Login multiusuario
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      showNotification(`Bienvenido ${user.name}`, "success");
    } else {
      showNotification("Credenciales incorrectas", "error");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    showNotification("Sesión cerrada", "info");
  };

  // Agregar contacto (solo para usuario actual)
  const addContact = (contact) => {
    if (!currentUser) {
      showNotification("Debes iniciar sesión para agregar contactos.", "error");
      return;
    }
    setLoading(true);
    fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...contact,
        userId: currentUser.id
      })
    })
      .then(res => res.json())
      .then(newContact => {
        setContacts([...contacts, newContact]);
        showNotification("Contacto agregado", "success");
      })
      .catch(() => showNotification("Error al agregar contacto", "error"))
      .finally(() => setLoading(false));
  };

  // Editar contacto
  const editContact = (id, updatedContact) => {
    setLoading(true);
    fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedContact, userId: currentUser.id })
    })
      .then(res => res.json())
      .then(updated => {
        setContacts(contacts.map(c => c.id === id ? updated : c));
        showNotification("Contacto editado", "success");
      })
      .catch(() => showNotification("Error al editar contacto", "error"))
      .finally(() => setLoading(false));
  };

  // Borrar contacto con confirmación
  const deleteContact = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este contacto?")) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setContacts(contacts.filter(c => c.id !== id));
        showNotification("Contacto eliminado", "success");
      })
      .catch(() => showNotification("Error al eliminar contacto", "error"))
      .finally(() => setLoading(false));
  };

  // Filtrado de contactos (solo los del usuario actual)
  const filteredContacts = contacts
    .filter(c => c.userId === (currentUser?.id ?? -1))
    .filter(c =>
      (c.nombre || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.numero || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.tipo || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.pais || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.mensaje || '').toLowerCase().includes(search.toLowerCase())
    );

  // Ordenar favoritos primero
  const sortedContacts = [
    ...filteredContacts.filter(c => c.favorite),
    ...filteredContacts.filter(c => !c.favorite)
  ];

  // Modo oscuro global
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Exportar contactos a CSV
  const exportContacts = () => {
    const headers = ['Nombre', 'Número', 'Tipo', 'País', 'Mensaje'];
    const rows = filteredContacts.map(c => [c.nombre, c.numero, c.tipo, c.pais, c.mensaje]);
    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contactos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Favoritos (solo frontend, para persistencia real, implementa en backend)
  const toggleFavorite = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
  };

  // Importar contactos desde CSV (nombre,numero,tipo,pais,mensaje)
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split('\n');
      const newContacts = lines.slice(1).map(line => {
        const [nombre, numero, tipo, pais, mensaje] = line.split(',');
        return {
          nombre: nombre?.trim(),
          numero: numero?.trim(),
          tipo: tipo?.trim(),
          pais: pais?.trim(),
          mensaje: mensaje?.trim() || "",
          userId: currentUser.id
        };
      }).filter(c => c.nombre && c.numero && c.tipo && c.pais);
      Promise.all(newContacts.map(contact =>
        fetch('http://localhost:3001/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact)
        }).then(res => res.json())
      )).then(importedContacts => {
        setContacts([...contacts, ...importedContacts]);
        showNotification("Contactos importados", "success");
      });
    };
    reader.readAsText(file);
  };

  // Cargar contactos desde la API al iniciar sesión o cambiar de usuario
  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      fetch(`http://localhost:3001/api/contacts?userId=${currentUser.id}`)
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(() => setContacts([]))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          currentUser={currentUser}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSettings={() => setShowSettings(true)}
        />
      )}
      {notification && (
        <div className={`notification ${notification.type || ""}`}>{notification.msg}</div>
      )}
      {loading && (
        <div className="notification" style={{ background: "#7b2ff2", color: "#fff" }}>
          Cargando...
        </div>
      )}
      {/* Modal de configuración */}
      {showSettings && (
        <div className="modal-bg" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Configuración</h2>
            <div style={{ textAlign: "left", margin: "1.5em 0" }}>
              <label style={{ display: "block", marginBottom: "1em" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: 8 }}
                  checked={localStorage.getItem("notificaciones") === "on"}
                  onChange={e => {
                    localStorage.setItem("notificaciones", e.target.checked ? "on" : "off");
                  }}
                />
                Activar notificaciones
              </label>
              <label style={{ display: "block", marginBottom: "1em" }}>
                Idioma:
                <select
                  style={{ marginLeft: 8 }}
                  defaultValue={localStorage.getItem("idioma") || "es"}
                  onChange={e => localStorage.setItem("idioma", e.target.value)}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label style={{ display: "block", marginBottom: "1em" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: 8 }}
                  checked={darkMode}
                  onChange={() => setDarkMode(dm => !dm)}
                />
                Modo oscuro
              </label>
            </div>
            <button className="button" onClick={() => setShowSettings(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <div className="container">
        <Routes>
          <Route path="/login" element={
            isAuthenticated
              ? <Navigate to="/" />
              : <Login onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />
          } />
          <Route path="/info" element={
            isAuthenticated
              ? <Info />
              : <Navigate to="/login" />
          } />
          <Route path="/profile" element={
            isAuthenticated
              ? <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} setUsers={setUsers} showNotification={showNotification} />
              : <Navigate to="/login" />
          }>
            <Route path="details" element={<ProfileDetails currentUser={currentUser} />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <div className="dashboard-header">
                  {currentUser?.avatar && (
                    <img
                      src={currentUser.avatar}
                      alt="avatar"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        border: "2px solid #7b2ff2",
                        objectFit: "cover",
                        marginBottom: 10
                      }}
                    />
                  )}
                  <h1 style={{ marginBottom: 0, fontWeight: 900, color: "#4f8cff" }}>
                    ¡Bienvenido, <b>{currentUser?.name}</b>!
                  </h1>
                  <button
                    className="button registro-contactos"
                    style={{ margin: "1.5em auto 0 auto", display: "block" }}
                    onClick={() => setShowForm(f => !f)}
                  >
                    {showForm ? "Cerrar registro de contacto" : "Registro de Contactos"}
                  </button>
                </div>

                {showForm && (
                  <div style={{ marginBottom: "2em" }}>
                    <ContactForm addContact={addContact} />
                  </div>
                )}

                <div className="dashboard-stats" style={{ display: "flex", justifyContent: "center", gap: "2em", marginBottom: "1.5em" }}>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>{contacts.length}</span><br />
                    <span style={{ color: "#888" }}>Total de contactos</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                      {contacts.filter(c => c.mensaje).length}
                    </span><br />
                    <span style={{ color: "#888" }}>Con mensaje</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                      {contacts.filter(c => c.numero).length}
                    </span><br />
                    <span style={{ color: "#888" }}>Con número</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1em", marginBottom: "1em", flexWrap: "wrap" }}>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar por nombre, número, tipo, país o mensaje..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: 220, padding: "0.7em", borderRadius: "8px", border: "1.5px solid #7b2ff2" }}
                  />
                  <button className="button button-gradient" onClick={exportContacts}>
                    Exportar contactos a CSV
                  </button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    style={{ display: "inline-block", minWidth: 180 }}
                  />
                </div>

                <ContactChart contacts={filteredContacts} />

                <ContactList
                  contacts={sortedContacts}
                  onEdit={editContact}
                  onDelete={deleteContact}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
      <hr style={{
        border: "none",
        borderTop: "2px solid #eaeaea",
        margin: "2em 0"
      }} />
      <style>
        {`
          body, .container, .card-modern, .contact-form, .contact-list, .contact-item, .profile-container, .profile-section, .login-container, input, textarea, select {
            transition: background 0.3s, color 0.3s, border 0.2s;
          }
        `}
      </style>
      {/* Botón de modo oscuro fijo en la esquina superior derecha */}
      <button
        onClick={() => setDarkMode(dm => !dm)}
        className="dark-toggle-fixed"
        title="Cambiar modo oscuro"
      >
        {darkMode
          ? <svg width="28" height="28" fill="#FFD700" viewBox="0 0 24 24"><path d="M12 18a6 6 0 0 1 0-12v12z"/></svg>
          : <svg width="28" height="28" fill="#7b2ff2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>
        }
      </button>
    </BrowserRouter>
  );
}

export default App;