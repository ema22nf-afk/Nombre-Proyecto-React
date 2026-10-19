import React from "react";
import { useEduConnect } from "../../context";
import { Logo } from "../common/Logo";

export const WelcomeScreen = () => {
  const { navigate } = useEduConnect();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Bienvenido a EduConnect</h1>

      {/* Logotipo característico */}
      <Logo />

      {/* Botones de acción principal */}
      <div className="buttons-group">
        <button
          type="button"
          className="btn-welcome"
          onClick={() => navigate("login")}
        >
          Iniciar sesión
        </button>

        <button
          type="button"
          className="btn-welcome"
          onClick={() => navigate("register")}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};
