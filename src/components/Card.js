import React, { useState } from "react";
import "./Card.css";
import { SlStar } from "react-icons/sl";
import { parseRating } from "../utils/parseRating";

export default function Card({ yarn }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-container">
      {yarn.img_url?.length > 0 && (
        <div className="card-image-container">
          {imgError ?
            (<div style={{ color: "black", fontWeight: 400, textAlign: "center" }}>This image could not be shown</div>)
            :
            (<img
              className="card-image"
              src={yarn.img_url[0]}
              alt={yarn.name}
              onError={() => setImgError(true)}
            />)
          }
        </div>
      )}
      <div className="card-details">
        <div className="yarn-name">{yarn.name}</div>
        <div className="card-section">
          <span>{yarn.brand.name}</span>
          <div className="yarn-rating">
            <span>{parseRating(yarn?.average_rating)}</span>
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
