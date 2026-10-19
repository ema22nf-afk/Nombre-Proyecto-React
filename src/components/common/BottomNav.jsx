import React from "react";
import { useEduConnect } from "../../context";

export const BottomNav = ({ active = "home" }) => {
  const { navigate, notifications } = useEduConnect();
  const unreadCount = notifications.filter((n) => !n.leida).length;

  return (
    <footer className="footer-nav">
      <button
        type="button"
        className={`footer-icon ${active === "home" ? "activo" : ""}`}
        onClick={() => navigate("student-dashboard")}
        title="Inicio"
      >
        <i className="fa-solid fa-house"></i>
      </button>

      <button
        type="button"
        className={`footer-icon ${active === "notifications" ? "activo" : ""}`}
        onClick={() => navigate("student-notifications")}
        title="Notificaciones"
      >
        <i className="fa-solid fa-bell"></i>
        {unreadCount > 0 && <span className="badge-dot" />}
      </button>

      <button
        type="button"
        className={`footer-icon ${active === "profile" ? "activo" : ""}`}
        onClick={() => navigate("student-profile")}
        title="Perfil"
      >
        <i className="fa-solid fa-user"></i>
      </button>
    </footer>
  );
};
