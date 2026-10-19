import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { BottomNav } from "../common/BottomNav";

export const StudentDashboard = () => {
  const { studentSubjects, navigate } = useEduConnect();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = studentSubjects.filter((subj) => {
    const text = `${subj.nombre} ${subj.profesor || ""} ${subj.codigo || ""}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase().trim());
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Encabezado */}
      <header className="header centered" style={{ justifyContent: "center" }}>
        <h1 style={{ fontSize: "24px" }}>Mis materias</h1>
      </header>

      {/* Buscador */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar materia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" aria-label="Buscar">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* Contenido / Cuadrícula de materias */}
      <div className="scroll-area">
        <div className="materias-grid">
          {/* Tarjeta para agregar materia */}
          <div
            className="materia-card materia-nueva"
            onClick={() => navigate("student-add-subject")}
            title="Agregar materia nueva"
          >
            <div className="icono-materia">
              <i className="fa-solid fa-circle-plus"></i>
            </div>
            <span>Materia nueva</span>
          </div>

          {/* Tarjetas de materias */}
          {filteredSubjects.map((subj) => (
            <div
              key={subj.id}
              className="materia-card"
              onClick={() => navigate("subject-cover", { subjectId: subj.id })}
              title={`Abrir ${subj.nombre}`}
            >
              <div className="icono-materia">
                <i className={subj.icono || "fa-solid fa-book"}></i>
              </div>
              <span>{subj.nombre}</span>
              {subj.profesor && <small>{subj.profesor}</small>}
              {subj.codigo && <small className="codigo">{subj.codigo}</small>}
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "30px 10px",
              color: "#8898aa"
            }}
          >
            <p>No se encontraron materias con "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Barra Inferior */}
      <BottomNav active="home" />
    </div>
  );
};
