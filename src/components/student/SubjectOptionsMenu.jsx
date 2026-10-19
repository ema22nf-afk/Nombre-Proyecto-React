import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const SubjectOptionsMenu = ({ subjectId }) => {
  const { studentSubjects, navigate } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];

  if (!subject) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Opciones"
        showBack={true}
        onBack={() => navigate("subject-cover", { subjectId: subject.id })}
        showHome={true}
      />

      <div className="scroll-area">
        <div style={{ textAlign: "center", margin: "15px 0 20px" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#3b78b8",
              background: "#e8f4fc",
              padding: "6px 14px",
              borderRadius: "20px"
            }}
          >
            Materia: {subject.nombre}
          </span>
        </div>

        <div className="opciones-list">
          {/* Opción 1: Calificaciones */}
          <div
            className="opcion-card"
            onClick={() => navigate("subject-grades", { subjectId: subject.id })}
          >
            <div className="icono-opcion">
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
            <div className="texto-opcion">
              <h2>Revisa tus calificaciones</h2>
            </div>
          </div>

          {/* Opción 2: Tareas pendientes */}
          <div
            className="opcion-card"
            onClick={() => navigate("subject-tasks", { subjectId: subject.id })}
          >
            <div className="icono-opcion">
              <i className="fa-solid fa-calendar-days"></i>
            </div>
            <div className="texto-opcion">
              <h2>Lista de tareas pendientes</h2>
            </div>
          </div>

          {/* Opción 3: Chat con el profesor */}
          <div
            className="opcion-card"
            onClick={() => navigate("subject-chat", { subjectId: subject.id })}
          >
            <div className="icono-opcion">
              <i className="fa-solid fa-comments"></i>
            </div>
            <div className="texto-opcion">
              <h2>Chat con el profesor</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
