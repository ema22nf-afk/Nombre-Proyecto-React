import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherStudentDetail = ({
  studentId,
  studentName,
  subjectId,
  subjectName,
  grade,
  gradeKey
}) => {
  const { navigate } = useEduConnect();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Estudiante"
        showBack={true}
        onBack={() =>
          navigate("teacher-student-list", {
            subjectId,
            subjectName,
            grade
          })
        }
        showHome={true}
      />

      <div className="scroll-area">
        {/* Perfil del estudiante (52_seccion) */}
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #dcebfa",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px"
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "8px" }}>👨‍🎓</div>
          <h2 style={{ fontSize: "20px", color: "#202d3d", marginBottom: "8px" }}>
            {studentName || "Juan Pérez"}
          </h2>
          <p style={{ fontSize: "14px", color: "#555", margin: "4px 0" }}>
            <strong>Grado:</strong> {grade}
          </p>
          <p style={{ fontSize: "14px", color: "#555", margin: "4px 0" }}>
            <strong>Materia:</strong> {subjectName || "Tecnología"}
          </p>
        </div>

        <h3 style={{ fontSize: "16px", color: "#202d3d", marginBottom: "12px" }}>
          Opciones
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Opción Chat */}
          <div
            className="opcion-card"
            onClick={() =>
              navigate("teacher-student-chat", {
                studentId,
                studentName,
                subjectId,
                subjectName,
                grade,
                gradeKey
              })
            }
          >
            <div style={{ fontSize: "26px" }}>💬</div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "15px", display: "block" }}>Chat</strong>
              <p style={{ fontSize: "12px", color: "#687789" }}>
                Hablar con {studentName}
              </p>
            </div>
            <span className="flecha-derecha">›</span>
          </div>

          {/* Opción Calificaciones */}
          <div
            className="opcion-card"
            onClick={() =>
              navigate("teacher-student-grades", {
                studentId,
                studentName,
                subjectId,
                subjectName,
                grade,
                gradeKey
              })
            }
          >
            <div style={{ fontSize: "26px" }}>📝</div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "15px", display: "block" }}>
                Calificaciones
              </strong>
              <p style={{ fontSize: "12px", color: "#687789" }}>
                Consultar sus calificaciones
              </p>
            </div>
            <span className="flecha-derecha">›</span>
          </div>
        </div>
      </div>
    </div>
  );
};
