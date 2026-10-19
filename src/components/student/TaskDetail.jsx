import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TaskDetail = ({ subjectId, taskId }) => {
  const { tasks, updateTaskStatus, navigate } = useEduConnect();
  const subjectTasks = tasks[subjectId] || [];
  const task = subjectTasks.find((t) => t.id === taskId) || subjectTasks[0];

  if (!task) return null;

  const handleEntregar = () => {
    updateTaskStatus(subjectId, task.id, "completada", 5.0);
    alert("✓ Tarea entregada con éxito.");
    navigate("subject-tasks", { subjectId });
  };

  const handleNoEntregar = () => {
    updateTaskStatus(subjectId, task.id, "cancelada", 1.0);
    alert("✕ Marcaste la tarea como no entregada.");
    navigate("subject-tasks", { subjectId });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Tareas"
        showBack={true}
        onBack={() => navigate("subject-tasks", { subjectId })}
        showHome={true}
      />

      <div className="scroll-area tarea-detail-box">
        <h2>{task.title}</h2>

        <div className="tarea-fecha">
          <strong>Fecha límite:</strong>
          <span>{task.dueDate || "Sin fecha asignada"}</span>
        </div>

        {task.image && (
          <img src={task.image} alt={task.title} className="tarea-img" />
        )}

        <div className="tarea-desc-box">
          <h3>Descripción</h3>
          <p>
            {task.description ||
              "Realiza el trabajo siguiendo las pautas dadas por el docente y súbelo a tiempo."}
          </p>
        </div>

        {/* Botones de acción (14_seccion: Entregar ✓ o No Entregar ✕) */}
        <div className="tarea-actions">
          <button
            type="button"
            className="btn-accion-tarea aceptar"
            onClick={handleEntregar}
            title="Entregar tarea"
          >
            ✓
          </button>

          <button
            type="button"
            className="btn-accion-tarea cancelar"
            onClick={handleNoEntregar}
            title="No entregar tarea"
          >
            ✕
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#687789",
            marginTop: "10px"
          }}
        >
          Selecciona una opción para continuar
        </p>
      </div>
    </div>
  );
};
