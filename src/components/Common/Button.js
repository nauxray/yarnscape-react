import React from "react";

const Button = ({ text, clickHandler, styles }) => {
  return (
    <>
      <button
        className="yellow-btn"
        style={styles ?? {}}
        onClick={clickHandler}
      >
        {text}
      </button>
      <style jsx="true">{`
        .yellow-btn {
          background-color: var(--beige-yellow);
          font-family: Poppins;
          font-size: 1.25rem;
          font-weight: 400;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .yellow-btn:hover {
          opacity: 80%;
        }
      `}</style>
    </>
  );
};

export default Button;
