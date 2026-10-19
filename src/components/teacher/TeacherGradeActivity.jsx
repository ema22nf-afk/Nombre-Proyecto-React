import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherGradeActivity = ({
  studentId,
  studentName,
  subjectId,
  subjectName,
  grade,
  gradeKey,
  activityId,
  activityTitle,
  activitySubtitle,
  activityDesc,
  activityFile
}) => {
  const { gradeActivity, navigate } = useEduConnect();
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  const handleGuardar = (e) => {
    e.preventDefault();
    const val = parseFloat(nota);

    if (isNaN(val) || val < 0 || val > 5) {
      setMensaje({ text: "Ingresa una nota válida entre 0.0 y 5.0.", type: "error" });
      return;
    }

    if (!comentario.trim()) {
      setMensaje({ text: "Escribe un comentario de retroalimentación.", type: "error" });
      return;
    }

    gradeActivity(gradeKey, studentId, activityId, val, comentario.trim());

    setMensaje({ text: "✓ Calificación guardada correctamente.", type: "success" });

    setTimeout(() => {
      navigate("teacher-student-grades", {
        studentId,
        studentName,
        subjectId,
        subjectName,
        grade,
        gradeKey
      });
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Calificar actividad"
        showBack={true}
        onBack={() =>
          navigate("teacher-student-grades", {
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
        {/* Banner del estudiante (66_seccion) */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#ffffff",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1.5px solid #dcebfa",
            margin: "8px 0 14px"
          }}
        >
          <div style={{ fontSize: "32px" }}>👨‍🎓</div>
          <div>
            <h2 style={{ fontSize: "16px", color: "#202d3d" }}>
              {studentName || "Juan Pérez"}
            </h2>
            <p style={{ fontSize: "12px", color: "#687789" }}>
              Grado {grade} · {subjectName || "Tecnología"}
            </p>
          </div>
        </section>

        {/* Información de la tarea */}
        <section
          style={{
            background: "#ffffff",
            border: "1.5px solid #dcebfa",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "16px"
          }}
        >
          <h2 style={{ fontSize: "17px", color: "#202d3d" }}>
            {activityTitle || "Actividad 2"}
          </h2>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#3b78b8",
              marginBottom: "8px"
            }}
          >
            {activitySubtitle || "Investigación sobre tecnología"}
          </p>

          <p
            style={{
              fontSize: "13px",
              color: "#555",
              lineHeight: "1.4",
              marginBottom: "12px"
            }}
          >
            {activityDesc ||
              "Realiza una investigación sobre la importancia de la tecnología en la vida cotidiana y explica dos ejemplos de cómo influye en la sociedad."}
          </p>

          <div className="entrega-box">
            <h3 style={{ fontSize: "13px", color: "#0b3475" }}>
              📄 Entrega del estudiante
            </h3>
            <p style={{ fontSize: "12px", color: "#555", margin: "4px 0" }}>
              {studentName || "El estudiante"} ha entregado esta actividad.
            </p>
            <div className="archivo-adjunto">
              📎 {activityFile || "Investigación_tecnologia.pdf"}
            </div>
          </div>
        </section>

        {/* Formulario de Calificación */}
        <section
          style={{
            background: "#ffffff",
            border: "1.5px solid #dcebfa",
            borderRadius: "14px",
            padding: "16px"
          }}
        >
          <h3 style={{ fontSize: "16px", color: "#202d3d", marginBottom: "12px" }}>
            Calificación
          </h3>

          {mensaje.text && (
            <div
              style={{
                background: mensaje.type === "error" ? "#fde8e8" : "#def7ec",
                color: mensaje.type === "error" ? "#c81e1e" : "#03543f",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "13px",
                fontWeight: "bold"
              }}
            >
              {mensaje.text}
            </div>
          )}

          <form onSubmit={handleGuardar}>
            <div className="form-group">
              <label htmlFor="input-nota">Nota del estudiante (0.0 - 5.0)</label>
              <input
                type="number"
                id="input-nota"
                min="0"
                max="5"
                step="0.1"
                placeholder="Ejemplo: 4.7"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-comentario">Comentario</label>
              <textarea
                id="input-comentario"
                placeholder="Escribe un comentario sobre el trabajo..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={3}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Guardar calificación
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
