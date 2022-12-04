import React from "react";
import "./Card.css";
import { SlStar } from "react-icons/sl";

export default function Card({ yarn }) {
  return (
    <div className="card-container">
      {yarn.img_url?.length > 0 && (
        <div className="card-image-container">
          <img className="card-image" src={yarn.img_url[0]} alt={yarn.name} />
        </div>
      )}
      <div className="card-details">
        <div className="yarn-name">{yarn.name}</div>
        <div className="card-section">
          <span>{yarn.brand.name}</span>
          <div className="yarn-rating">
            <span>
              {parseFloat(yarn.average_rating)
                .toFixed(1)
                .replace(/[.,]0$/, "")}
              /5
            </span>
            <SlStar size={18} />
          </div>
        </div>

        <div className="card-section">
          <span>materials</span>
          <span>
            {yarn.reviewCount} review{yarn.reviewCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
