import React from "react";
import { useEduConnect } from "../../context";

export const QuickNav = () => {
  const { currentView, navigate, setRole } = useEduConnect();

  const handleStudentJump = () => {
    setRole("estudiante");
    navigate("student-dashboard");
  };

  const handleTeacherJump = () => {
    setRole("maestro");
    navigate("teacher-dashboard");
  };

  return (
    <div className="quick-control-bar">
      <span style={{ fontWeight: "bold", color: "#172234", marginRight: "4px" }}>
        EduConnect:
      </span>

      <button
        type="button"
        className={currentView.screen === "welcome" ? "active" : ""}
        onClick={() => navigate("welcome")}
      >
        Inicio (1_seccion)
      </button>

      <button
        type="button"
        className={currentView.screen === "login" ? "active" : ""}
        onClick={() => navigate("login")}
      >
        Login (2_seccion)
      </button>

      <button
        type="button"
        className={
          currentView.screen.startsWith("student") ||
          currentView.screen.startsWith("subject")
            ? "active"
            : ""
        }
        onClick={handleStudentJump}
      >
        👨‍🎓 Estudiante (5-44)
      </button>

      <button
        type="button"
        className={currentView.screen.startsWith("teacher") ? "active" : ""}
        onClick={handleTeacherJump}
      >
        👨‍🏫 Profesor (45-135)
      </button>

      <button
        type="button"
        onClick={() =>
          navigate("subject-cover", { subjectId: "artistica" })
        }
      >
        🎨 Artística
      </button>

      <button
        type="button"
        onClick={() =>
          navigate("teacher-subject-grades", { subjectId: "tecnologia" })
        }
      >
        💻 Tecnología Prof.
      </button>
    </div>
  );
};
