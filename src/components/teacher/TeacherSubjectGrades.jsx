import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherSubjectGrades = ({ subjectId }) => {
  const { teacherSubjects, navigate } = useEduConnect();
  const subject =
    teacherSubjects.find((s) => s.id === subjectId) || teacherSubjects[0];
  const grades = subject?.grados || ["9°", "10°", "11°"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title={subject?.nombre || "Materia"}
        showBack={true}
        onBack={() => navigate("teacher-dashboard")}
        showHome={true}
      />

      <div className="scroll-area">
        <h2 style={{ fontSize: "18px", color: "#202d3d", margin: "15px 0 10px" }}>
          Selecciona un grado
        </h2>

        <div className="lista-grados">
          {grades.map((grado) => (
            <div
              key={grado}
              className="grado-card"
              onClick={() =>
                navigate("teacher-student-list", {
                  subjectId: subject?.id,
                  subjectName: subject?.nombre,
                  grade: grado
                })
              }
            >
              <span className="icono">🎓</span>
              <span>Grado {grado}</span>
              <span className="flecha-derecha">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
