import React, { useState, useEffect } from "react";

export const PhoneFrame = ({ children, isCream = false }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`telefono ${isCream ? "bg-cream" : ""}`}>
      {/* Barra de estado del móvil */}
      <div className="phone-status-bar">
        <span>{currentTime || "12:00"}</span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <i className="fa-solid fa-signal" style={{ fontSize: "10px" }}></i>
          <i className="fa-solid fa-wifi" style={{ fontSize: "10px" }}></i>
          <i className="fa-solid fa-battery-full" style={{ fontSize: "12px" }}></i>
        </div>
      </div>

      {/* Contenido de la pantalla */}
      <div className="phone-screen-content">{children}</div>
    </div>
  );
};
