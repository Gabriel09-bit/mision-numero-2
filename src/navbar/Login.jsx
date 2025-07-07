import { useState } from "react";
import PropTypes from 'prop-types';
import { Moon, Sun } from "lucide-react";

export default function Login({ onLogin, darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-animated" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Botón modo oscuro arriba a la derecha */}
      <div style={{
        position: "absolute",
        top: 24,
        right: 36,
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
      </div>
      <div className="login-container" style={{
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        background: "var(--card-light)",
        borderRadius: "18px",
        boxShadow: "0 4px 24px #7b2ff244",
        padding: "2.5em 2em 2em 2em",
        minWidth: 340,
        maxWidth: 95,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: 'fadeInUp 0.5s'
      }}>
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
        <form onSubmit={handleSubmit} className="login-form" aria-label="Formulario de inicio de sesión" style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2em",
          width: "100%",
          maxWidth: 320,
          margin: "0 auto"
        }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-label="Correo electrónico"
            style={{ padding: "1.1em", borderRadius: 10, border: "1.5px solid #7b2ff2", fontSize: "1.15em", boxShadow: '0 2px 8px #7b2ff222' }}
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-label="Contraseña"
            style={{ padding: "1.1em", borderRadius: 10, border: "1.5px solid #7b2ff2", fontSize: "1.15em", boxShadow: '0 2px 8px #7b2ff222' }}
          />
          {error && <div style={{ color: '#e53e3e', fontWeight: 600, marginBottom: -10 }}>{error}</div>}
          <button type="submit" className="button button-gradient" disabled={!email || !password || loading} aria-label="Iniciar sesión" style={{ fontSize: "1.15em", padding: "0.9em 0", marginTop: 8 }}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
};