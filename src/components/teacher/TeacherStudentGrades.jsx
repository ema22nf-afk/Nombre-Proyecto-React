import React from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherStudentGrades = ({
  studentId,
  studentName,
  subjectId,
  subjectName,
  grade,
  gradeKey
}) => {
  const { studentsByGrade, navigate } = useEduConnect();
  const list = studentsByGrade[gradeKey] || [];
  const student = list.find((s) => s.id === studentId) || {
    id: studentId,
    nombre: studentName,
    grado: grade,
    actividades: [
      { id: "act-1", titulo: "Actividad 1", subtitulo: "Introducción general", status: "calificada", nota: 4.5 },
      { id: "act-2", titulo: "Actividad 2", subtitulo: "Investigación práctica", status: "pendiente", nota: null, archivo: "Entrega_practica.pdf" }
    ]
  };

  const actividades = student.actividades || [];
  const calificadas = actividades.filter((a) => typeof a.nota === "number");
  const promedio =
    calificadas.length > 0
      ? (
          calificadas.reduce((acc, a) => acc + a.nota, 0) / calificadas.length
        ).toFixed(1)
      : "0.0";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Calificaciones"
        showBack={true}
        onBack={() =>
          navigate("teacher-student-detail", {
            studentId,
            studentName,
            subjectId,
            subjectName,
            grade,
            gradeKey
          })
        }
        showHome={true}
      />

      <div className="scroll-area">
        {/* Banner de estudiante (65_seccion) */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "#ffffff",
            padding: "16px",
            borderRadius: "14px",
            border: "1.5px solid #dcebfa",
            margin: "10px 0 16px"
          }}
        >
          <div style={{ fontSize: "36px" }}>{student.avatar || "👨‍🎓"}</div>
          <div>
            <h2 style={{ fontSize: "17px", color: "#202d3d" }}>
              {student.nombre}
            </h2>
            <p style={{ fontSize: "12px", color: "#687789" }}>
              Grado {student.grado || grade} · {subjectName || "Tecnología"}
            </p>
          </div>
        </section>

        <h3 style={{ fontSize: "16px", color: "#202d3d", marginBottom: "12px" }}>
          Tareas entregadas
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {actividades.map((act) => (
            <div
              key={act.id}
              style={{
                background: "#ffffff",
                border: "1.5px solid #dcebfa",
                borderRadius: "14px",
                padding: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ flex: 1, paddingRight: "10px" }}>
                <h4 style={{ fontSize: "15px", color: "#222" }}>{act.titulo}</h4>
                <p style={{ fontSize: "13px", color: "#555", margin: "2px 0 4px" }}>
                  {act.subtitulo}
                </p>
                {act.status === "calificada" ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#155724",
                      fontWeight: "bold"
                    }}
                  >
                    ✓ Calificada
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#b7791f",
                      fontWeight: "bold"
                    }}
                  >
                    ⏳ Pendiente de calificar
                  </span>
                )}
              </div>

              {act.status === "calificada" ? (
                <div style={{ textAlign: "right" }}>
                  <strong style={{ fontSize: "20px", color: "#0b3475" }}>
                    {act.nota.toFixed(1)}
                  </strong>
                  <small style={{ color: "#777", display: "block" }}>
                    / 5.0
                  </small>
                </div>
              ) : (
                <button
                  type="button"
                  style={{
                    background: "#59c8ff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    navigate("teacher-grade-activity", {
                      studentId: student.id,
                      studentName: student.nombre,
                      subjectId,
                      subjectName,
                      grade,
                      gradeKey,
                      activityId: act.id,
                      activityTitle: act.titulo,
                      activitySubtitle: act.subtitulo,
                      activityDesc: act.descripcion,
                      activityFile: act.archivo
                    })
                  }
                >
                  Calificar
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Promedio actual */}
        <div
          style={{
            background: "#dfeef9",
            border: "2px solid #59c8ff",
            borderRadius: "14px",
            padding: "14px 18px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#202d3d" }}>
              Promedio actual
            </p>
            <span style={{ fontSize: "12px", color: "#687789" }}>
              {calificadas.length} actividades evaluadas
            </span>
          </div>
          <div>
            <strong style={{ fontSize: "24px", color: "#0b3475" }}>
              {promedio}
            </strong>
            <span style={{ fontSize: "14px", color: "#555" }}> / 5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
