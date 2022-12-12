import React, { useState } from "react";
import "./Card.css";
import { SlStar } from "react-icons/sl";
import { parseRating } from "../utils/parseRating";
import YarnWeight from "./Icons/YarnWeight";

export default function Card({ yarn }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-container">
      <div className="yarn-weight">
        <YarnWeight number={yarn.weight} />
      </div>
      {yarn.img_url?.length > 0 && (
        <div className="card-image-container">
          {imgError ? (
            <div
              style={{ color: "black", fontWeight: 400, textAlign: "center" }}
            >
              This image could not be shown
            </div>
          ) : (
            <img
              className="card-image"
              src={yarn.img_url[0]}
              alt={yarn.name}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      )}
      <div className="card-details">
        <div className="yarn-name">{yarn.name}</div>
        <span style={{ color: "var(--beige-yellow)" }}>{yarn.brand.name}</span>
        <div className="card-section">
          <span>{yarn.color}</span>
          <div className="yarn-rating">
            <span>{parseRating(yarn?.average_rating)}</span>
            <SlStar size={18} />
          </div>
        </div>

        <div className="card-section">
          <span className="yarn-materials">
            {yarn.materials
              ?.map((mat) => `${mat.percentage}% ${mat.name}`)
              .join(", ")}
          </span>
          <span className="yarn-review-count">
            {yarn.reviewCount} review{yarn.reviewCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
