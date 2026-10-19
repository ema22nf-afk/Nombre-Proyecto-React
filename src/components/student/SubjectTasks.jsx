import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const SubjectTasks = ({ subjectId }) => {
  const { studentSubjects, tasks, navigate, updateTaskStatus } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];
  const subjectTasks = tasks[subjectId] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <Header
        title={`Tareas ${subject?.nombre || ""}`}
        showBack={true}
        onBack={() => navigate("subject-options", { subjectId: subject?.id })}
        showHome={true}
      />

      <div className="scroll-area" style={{ paddingBottom: "70px" }}>
        <div className="tareas-header">
          <h2>Tus tareas</h2>
          <span style={{ fontSize: "13px", color: "#687789" }}>
            {subjectTasks.length} registradas
          </span>
        </div>

        <div className="tareas-lista">
          {subjectTasks.map((t) => (
            <div key={t.id} className="tarea-item">
              <span className="nombre-tarea">
                {t.title} {t.dueDate ? `· ${t.dueDate}` : ""}
              </span>

              {t.status === "completada" && (
                <button
                  type="button"
                  className="estado-btn completada"
                  title="Tarea completada"
                  onClick={() =>
                    updateTaskStatus(subjectId, t.id, "pendiente")
                  }
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              )}

              {t.status === "cancelada" && (
                <button
                  type="button"
                  className="estado-btn cancelada"
                  title="Tarea no entregada"
                  onClick={() =>
                    updateTaskStatus(subjectId, t.id, "pendiente")
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}

              {t.status === "pendiente" && (
                <button
                  type="button"
                  className="estado-btn pendiente"
                  title="Ver detalle de tarea para entregar"
                  onClick={() =>
                    navigate("task-detail", {
                      subjectId: subject?.id,
                      taskId: t.id
                    })
                  }
                >
                  <i className="fa-regular fa-square"></i>
                </button>
              )}
            </div>
          ))}

          {subjectTasks.length === 0 && (
            <div style={{ textAlign: "center", color: "#8898aa", padding: "30px" }}>
              <p>No hay tareas pendientes en esta materia.</p>
            </div>
          )}
        </div>
      </div>

      {/* Botón flotante para agregar nueva tarea (17_seccion) */}
      <button
        type="button"
        className="btn-flotante-agregar"
        onClick={() => navigate("add-task", { subjectId: subject?.id })}
        title="Agregar nueva tarea"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};
