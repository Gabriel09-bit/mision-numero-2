import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { User, Settings, Home, LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout, currentUser }) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-float" style={{ marginBottom: 0, paddingBottom: 0 }}>
      <div className="navbar-content">
        {/* Izquierda: Links */}
        <div className="navbar-links" style={{ flex: 1, justifyContent: "flex-start" }}>
          <NavLinkAnimated to="/" active={location.pathname === "/"}>
            <Home className="w-4 h-4" /> Inicio
          </NavLinkAnimated>
          <NavLinkAnimated to="/info" active={location.pathname === "/info"}>
            <Settings className="w-4 h-4" /> Información
          </NavLinkAnimated>
          {isAuthenticated && (
            <NavLinkAnimated to="/profile" active={location.pathname.startsWith("/profile")}>
              <User className="w-4 h-4" /> Perfil
            </NavLinkAnimated>
          )}
        </div>
        {/* Centro: Título estático */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none"
        }}>
          <h1 className="navbar-title" style={{ pointerEvents: "auto" }}>
            NexusBook
          </h1>
        </div>
        {/* Derecha: Avatar y logout */}
        <div className="navbar-links" style={{ flex: 1, justifyContent: "flex-end", gap: "1.5em", display: "flex", alignItems: "center" }}>
          {isAuthenticated && currentUser?.avatar && (
            <img
              src={currentUser.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.name)}
              alt="avatar"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "2px solid #fff",
                objectFit: "cover",
                marginRight: 8,
                boxShadow: "0 2px 8px #0003"
              }}
            />
          )}
          {isAuthenticated && (
            <NavLinkAnimated as="button" onClick={onLogout} logout>
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </NavLinkAnimated>
          )}
        </div>
      </div>
    </nav>
  );
}

// Componente para animación de links y botón logout
function NavLinkAnimated({ to, active, children, as = "link", onClick, logout }) {
  const Tag = as === "button" ? "button" : Link;
  return (
    <Tag
      to={to}
      onClick={onClick}
      className={`nav-anim-link${active ? " active-link" : ""}${logout ? " logout-link" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 700,
        fontSize: "1.1em",
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0.5em 1.3em",
        borderRadius: "10px",
        transition: "background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s"
      }}
    >
      {children}
    </Tag>
  );
}