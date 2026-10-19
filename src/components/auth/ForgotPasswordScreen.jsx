import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const ForgotPasswordScreen = () => {
  const { navigate } = useEduConnect();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!email.trim() || !pass1 || !pass2 || !pin) {
      setMsg({ type: "error", text: "Completa todos los campos." });
      return;
    }

    if (pass1 !== pass2) {
      setMsg({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    if (pin.length !== 4) {
      setMsg({ type: "error", text: "El PIN debe tener 4 dígitos." });
      return;
    }

    // Actualizar usuario en localStorage si existe
    try {
      const savedUserStr = localStorage.getItem("educonnectUsuario");
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser.correo === email.trim()) {
          savedUser.password = pass1;
          savedUser.pin = pin;
          localStorage.setItem("educonnectUsuario", JSON.stringify(savedUser));
        }
      }
    } catch {
      // Ignorar
    }

    setMsg({
      type: "success",
      text: "¡Contraseña actualizada exitosamente! Redirigiendo..."
    });

    setTimeout(() => {
      navigate("login");
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Olvidaste tu contraseña"
        showHome={false}
        onBack={() => navigate("login")}
      />

      <div className="scroll-area form-container">
        <form onSubmit={handleSubmit}>
          {msg.text && (
            <div
              style={{
                background: msg.type === "error" ? "#fde8e8" : "#def7ec",
                color: msg.type === "error" ? "#c81e1e" : "#03543f",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "13px"
              }}
            >
              {msg.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="rec-email">Correo electrónico</label>
            <input
              type="email"
              id="rec-email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rec-pass1">Nueva contraseña</label>
            <input
              type="password"
              id="rec-pass1"
              placeholder="********"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rec-pass2">Confirme la contraseña</label>
            <input
              type="password"
              id="rec-pass2"
              placeholder="********"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rec-pin">Confirme su PIN</label>
            <input
              type="password"
              id="rec-pin"
              placeholder="****"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "15px" }}>
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};
