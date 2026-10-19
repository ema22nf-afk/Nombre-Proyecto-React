import React, { useState } from "react";
import { EduConnectContext } from "./EduConnectContextDef";
import {
  initialStudent,
  initialTeacher,
  initialStudentSubjects,
  initialTasks,
  initialNotifications,
  initialChats,
  initialTeacherSubjects,
  initialStudentsByGrade
} from "../data/initialData";

export const EduConnectProvider = ({ children }) => {
  // Navigation stack
  const [history, setHistory] = useState([{ screen: "welcome", params: {} }]);

  // Authentication & Users
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("educonnectSesion");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState(() => currentUser?.rol || "estudiante");

  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem("educonnect_perfil");
      return saved ? JSON.parse(saved) : initialStudent;
    } catch {
      return initialStudent;
    }
  });

  const [teacher, setTeacher] = useState(() => {
    try {
      const saved = localStorage.getItem("educonnect_perfil_profesor");
      return saved ? JSON.parse(saved) : initialTeacher;
    } catch {
      return initialTeacher;
    }
  });

  // Subjects & dynamic lists
  const [studentSubjects, setStudentSubjects] = useState(() => {
    try {
      const saved = sessionStorage.getItem("educonnect_materias_temporales");
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...initialStudentSubjects, ...parsed];
      }
      return initialStudentSubjects;
    } catch {
      return initialStudentSubjects;
    }
  });

  const [teacherSubjects, setTeacherSubjects] = useState(() => {
    try {
      const saved = sessionStorage.getItem("educonnect_materias_profesor_temporales");
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...initialTeacherSubjects, ...parsed];
      }
      return initialTeacherSubjects;
    } catch {
      return initialTeacherSubjects;
    }
  });

  // Tasks, Grades, Notifications & Chats
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [chats, setChats] = useState(initialChats);
  const [studentsByGrade, setStudentsByGrade] = useState(initialStudentsByGrade);

  const currentView = history[history.length - 1] || { screen: "welcome", params: {} };

  const navigate = (screen, params = {}) => {
    setHistory((prev) => [...prev, { screen, params }]);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
  };

  const goToDashboard = () => {
    if (role === "maestro") {
      setHistory([{ screen: "teacher-dashboard", params: {} }]);
    } else {
      setHistory([{ screen: "student-dashboard", params: {} }]);
    }
  };

  // Auth functions
  const login = (email, password, pin, selectedRole) => {
    const sesion = { correo: email, rol: selectedRole };
    localStorage.setItem("educonnectSesion", JSON.stringify(sesion));
    setCurrentUser(sesion);
    setRole(selectedRole);

    if (selectedRole === "maestro") {
      setHistory([{ screen: "teacher-dashboard", params: {} }]);
    } else {
      setHistory([{ screen: "student-dashboard", params: {} }]);
    }
  };

  const logout = () => {
    localStorage.removeItem("educonnectSesion");
    setCurrentUser(null);
    setHistory([{ screen: "welcome", params: {} }]);
  };

  const register = (userData) => {
    localStorage.setItem("educonnectUsuario", JSON.stringify(userData));
    localStorage.setItem(
      "educonnectSesion",
      JSON.stringify({ correo: userData.correo, rol: userData.rol })
    );
    setCurrentUser({ correo: userData.correo, rol: userData.rol });
    setRole(userData.rol);

    if (userData.rol === "maestro") {
      setTeacher((prev) => ({ ...prev, correo: userData.correo }));
      setHistory([{ screen: "teacher-dashboard", params: {} }]);
    } else {
      setStudent((prev) => ({
        ...prev,
        correo: userData.correo,
        telefono: userData.celular || prev.telefono
      }));
      setHistory([{ screen: "student-dashboard", params: {} }]);
    }
  };

  // Student Actions
  const addStudentSubject = (newSubject) => {
    const item = {
      id: "subj-" + Date.now(),
      nombre: newSubject.nombre,
      profesor: newSubject.profesor,
      codigo: newSubject.codigo,
      icono: "fa-solid fa-book",
      isCustom: true
    };
    setStudentSubjects((prev) => [...prev, item]);
    setTasks((prev) => ({
      ...prev,
      [item.id]: [
        {
          id: "task-" + Date.now(),
          title: "Actividad diagnóstica",
          status: "pendiente",
          dueDate: "Próxima semana",
          description: "Lectura introductoria de la nueva materia."
        }
      ]
    }));

    try {
      const existing = JSON.parse(
        sessionStorage.getItem("educonnect_materias_temporales") || "[]"
      );
      sessionStorage.setItem(
        "educonnect_materias_temporales",
        JSON.stringify([...existing, item])
      );
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = (subjectId, newTask) => {
    const taskItem = {
      id: "t-" + Date.now(),
      title: newTask.title,
      status: "pendiente",
      dueDate: newTask.dueDate || "Sin fecha",
      description: newTask.description || "Nueva tarea asignada."
    };

    setTasks((prev) => ({
      ...prev,
      [subjectId]: [...(prev[subjectId] || []), taskItem]
    }));
  };

  const updateTaskStatus = (subjectId, taskId, newStatus, nota = null) => {
    setTasks((prev) => {
      const list = prev[subjectId] || [];
      const updated = list.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, ...(nota !== null ? { nota } : {}) }
          : t
      );
      return { ...prev, [subjectId]: updated };
    });
  };

  // Teacher Actions
  const addTeacherSubject = (newSubject) => {
    const item = {
      id: "prof-subj-" + Date.now(),
      nombre: newSubject.nombre,
      codigo: newSubject.codigo,
      icono: "fa-solid fa-book-bookmark",
      grados: newSubject.grados || ["9°", "10°", "11°"],
      isCustom: true
    };
    setTeacherSubjects((prev) => [...prev, item]);

    try {
      const existing = JSON.parse(
        sessionStorage.getItem("educonnect_materias_profesor_temporales") || "[]"
      );
      sessionStorage.setItem(
        "educonnect_materias_profesor_temporales",
        JSON.stringify([...existing, item])
      );
    } catch (e) {
      console.error(e);
    }
  };

  const gradeActivity = (gradeKey, studentId, activityId, nota, comentario) => {
    setStudentsByGrade((prev) => {
      const students = prev[gradeKey] || [];
      const updatedStudents = students.map((std) => {
        if (std.id === studentId) {
          const acts = (std.actividades || []).map((a) => {
            if (a.id === activityId) {
              return {
                ...a,
                status: "calificada",
                nota: parseFloat(nota),
                feedback: comentario
              };
            }
            return a;
          });
          return { ...std, actividades: acts };
        }
        return std;
      });
      return { ...prev, [gradeKey]: updatedStudents };
    });
  };

  // Chat Actions
  const sendChatMessage = (chatKey, text, sender = "me") => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const msg = { id: Date.now(), sender, text, time };
    setChats((prev) => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), msg]
    }));
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Update profile
  const updateProfile = (data, isTeacher = false) => {
    if (isTeacher) {
      setTeacher(data);
      localStorage.setItem("educonnect_perfil_profesor", JSON.stringify(data));
    } else {
      setStudent(data);
      localStorage.setItem("educonnect_perfil", JSON.stringify(data));
    }
  };

  return (
    <EduConnectContext.Provider
      value={{
        currentView,
        navigate,
        goBack,
        goToDashboard,
        currentUser,
        role,
        setRole,
        login,
        logout,
        register,
        student,
        teacher,
        updateProfile,
        studentSubjects,
        addStudentSubject,
        teacherSubjects,
        addTeacherSubject,
        tasks,
        addTask,
        updateTaskStatus,
        studentsByGrade,
        gradeActivity,
        notifications,
        markNotificationRead,
        deleteNotification,
        chats,
        sendChatMessage
      }}
    >
      {children}
    </EduConnectContext.Provider>
  );
};

