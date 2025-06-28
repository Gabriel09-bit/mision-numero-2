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
  const [contacts, setContacts] = useState([
    { id: 1, name: "Juan Perez", email: "juan@mail.com", phone: "123456789", userId: 1 }
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Notificaciones
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  // Login multiusuario
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      showNotification("Bienvenido " + user.name);
    } else {
      showNotification("Credenciales incorrectas");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    showNotification("Sesión cerrada");
  };

  // Agregar contacto (solo para usuario actual)
  const addContact = (contact) => {
    if (!currentUser) {
      showNotification("Debes iniciar sesión para agregar contactos.");
      return;
    }
    setContacts([
      ...contacts,
      { ...contact, id: Date.now(), userId: currentUser.id, favorite: false, createdAt: new Date().toISOString() }
    ]);
    showNotification("Contacto agregado");
  };

  // Editar contacto
  const editContact = (id, updatedContact) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, ...updatedContact } : c));
    showNotification("Contacto editado");
  };

  // Borrar contacto
  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    showNotification("Contacto eliminado");
  };

  // Filtrado de contactos (solo los del usuario actual)
  const filteredContacts = contacts
    .filter(c => c.userId === (currentUser?.id ?? -1))
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    );

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

  const exportContacts = () => {
    const headers = ['Nombre', 'Email', 'Teléfono'];
    const rows = filteredContacts.map(c => [c.name, c.email, c.phone]);
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

  const toggleFavorite = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split('\n');
      const newContacts = lines.slice(1).map(line => {
        const [name, email, phone] = line.split(',');
        return { id: Date.now() + Math.random(), name, email, phone, userId: currentUser.id, createdAt: new Date().toISOString(), favorite: false };
      }).filter(c => c.name && c.email && c.phone);
      setContacts([...contacts, ...newContacts]);
      showNotification("Contactos importados");
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const handler = () => exportContacts();
    window.addEventListener('exportContacts', handler);
    return () => window.removeEventListener('exportContacts', handler);
  }, [exportContacts]);

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {notification && (
        <div className="notification">{notification}</div>
      )}
      <div className="container">
        <Routes>
          <Route path="/login" element={
            isAuthenticated
              ? <Navigate to="/" />
              : <Login onLogin={handleLogin} />
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
                  <h1 style={{ marginBottom: 0 }}>Bienvenido, <b>{currentUser?.name}</b></h1>
                  <button
                    className="button"
                    style={{ margin: "1em auto", display: "block", fontSize: "1.1em" }}
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
                      {contacts.filter(c => c.email).length}
                    </span><br />
                    <span style={{ color: "#888" }}>Con email</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                      {contacts.filter(c => c.phone).length}
                    </span><br />
                    <span style={{ color: "#888" }}>Con teléfono</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1em", marginBottom: "1em", flexWrap: "wrap" }}>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar por nombre, email o teléfono..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: 220, padding: "0.7em", borderRadius: "8px", border: "1.5px solid #7b2ff2" }}
                  />
                  <button className="button" onClick={exportContacts}>
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
      <style>
        {`
          body, .container, .card-modern, .contact-form, .contact-list, .contact-item, .profile-container, .profile-section, .login-container, input, textarea, select {
            transition: background 0.3s, color 0.3s, border 0.2s;
          }
        `}
      </style>
    </BrowserRouter>
  );
}

export default App;