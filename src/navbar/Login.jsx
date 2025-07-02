import { useState } from "react";
import { Settings, Moon, Sun } from "lucide-react";

export default function Login({ onLogin, darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfig, setShowConfig] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-bg-animated">
      {/* Botones arriba a la derecha */}
      <div style={{
        position: "absolute",
        top: 24,
        right: 36,
        display: "flex",
        gap: 16,
        zIndex: 10
      }}>
        <button
          onClick={() => setDarkMode(dm => !dm)}
          className="dark-toggle-fixed"
          title="Cambiar modo oscuro"
          style={{ position: "static", width: 48, height: 48 }}
        >
          {darkMode
            ? <Sun size={28} color="#FFD700" />
            : <Moon size={28} color="#7b2ff2" />
          }
        </button>
        <button
          className="dark-toggle-fixed"
          style={{ position: "static", width: 48, height: 48 }}
          title="Configuración"
          onClick={() => setShowConfig(true)}
        >
          <Settings size={28} color="#fff" />
        </button>
      </div>
      {/* Modal de configuración */}
      {showConfig && (
        <div className="modal-bg" onClick={() => setShowConfig(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Configuración</h2>
            <div style={{ textAlign: "left", margin: "1.5em 0" }}>
              <label style={{ display: "block", marginBottom: "1em" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: 8 }}
                  // Aquí puedes conectar con un estado real de notificaciones
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
            </div>
            <button className="button" onClick={() => setShowConfig(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {/* Fondo animado */}
      <div className="bubbles-bg"></div>
      <div className="login-container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <h1 style={{
          color: "#4f8cff",
          fontWeight: 800,
          fontSize: "2.5em",
          marginBottom: "0.2em",
          letterSpacing: "2px",
          textShadow: "0 2px 12px #7b2ff244"
        }}>
          NexusBook
        </h1>
        <h2 style={{ marginBottom: "1.5em", color: "#7b2ff2" }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit" style={{ width: "100%" }}>Entrar</button>
        </form>
      </div>
    </div>
  );
}