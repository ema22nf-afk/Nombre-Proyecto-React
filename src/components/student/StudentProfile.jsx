import React, { useState } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";
import { BottomNav } from "../common/BottomNav";

export const StudentProfile = () => {
  const { student, updateProfile, logout, navigate } = useEduConnect();
  const [formData, setFormData] = useState({
    nombre: student.nombre || "",
    grado: student.grado || "",
    codigo: student.codigo || "",
    telefono: student.telefono || "",
    correo: student.correo || "",
    avatar: student.avatar || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
  });
  const [savedMsg, setSavedMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !formData.nombre.trim() ||
      !formData.grado.trim() ||
      !formData.codigo.trim() ||
      !formData.telefono.trim() ||
      !formData.correo.trim()
    ) {
      alert("Complete todos los campos.");
      return;
    }

    updateProfile(formData, false);
    setSavedMsg("✓ Perfil guardado correctamente.");
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
        title="Perfil"
        showBack={true}
        onBack={() => navigate("student-dashboard")}
        showHome={true}
      />

      <div className="scroll-area">
        <div className="perfil-foto-container">
          <img
            src={formData.avatar}
            alt="Foto de perfil"
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
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Grado escolar</label>
            <input
              type="text"
              name="grado"
              placeholder="Grado"
              value={formData.grado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Código de estudiante</label>
            <input
              type="text"
              name="codigo"
              placeholder="Código de estudiante"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Número de teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginBottom: "10px" }}>
            Guardar
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

      <BottomNav active="profile" />
    </div>
  );
};
