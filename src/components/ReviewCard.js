import "./ReviewCard.css";

import React, { useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { SlStar } from "react-icons/sl";

import Api from "../utils/api/api";
import { parseRating } from "../utils/parseRating";

export default function ReviewCard({ review, user, isProfile }) {
  const [author, setAuthor] = useState(null);
  const [yarn, setYarn] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = new Api();

  const isOwnReview = !!user && author?._id === user?._id;

  const getAuthor = async () => {
    setLoading(true);
    const res = await api.getUser(review.author);
    setAuthor(res);
    setLoading(false);
  };

  const getYarn = async () => {
    setLoading(true);
    const res = await api.getYarn(review.yarn);
    setYarn(res);
    setLoading(false);
  };

  useEffect(() => {
    getAuthor();
    if (isProfile && !!review.yarn) getYarn();
  }, []);

  const reviewContent = (
    <div className="review-card">
      <div className='review-header'>
        <span>{author?.username}:</span>
        {isOwnReview && <RxDotsHorizontal className='review-menu-trigger' />}
      </div>
      <div className='review-rating-date'>
        <div className="yarn-rating">
          <span>{parseRating(review.rating)}</span>
          <SlStar size={22} />
        </div>
        <span>Reviewed this date this date</span>
      </div>
      <p>{review.content}</p>
      <div>
        {
          review.img_url?.map((item, index) => {
            // const imagesCount = review.img_url?.length;
            return <div key={index}>
              <img src={item} alt={item} />
            </div>

          })
        }
      </div>
    </div>
  );
  return isProfile ? (
    <details className="review-card">
      <summary>{yarn?.name}</summary>
      {reviewContent}
    </details>
  ) : reviewContent;
}