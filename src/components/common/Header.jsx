import React from "react";
import { useEduConnect } from "../../context";

export const Header = ({
  title,
  showBack = true,
  showHome = true,
  onBack,
  onHome,
  rightElement = null
}) => {
  const { goBack, goToDashboard } = useEduConnect();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      goToDashboard();
    }
  };

  return (
    <header className="header">
      {showBack ? (
        <button
          type="button"
          className="btn-header"
          onClick={handleBack}
          title="Volver"
          aria-label="Volver"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      ) : (
        <div className="header-empty-placeholder" />
      )}

      <h1>{title}</h1>

      {rightElement ? (
        rightElement
      ) : showHome ? (
        <button
          type="button"
          className="btn-header"
          onClick={handleHome}
          title="Inicio"
          aria-label="Inicio"
        >
          <i className="fa-solid fa-house"></i>
        </button>
      ) : (
        <div className="header-empty-placeholder" />
      )}
    </header>
  );
};
