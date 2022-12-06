import "./NewReview.css";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Api from "../utils/api/api";
import AuthApi from "../utils/api/authApi";
import Button from "./Button";
import Loader from "./Loader";

export default function NewReview({ logout }) {
  const yarnId = useParams().id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [yarn, setYarn] = useState(null);
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const [imgs, setImgs] = useState([""]);

  const getYarnDetails = async () => {
    const api = new Api();
    const yarnRes = await api.getYarn(yarnId);
    setYarn(yarnRes);
  };

  useEffect(() => {
    getYarnDetails();
  }, []);

  const validate = () => {
    if (content.trim().length === 0) {
      toast.error("Main content cannot be empty!");
      return false;
    }
    if (rating <= 0 || rating > 5) {
      toast.error("Rating must be within 1 to 5!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    const api = new AuthApi();
    const filteredImgs = [...imgs].filter((entry) => entry.length > 0);

    const res = await api.postReview(yarnId, content, rating, filteredImgs);
    if (res.status === 201) {
      toast.success("Review successfully created!");
      navigate(`/yarn/${yarnId}`);
    } else if (res.status === 403) {
      toast.error("Please login again");
      logout();
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="new-review-container">
      <span className="review-header">Reviewing:</span>
      <p className="review-header review-yarn-name">{yarn?.name}</p>
      <div className="review-form">
        <div className="review-rating">
          <span className="form-label">Rating:</span>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {Array(5)
              .fill()
              .map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>
          <span className="form-label">/5</span>
        </div>
        <p className="form-label">
          How was your experience working with this yarn?
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="review-images">
          <span className="form-label">Image URL(s)</span>
          <div className="review-images-inputs">
            {imgs.map((item, index) => (
              <div className="review-img-input" key={index}>
                <IoIosAddCircleOutline onClick={() => setImgs([...imgs, ""])} />
                <input
                  value={item}
                  onChange={(e) => {
                    const newArr = [...imgs];
                    newArr[index] = e.target.value;
                    setImgs(newArr);
                  }}
                />
                {index > 0 && (
                  <AiOutlineClose
                    onClick={() => {
                      const newImgs = [...imgs];
                      newImgs.splice(index, 1);
                      setImgs(newImgs);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <hr />
        {loading ? (
          <div style={{ width: "2rem", height: "2rem", alignSelf: "flex-end" }}>
            <Loader />
          </div>
        ) : (
          <Button clickHandler={handleSubmit} text={"Submit"} />
        )}
      </div>
    </div>
  );
}
