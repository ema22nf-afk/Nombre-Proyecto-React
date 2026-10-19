import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const SubjectGrades = ({ subjectId }) => {
  const { studentSubjects, tasks, navigate } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];
  const subjectTasks = tasks[subjectId] || [];

  const gradedTasks = subjectTasks.filter((t) => typeof t.nota === "number");
  const promedio =
    gradedTasks.length > 0
      ? (
          gradedTasks.reduce((acc, t) => acc + t.nota, 0) / gradedTasks.length
        ).toFixed(1)
      : "4.2";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Calificaciones"
        showBack={true}
        onBack={() => navigate("subject-options", { subjectId: subject?.id })}
        showHome={true}
      />

      <div className="scroll-area">
        <h2
          style={{
            fontSize: "22px",
            color: "#202d3d",
            marginTop: "10px",
            textAlign: "center"
          }}
        >
          {subject?.nombre}
        </h2>

        {/* Promedio */}
        <div className="promedio-badge">
          <p>Promedio General</p>
          <span>{promedio}</span>
        </div>

        {/* Lista de notas */}
        <div className="calificaciones-lista">
          {gradedTasks.map((task) => (
            <div key={task.id} className="calificacion-card">
              <div className="informacion">
                <h3>{task.title}</h3>
                <p>Calificación obtenida</p>
              </div>
              <div className="nota">{task.nota.toFixed(1)}</div>
            </div>
          ))}

          {gradedTasks.length === 0 && (
            <div style={{ textAlign: "center", color: "#8898aa", padding: "20px" }}>
              <p>Aún no hay actividades calificadas en esta materia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
