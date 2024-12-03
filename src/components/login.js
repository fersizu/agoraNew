import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si no hay usuarios registrados y agregar un usuario de prueba
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      const testUser = { email: "usuario@hotmail.com", password: "123" };
      users.push(testUser);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Usuario de prueba añadido:", testUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Usuarios almacenados:", users);  // Verificación de los usuarios en localStorage

    // Validar credenciales
    const user = users.find((user) => user.email === email.trim() && user.password === password.trim());
    console.log("Usuario encontrado:", user); // Verifica si se encuentra el usuario correcto

    if (user) {
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirigir al dashboard
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
          Ingresar
        </button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
