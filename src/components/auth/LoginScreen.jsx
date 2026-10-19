import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const LoginScreen = () => {
  const { login, navigate } = useEduConnect();
  const [selectedRole, setSelectedRole] = useState("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password || !pin) {
      setError("Completa todos los campos.");
      return;
    }

    if (pin.length !== 4) {
      setError("El PIN debe tener 4 números.");
      return;
    }

    // Comprobar con usuario guardado si existe
    try {
      const savedUserStr = localStorage.getItem("educonnectUsuario");
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (
          savedUser.correo === email.trim() &&
          savedUser.password === password &&
          savedUser.pin === pin &&
          savedUser.rol !== selectedRole
        ) {
          setError(
            `Este usuario está registrado con el rol de ${savedUser.rol}. Selecciona el rol correspondiente.`
          );
          return;
        }
      }
    } catch {
      // Ignorar error de parsing
    }

    login(email.trim(), password, pin, selectedRole);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Inicia sesión en EduConnect"
        showHome={false}
        onBack={() => navigate("welcome")}
      />

      <div className="scroll-area form-container">
        <h2 style={{ fontSize: "16px", color: "#444", marginBottom: "8px" }}>
          Estudiante o maestro
        </h2>

        {/* Roles toggle */}
        <div className="roles">
          <button
            type="button"
            className={`role ${selectedRole === "estudiante" ? "active" : ""}`}
            onClick={() => setSelectedRole("estudiante")}
          >
            Estudiante
          </button>
          <button
            type="button"
            className={`role ${selectedRole === "maestro" ? "active" : ""}`}
            onClick={() => setSelectedRole("maestro")}
          >
            Maestro
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                background: "#fde8e8",
                color: "#c81e1e",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "13px"
              }}
            >
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              type="email"
              id="login-email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Contraseña</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
                title="Mostrar contraseña"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-pin">Ingrese su PIN</label>
            <input
              type="password"
              id="login-pin"
              placeholder="****"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>

          <button
            type="button"
            className="forgot-button"
            onClick={() => navigate("forgot-password")}
            style={{ border: "none", background: "none", width: "100%" }}
          >
            ¿Olvidaste la contraseña?
          </button>
        </form>
      </div>
    </div>
  );
};
