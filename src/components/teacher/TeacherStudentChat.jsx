import React, { useState, useRef, useEffect } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const TeacherStudentChat = ({
  studentId,
  studentName,
  subjectId,
  subjectName,
  grade,
  gradeKey
}) => {
  const { chats, sendChatMessage, navigate } = useEduConnect();
  const chatKey = `chat-${studentId || "juan-perez"}`;
  const messages = chats[chatKey] || [
    {
      id: 1,
      sender: "other",
      text: `Buenos días profesor, ¿tiene alguna observación de mi entrega de ${subjectName || "Tecnología"}?`,
      time: "09:30"
    },
    {
      id: 2,
      sender: "me",
      text: "Hola, la estoy revisando en este momento. Buen trabajo en general.",
      time: "09:35"
    }
  ];

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(chatKey, inputText.trim(), "me");
    setInputText("");

    // Respuesta del estudiante
    setTimeout(() => {
      sendChatMessage(
        chatKey,
        "¡Muchas gracias profesor! Quedo atento a la nota.",
        "other"
      );
    }, 1500);
  };

  return (
    <div className="chat-container">
      <Header
        title={`Chat · ${studentName || "Estudiante"}`}
        showBack={true}
        onBack={() =>
          navigate("teacher-student-detail", {
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

      <div className="chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-mensaje ${m.sender === "me" ? "enviado" : "recibido"}`}
          >
            <div>{m.text}</div>
            {m.time && <small>{m.time}</small>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-bar" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Escribe un mensaje al estudiante..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="chat-send-btn"
          aria-label="Enviar mensaje"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};
