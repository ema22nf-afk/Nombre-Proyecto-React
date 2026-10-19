import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const RegisterScreen = () => {
  const { register, navigate } = useEduConnect();
  const [selectedRole, setSelectedRole] = useState("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password || !celular.trim() || !pin) {
      setError("Completa todos los campos requeridos.");
      return;
    }

    if (!/^\d{10}$/.test(celular.trim())) {
      setError("El número de celular debe tener exactamente 10 dígitos numéricos.");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("El PIN debe tener exactamente 4 números.");
      return;
    }

    register({
      rol: selectedRole,
      correo: email.trim(),
      password: password,
      celular: celular.trim(),
      pin: pin
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Registrarse en EduConnect"
        showHome={false}
        onBack={() => navigate("welcome")}
      />

      <div className="scroll-area form-container">
        <label style={{ fontSize: "14px", fontWeight: "bold", color: "#444" }}>
          Estudiante o maestro
        </label>

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
            <label htmlFor="reg-email">Correo electrónico</label>
            <input
              type="email"
              id="reg-email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Crea una contraseña</label>
            <input
              type="password"
              id="reg-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-celular">Número de celular</label>
            <input
              type="tel"
              id="reg-celular"
              placeholder="3001234567"
              maxLength={10}
              value={celular}
              onChange={(e) => setCelular(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-pin">Ingrese su PIN</label>
            <input
              type="password"
              id="reg-pin"
              placeholder="****"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "15px" }}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
