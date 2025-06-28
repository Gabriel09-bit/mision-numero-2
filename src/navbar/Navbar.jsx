import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, User, Settings, Home } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout, currentUser, darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ marginBottom: 0, paddingBottom: 0 }}>
      <div className="navbar-content" style={{ padding: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ letterSpacing: "1px" }}>
            NexusBook
          </h1>
          <div className="navbar-links">
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
              <Home className="w-4 h-4" /> Inicio
            </Link>
            <Link to="/info" className={location.pathname === "/info" ? "active-link" : ""}>
              <Settings className="w-4 h-4" /> Información
            </Link>
            {isAuthenticated && (
              <Link to="/profile" className={location.pathname.startsWith("/profile") ? "active-link" : ""}>
                <User className="w-4 h-4" /> Perfil
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={() => setDarkMode(dm => !dm)}
            className="ml-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ fontSize: 20, marginLeft: 16, cursor: 'pointer' }}
            title="Cambiar modo oscuro"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {isAuthenticated && (
            <button
              className="button logout-btn"
              onClick={onLogout}
              style={{ marginLeft: 12 }}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}