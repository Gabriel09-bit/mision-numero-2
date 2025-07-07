import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";
import { User, Settings, Home, LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout, currentUser, onSettings }) {
  const location = useLocation();

  return (
    <header style={{ width: "100vw", background: "none", marginBottom: "2.5em" }}>
      {/* Título NexusBook centrado */}
      <div style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.5em",
        marginBottom: "0.5em"
      }}>
        <h1 className="navbar-title" style={{
          fontSize: "2.7em",
          textAlign: "center",
          fontWeight: 900,
          letterSpacing: "2px",
          background: "linear-gradient(90deg, #7b2ff2 0%, #4f8cff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 12px #7b2ff244"
        }}>
          NexusBook
        </h1>
      </div>
      {/* Barra de navegación */}
      <nav className="navbar" role="navigation" aria-label="Barra de navegación principal" style={{
        background: "linear-gradient(90deg, #7b2ff2 0%, #4f8cff 100%)",
        borderRadius: "18px",
        margin: "0 auto",
        maxWidth: 800,
        boxShadow: "0 4px 24px #7b2ff244",
        padding: "0.7em 2em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}>
        <div className="navbar-content" style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Links principales */}
          <div className="navbar-links" style={{ display: "flex", gap: "1.5em" }}>
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
          {/* Lado derecho: avatar, logout y ajustes */}
          <div className="navbar-links" style={{ display: "flex", gap: "1.2em", alignItems: "center" }}>
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
                  boxShadow: "0 2px 8px #0003"
                }}
              />
            )}
            {isAuthenticated && (
              <NavLinkAnimated as="button" onClick={onLogout} logout>
                <LogOut className="w-4 h-4" /> Cerrar sesión
              </NavLinkAnimated>
            )}
            {/* Botón de ajustes */}
            <button
              className="nav-settings-btn"
              title="Ajustes"
              onClick={onSettings}
              style={{
                background: "rgba(255,255,255,0.13)",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0.5em",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s"
              }}
            >
              <Settings size={22} color="#fff" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  onSettings: PropTypes.func
};

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