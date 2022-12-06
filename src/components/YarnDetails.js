import "./YarnDetails.css";

import React, { useEffect, useState } from "react";
import { SlStar } from "react-icons/sl";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";

import Api from "../utils/api/api";
import { parseRating } from "../utils/parseRating";
import Button from "./Button";
import ReviewCard from "./ReviewCard";
import { Tooltip } from "react-tippy";

export default function YarnDetails({ user }) {
  const yarnId = useParams().id;
  const [yarn, setYarn] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [reviews, setReviews] = useState(null);

  const images = yarn?.img_url;
  const authorList = reviews?.map((item) => item.author);
  const userLeftReview = authorList?.includes(user?._id);

  const api = new Api();
  const getReviewDetails = async () => {
    const reviewRes = await api.getReviewsByYarn(yarnId);
    setReviews(reviewRes);
  };

  const getYarnDetails = async () => {
    const yarnRes = await api.getYarn(yarnId);
    setYarn(yarnRes);
  };

  useEffect(() => {
    getYarnDetails();
    getReviewDetails();
  }, []);

  const prevImg = () => {
    setImgIndex(imgIndex - 1 < 0 ? 0 : imgIndex - 1);
  };
  const nextImg = () => {
    setImgIndex(
      imgIndex + 1 >= images?.length - 1 ? images?.length - 1 : imgIndex + 1
    );
  };

  return (
    <div className="details-container">
      <p className="details-header">{yarn?.name}</p>
      <section className="details-top">
        {yarn?.img_url?.length > 0 && (
          <div className="details-slideshow-container">
            <div className="details-image-slideshow">
              <TfiAngleLeft
                size={25}
                onClick={prevImg}
                className="slideshow-arrow"
              />
              <img
                className="details-image"
                src={yarn?.img_url[imgIndex]}
                alt={yarn?.name}
              />
              <TfiAngleRight
                size={25}
                onClick={nextImg}
                className="slideshow-arrow"
              />
            </div>
            <p className="slideshow-page">
              {imgIndex + 1}/{images?.length}
            </p>
          </div>
        )}
        <section className="details-info">
          <div className="details-info-row">
            <img
              className="details-info-icon"
              src={"/icons/brand.svg"}
              alt="brand"
            />
            Brand: {yarn?.brand.name}
          </div>
          <div className="details-info-row">
            <img
              className="details-info-icon"
              src={"/icons/materials.svg"}
              alt="materials"
            />
            Material:
          </div>
          <div
            className="details-info-row"
            style={{ alignItems: "flex-start" }}
          >
            <img
              className="details-info-icon"
              src={"/icons/measurement.svg"}
              alt="measurement"
            />
            <div className="tools-info">
              <span>Hook: {yarn?.recommended_hook_size}mm</span>
              <span>Needle: {yarn?.recommended_needle_size}mm</span>
            </div>
          </div>
        </section>
      </section>
      <div className="details-rating">
        <span>{parseRating(yarn?.average_rating)}</span>
        <SlStar size={25} />
      </div>
      <hr />
      <p className="details-review-count">
        {reviews?.length} review{reviews?.length === 1 ? "" : "s"}
      </p>
      <div className="reviews-container">
        {reviews?.map((item) => (
          <ReviewCard
            key={item._id}
            review={item}
            user={user}
            refreshReviews={getReviewDetails}
          />
        ))}
        <Tooltip
          disabled={!!user && !userLeftReview}
          title={
            !user
              ? "Please login to leave a review"
              : userLeftReview
              ? "You have already left a review on this yarn!"
              : ""
          }
        >
          <Link
            to={`/yarn/${yarnId}/review`}
            className={!user || userLeftReview ? "disabled" : ""}
          >
            <Button
              text={
                <div className="review-btn-text">
                  Write a review
                  <img src="/icons/pen.svg" alt="pen" />
                </div>
              }
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
