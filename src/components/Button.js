import React from "react";

const Button = ({ text, clickHandler, styles }) => {
  return (
    <button
      style={{
        backgroundColor: "var(--beige-yellow)",
        fontFamily: "Poppins",
        fontSize: "1.25rem",
        fontWeight: 400,
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        ...styles,
      }}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
