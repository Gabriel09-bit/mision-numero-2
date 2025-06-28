import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión en <span style={{ color: "#4f8cff" }}>NexusBook</span></h2>
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
  );
}