import React, { useState } from "react";
import { useEduConnect } from "../../context";

export const SubjectCover = ({ subjectId }) => {
  const { studentSubjects, navigate } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];
  const [searchTerm, setSearchTerm] = useState(subject ? subject.nombre : "");

  if (!subject) return null;

  const handleSearch = () => {
    const found = studentSubjects.find(
      (s) => s.nombre.toLowerCase() === searchTerm.toLowerCase().trim()
    );
    if (found) {
      alert(`Materia encontrada: ${found.nombre}`);
      navigate("subject-cover", { subjectId: found.id });
    } else {
      alert(`No se encontró la materia: ${searchTerm}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Encabezado con buscador incorporado según diseño (9_seccion) */}
      <header className="header" style={{ gap: "10px" }}>
        <button
          type="button"
          className="btn-header"
          onClick={() => navigate("student-dashboard")}
          title="Volver al menú"
        >
          <i className="fa-solid fa-house"></i>
        </button>

        <div className="buscador" style={{ padding: 0, flex: 1, border: "none" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar materia..."
            style={{ height: "38px" }}
          />
          <button
            type="button"
            onClick={handleSearch}
            style={{ width: "42px", height: "38px" }}
          >
            🔍
          </button>
        </div>
      </header>

      <div className="scroll-area materia-cover-content">
        <div style={{ margin: "20px 0" }}>
          {subject.imagen ? (
            <img
              src={subject.imagen}
              alt={subject.nombre}
              className="materia-cover-img"
            />
          ) : (
            <div
              style={{
                fontSize: "70px",
                color: "#4b79c7",
                marginBottom: "20px"
              }}
            >
              <i className={subject.icono || "fa-solid fa-book"}></i>
            </div>
          )}
        </div>

        <h1 className="materia-cover-title">{subject.nombre}</h1>

        <div className="dato-box">
          <span className="etiqueta">Profesor</span>
          <span className="valor">{subject.profesor || "Docente Asignado"}</span>
        </div>

        <div className="dato-box">
          <span className="etiqueta">Código</span>
          <span className="valor">{subject.codigo || "GEN-001"}</span>
        </div>

        <button
          type="button"
          className="btn-entrar-materia"
          onClick={() => navigate("subject-options", { subjectId: subject.id })}
        >
          Entrar a la materia
        </button>
      </div>
    </div>
  );
};
