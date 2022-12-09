import "./ImageModal.css";

import React from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

import Modal from "./Modal";

export default function ImageModal({
  isShowing,
  hide,
  imgSrc,
  enableSlideShow,
  imgCount,
  prevImg,
  nextImg,
}) {
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className="image-modal-container">
        {enableSlideShow && (
          <TfiAngleLeft
            className="image-modal-slide-arrow"
            size={25}
            onClick={prevImg}
          />
        )}
        <div className="image-modal-img-wrapper">
          <img src={imgSrc ?? ""} alt={imgSrc} className="image-modal-img" />
        </div>
        {enableSlideShow && (
          <TfiAngleRight
            className="image-modal-slide-arrow"
            size={25}
            onClick={nextImg}
          />
        )}
      </div>
      {enableSlideShow && <p className="image-modal-counter">{imgCount}</p>}
    </Modal>
  );
}
