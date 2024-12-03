import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    if (users.some((user) => user.email === email)) {
      alert("Este correo ya está registrado");
      return;
    }

    // Registrar el nuevo usuario
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso, ahora puedes iniciar sesión");
    navigate("/"); // Redirigir al login
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem", textAlign: "center" }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
