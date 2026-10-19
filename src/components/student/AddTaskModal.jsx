import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const AddTaskModal = ({ subjectId }) => {
  const { studentSubjects, addTask, navigate } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Por favor ingresa un título para la tarea.");
      return;
    }

    addTask(subject?.id, {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || "Sin fecha"
    });

    alert("✓ Tarea creada exitosamente.");
    navigate("subject-tasks", { subjectId: subject?.id });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Tarea Nueva"
        showBack={true}
        onBack={() => navigate("subject-tasks", { subjectId: subject?.id })}
        showHome={true}
      />

      <div className="scroll-area form-container">
        <h2 style={{ fontSize: "16px", color: "#333", marginBottom: "15px" }}>
          Nueva tarea para {subject?.nombre}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">Título de la actividad</label>
            <input
              type="text"
              id="task-title"
              placeholder="Ej. Taller de investigación"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-date">Fecha de entrega</label>
            <input
              type="date"
              id="task-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-desc">Instrucciones y descripción</label>
            <textarea
              id="task-desc"
              placeholder="Escribe las instrucciones detalladas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "15px" }}
          >
            Guardar tarea
          </button>
        </form>
      </div>
    </div>
  );
};
