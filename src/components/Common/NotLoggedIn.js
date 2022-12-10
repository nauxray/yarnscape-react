import React from "react";

export default function NotLoggedIn() {
  return (
    <div className="error">
      Please login first!
      <img src="/images/rolling-yarn-cat.svg" alt="rolling-yarn-cat" />
      <style jsx="true">{`
        .error {
          font-size: 1.75rem;
          width: 90%;
          margin: 5rem auto;
          display: flex;
          gap: 5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .error > img {
          width: 10rem;
          height: 7.5rem;
          pointer-events: none;
        }
        @media only screen and (max-width: 720px) {
          .error {
            font-size: 1.25rem;
          }
        }
        @media only screen and (max-width: 500px) {
          .error {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
