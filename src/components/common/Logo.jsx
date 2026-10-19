import React from "react";

export const Logo = ({ compact = false }) => {
  return (
    <div className={`educonnect-logo ${compact ? "compact" : ""}`}>
      {/* 3 Barras características */}
      <div className="logo-lines">
        <span className="line blue"></span>
        <span className="line pink"></span>
        <span className="line yellow"></span>
      </div>

      {/* Círculo 'C' de EduConnect */}
      <div className="logo-c"></div>
    </div>
  );
};
