import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherProfile = () => {
  const { teacher, updateProfile, logout, navigate } = useEduConnect();
  const [formData, setFormData] = useState({
    nombre: teacher.nombre || "",
    especialidad: teacher.especialidad || "",
    codigo: teacher.codigo || "",
    telefono: teacher.telefono || "",
    correo: teacher.correo || "",
    avatar: teacher.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  });
  const [savedMsg, setSavedMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData, true);
    setSavedMsg("✓ Perfil docente actualizado correctamente.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Perfil Docente"
        showBack={true}
        onBack={() => navigate("teacher-dashboard")}
        showHome={true}
      />

      <div className="scroll-area">
        <div className="perfil-foto-container">
          <img
            src={formData.avatar}
            alt="Foto de perfil docente"
            className="perfil-foto"
          />
        </div>

        {savedMsg && (
          <div
            style={{
              background: "#def7ec",
              color: "#03543f",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "13px",
              textAlign: "center"
            }}
          >
            {savedMsg}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Nombre del profesor</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Área / Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Código docente</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono de contacto</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo institucional</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginBottom: "10px" }}>
            Guardar cambios
          </button>

          <button
            type="button"
            className="btn-cerrar-sesion"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
