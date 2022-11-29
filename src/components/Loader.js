import React from "react";

export default function Loader() {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          width: 100%;
          height: 100%;
          border: 5px solid white;
          border-top: 5px solid var(--beige-yellow);
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
