import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const AddSubjectStudent = () => {
  const { addStudentSubject, navigate } = useEduConnect();
  const [nombre, setNombre] = useState("");
  const [profesor, setProfesor] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !profesor.trim() || !codigo.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    addStudentSubject({
      nombre: nombre.trim(),
      profesor: profesor.trim(),
      codigo: codigo.trim()
    });

    alert("Materia agregada exitosamente.");
    navigate("student-dashboard");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Materia Nueva"
        showBack={true}
        onBack={() => navigate("student-dashboard")}
        showHome={true}
      />

      <div className="scroll-area form-container">
        <div
          style={{
            textAlign: "center",
            fontSize: "55px",
            margin: "20px 0 25px"
          }}
        >
          📒✏️
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subj-nombre">Nombre de la materia</label>
            <input
              type="text"
              id="subj-nombre"
              placeholder="Nombre de la materia"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subj-prof">Nombre del profesor</label>
            <input
              type="text"
              id="subj-prof"
              placeholder="Nombre del profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subj-codigo">Código de la materia</label>
            <input
              type="text"
              id="subj-codigo"
              placeholder="Código de la materia (Ej. ART-101)"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "20px" }}
          >
            Crear materia
          </button>
        </form>
      </div>
    </div>
  );
};
