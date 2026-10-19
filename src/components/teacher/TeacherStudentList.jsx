import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherStudentList = ({ subjectId, subjectName, grade }) => {
  const { studentsByGrade, navigate } = useEduConnect();
  const key = `${subjectId}-${grade}`;
  const fallbackKey = `tecnologia-${grade}`;
  const students = studentsByGrade[key] || studentsByGrade[fallbackKey] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title={subjectName || "Tecnología"}
        showBack={true}
        onBack={() => navigate("teacher-subject-grades", { subjectId })}
        showHome={true}
      />

      <div className="scroll-area">
        <h2 style={{ fontSize: "18px", color: "#202d3d", marginTop: "10px" }}>
          Estudiantes de {grade}
        </h2>
        <p style={{ fontSize: "13px", color: "#687789", margin: "6px 0 15px" }}>
          Selecciona un estudiante para ver sus opciones.
        </p>

        <div className="lista-estudiantes">
          {students.map((std) => (
            <div
              key={std.id}
              className="estudiante-card"
              onClick={() =>
                navigate("teacher-student-detail", {
                  studentId: std.id,
                  studentName: std.nombre,
                  subjectId,
                  subjectName,
                  grade,
                  gradeKey: studentsByGrade[key] ? key : fallbackKey
                })
              }
            >
              <div className="foto">{std.avatar || "👨‍🎓"}</div>
              <div className="informacion">
                <h3>{std.nombre}</h3>
                <p>Grado {std.grado || grade}</p>
              </div>
              <span className="flecha-derecha">›</span>
            </div>
          ))}

          {students.length === 0 && (
            <div style={{ textAlign: "center", color: "#8898aa", padding: "30px" }}>
              <p>No hay estudiantes matriculados en este grado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
