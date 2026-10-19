import React from "react";
import { useEduConnect } from "../../context";

export const TeacherDashboard = () => {
  const { teacherSubjects, navigate } = useEduConnect();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Encabezado con botones de perfil y notificaciones (45_seccion) */}
      <header className="header" style={{ flexDirection: "column", minHeight: "95px", padding: "12px 18px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "6px"
          }}
        >
          <button
            type="button"
            className="btn-header"
            onClick={() => navigate("teacher-profile")}
            title="Perfil del profesor"
          >
            <i className="fa-solid fa-user"></i>
          </button>

          <button
            type="button"
            className="btn-header"
            onClick={() => navigate("teacher-notifications")}
            title="Notificaciones"
          >
            <i className="fa-solid fa-bell"></i>
          </button>
        </div>

        <h1 style={{ fontSize: "22px" }}>Menú Principal</h1>
      </header>

      <div className="scroll-area">
        <h2 style={{ fontSize: "18px", color: "#202d3d", margin: "10px 0 16px" }}>
          Tus Materias
        </h2>

        {teacherSubjects.map((subj) => (
          <div
            key={subj.id}
            className="profesor-materia-item"
            onClick={() =>
              navigate("teacher-subject-grades", { subjectId: subj.id })
            }
          >
            <div
              className={`imagen-materia ${subj.artisticaClass ? "artistica" : ""}`}
            >
              <i className={subj.icono || "fa-solid fa-book"}></i>
            </div>
            <span>{subj.nombre}</span>
          </div>
        ))}

        {/* Tarjeta para agregar materia (135_seccion) */}
        <div
          className="profesor-materia-item"
          style={{ borderStyle: "dashed", background: "#fcfdfe" }}
          onClick={() => navigate("teacher-add-subject")}
        >
          <div
            className="imagen-materia"
            style={{ background: "#e1f5fe", color: "#039be5" }}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <span>Agregar materia</span>
        </div>
      </div>
    </div>
  );
};
