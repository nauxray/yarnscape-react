import "./Modal.css";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ isShowing, hide, children }) {
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => (document.body.style.overflowY = "scroll");
  }, [isShowing]);

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <AiOutlineClose
                  className={"modal-close-btn"}
                  size={20}
                  onClick={hide}
                />
              </div>
              {children}
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}
