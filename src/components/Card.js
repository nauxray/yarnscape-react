import React from "react";
import "./Card.css";

export default function Card({ yarn }) {
  return (
    <div className="card-container">
      {yarn.average_rating}
      <span>{yarn.name}</span>
      <span>{yarn.brand.name}</span>
      <span>materials</span>
      <span>{yarn.average_rating}</span>
      <span>{yarn.reviewCount}</span>
    </div>
  );
}
