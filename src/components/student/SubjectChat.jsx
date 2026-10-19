import React, { useState, useRef, useEffect } from "react";
import { useEduConnect } from "../../context";
import { Header } from "../common/Header";

export const SubjectChat = ({ subjectId }) => {
  const { studentSubjects, chats, sendChatMessage, navigate } = useEduConnect();
  const subject = studentSubjects.find((s) => s.id === subjectId) || studentSubjects[0];
  const chatKey = subject?.id || "artistica";
  const messages = chats[chatKey] || [];
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(chatKey, inputText.trim(), "me");
    setInputText("");

    // Respuesta simulada del profesor después de 1 segundo
    setTimeout(() => {
      sendChatMessage(
        chatKey,
        `Hola, he recibido tu mensaje sobre ${subject?.nombre || "la materia"}. Lo revisaré en breve.`,
        "other"
      );
    }, 1200);
  };

  return (
    <div className="chat-container">
      <Header
        title={`Chat ${subject?.nombre || ""}`}
        showBack={true}
        onBack={() => navigate("subject-options", { subjectId: subject?.id })}
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
          placeholder="Escribe un mensaje..."
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
