import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

const teacherNotifsInitial = [
  {
    id: "tn1",
    titulo: "Nueva entrega recibida",
    mensaje: "Juan Pérez entregó la Actividad 2 de Tecnología.",
    leida: false
  },
  {
    id: "tn2",
    titulo: "Reunión de área",
    mensaje: "Comité de docentes programado para este viernes a las 3:00 PM.",
    leida: false
  },
  {
    id: "tn3",
    titulo: "Cierre de periodo",
    mensaje: "Recuerda subir las calificaciones del primer periodo antes del 30.",
    leida: true
  }
];

export const TeacherNotifications = () => {
  const { navigate } = useEduConnect();
  const [notifs, setNotifs] = useState(teacherNotifsInitial);

  const handleRead = (id) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, leida: true } : n)));
  };

  const handleDelete = (id) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Notificaciones"
        showBack={true}
        onBack={() => navigate("teacher-dashboard")}
        showHome={true}
      />

      <div className="scroll-area">
        <div className="notificaciones-lista">
          {notifs.map((n) => (
            <article
              key={n.id}
              className={`notificacion-item ${n.leida ? "leida" : ""}`}
            >
              <h3>{n.titulo}</h3>
              <p>{n.mensaje}</p>

              <div className="notificacion-botones">
                {!n.leida && (
                  <button
                    type="button"
                    className="btn-notif marcar"
                    onClick={() => handleRead(n.id)}
                  >
                    Marcar como leída
                  </button>
                )}
                <button
                  type="button"
                  className="btn-notif eliminar"
                  onClick={() => handleDelete(n.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}

          {notifs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 10px",
                color: "#8898aa"
              }}
            >
              <p>No tienes notificaciones pendientes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
