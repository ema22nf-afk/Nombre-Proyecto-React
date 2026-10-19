import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherAddSubject = () => {
  const { addTeacherSubject, navigate } = useEduConnect();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [grados, setGrados] = useState(["10°", "11°"]);
  const [descripcion, setDescripcion] = useState("");

  const handleGradoToggle = (grado) => {
    if (grados.includes(grado)) {
      setGrados(grados.filter((g) => g !== grado));
    } else {
      setGrados([...grados, grado]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !codigo.trim()) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    addTeacherSubject({
      nombre: nombre.trim(),
      codigo: codigo.trim(),
      grados: grados.length > 0 ? grados : ["10°"],
      descripcion: descripcion.trim()
    });

    alert("✓ Materia agregada exitosamente.");
    navigate("teacher-dashboard");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Agregar materia"
        showBack={true}
        onBack={() => navigate("teacher-dashboard")}
        showHome={true}
      />

      <div className="scroll-area form-container">
        <div style={{ textAlign: "center", fontSize: "50px", margin: "10px 0" }}>
          📚
        </div>
        <h2 style={{ textAlign: "center", fontSize: "20px", color: "#202d3d" }}>
          Nueva materia
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#687789",
            marginBottom: "20px"
          }}
        >
          Completa la información para agregar una nueva materia.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="t-nombre">Nombre de la materia</label>
            <input
              type="text"
              id="t-nombre"
              placeholder="Ej. Matemáticas Avanzadas"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="t-codigo">Código de la materia</label>
            <input
              type="text"
              id="t-codigo"
              placeholder="Ej. MAT-501"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Grados a cargo</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              {["9°", "10°", "11°"].map((g) => (
                <button
                  key={g}
                  type="button"
                  style={{
                    flex: 1,
                    height: "38px",
                    borderRadius: "8px",
                    border: "1.5px solid #59c8ff",
                    background: grados.includes(g) ? "#59c8ff" : "#fff",
                    color: grados.includes(g) ? "#fff" : "#333",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={() => handleGradoToggle(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="t-desc">Descripción (opcional)</label>
            <textarea
              id="t-desc"
              placeholder="Temario y objetivos de aprendizaje..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "15px" }}
          >
            Crear materia
          </button>
        </form>
      </div>
    </div>
  );
};
