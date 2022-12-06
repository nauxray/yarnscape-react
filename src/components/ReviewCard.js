import "./ReviewCard.css";

import React, { useEffect, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { SlStar } from "react-icons/sl";

import Api from "../utils/api/api";
import { parseRating, parseTime } from "../utils/parseRating";
import Loader from "./Loader";
import ReviewMenu from "./ReviewMenu";

export default function ReviewCard({
  review,
  user,
  isProfile,
  refreshReviews,
  logout,
}) {
  const [author, setAuthor] = useState(null);
  const [yarn, setYarn] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState(review?.img_url);

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
      {loading ? (
        <div
          style={{
            width: "2rem",
            height: "2rem",
            margin: "1rem auto",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="review-header">
            <span>{author?.username}:</span>
            {isOwnReview && (
              <>
                <RxDotsHorizontal
                  className="review-menu-trigger"
                  onClick={() => setShowMenu(!showMenu)}
                />
                <ReviewMenu
                  showMenu={showMenu}
                  hideMenu={() => setShowMenu(false)}
                  yarnId={review?.yarn}
                  reviewId={review._id}
                  refreshReviews={refreshReviews}
                  logout={logout}
                />
              </>
            )}
          </div>
          <div className="review-rating-date">
            <div className="yarn-rating">
              <span>{parseRating(review.rating)}</span>
              <SlStar size={22} />
            </div>
            <span>Reviewed {parseTime(review.created_at)}</span>
          </div>
          <p>{review.content}</p>
          <div className="review-image-container">
            {imgs?.map((item, index) => {
              return (
                <div key={index} className="review-image">
                  <img
                    src={item}
                    alt={item}
                    onError={() => {
                      const newImgs = [...imgs];
                      newImgs.splice(index, 1);
                      setImgs(newImgs);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  return isProfile ? (
    <details className="review-card">
      <summary>{yarn?.name}</summary>
      {reviewContent}
    </details>
  ) : (
    reviewContent
  );
}
