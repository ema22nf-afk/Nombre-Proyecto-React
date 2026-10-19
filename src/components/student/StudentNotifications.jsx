import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";
import { BottomNav } from "../common/BottomNav";

export const StudentNotifications = () => {
  const { notifications, markNotificationRead, deleteNotification, navigate } =
    useEduConnect();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Notificaciones"
        showBack={true}
        onBack={() => navigate("student-dashboard")}
        showHome={true}
      />

      <div className="scroll-area">
        <div className="notificaciones-lista">
          {notifications.map((notif) => (
            <article
              key={notif.id}
              className={`notificacion-item ${notif.leida ? "leida" : ""}`}
            >
              <h3>{notif.titulo}</h3>
              <p>{notif.mensaje}</p>

              <div className="notificacion-botones">
                {!notif.leida && (
                  <button
                    type="button"
                    className="btn-notif marcar"
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    Marcar como leída
                  </button>
                )}
                <button
                  type="button"
                  className="btn-notif eliminar"
                  onClick={() => deleteNotification(notif.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}

          {notifications.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 10px",
                color: "#8898aa"
              }}
            >
              <i
                className="fa-regular fa-bell-slash"
                style={{ fontSize: "40px", marginBottom: "10px" }}
              ></i>
              <p>No tienes notificaciones pendientes.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="notifications" />
    </div>
  );
};
