import "./ReviewMenu.css";

import React from "react";
import { FiLink2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useModal from "../../hooks/useModal";
import AuthApi from "../../utils/api/authApi";
import Button from "../Common/Button";
import Edit from "../Icons/Edit";
import Modal from "../Modal/Modal";

export default function ReviewMenu({
  showMenu,
  hideMenu,
  yarnId,
  reviewId,
  refreshReviews,
  logout,
  isProfile,
}) {
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();

  const deleteReview = async () => {
    const api = new AuthApi();
    const res = await api.deleteReview(reviewId);
    if (res.status === 204) {
      refreshReviews();
      toast.success("Review successfully deleted!");
    } else if (res.status === 403) {
      toast.error("Please login again");
      logout();
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = () => {
    toggle();
    deleteReview();
  };

  return (
    <>
      <ul className={`review-card-menu ${showMenu ? "menu-open" : ""}`}>
        {isProfile && (
          <li
            className="review-menu-item"
            onClick={() => {
              toggle();
              navigate(`/yarn/${yarnId}`);
            }}
          >
            <FiLink2 />
            View Yarn
          </li>
        )}
        <li
          className="review-menu-item"
          onClick={() => {
            hideMenu();
            navigate(`/yarn/${yarnId}/review/${reviewId}/edit`);
          }}
        >
          <Edit />
          Edit
        </li>
        <li
          className="review-menu-item"
          onClick={() => {
            toggle();
            hideMenu();
          }}
        >
          <img src="/icons/delete.svg" alt="delete" />
          Delete
        </li>
      </ul>
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="confirmation-modal">
          <p>Are you sure you want to delete your review?</p>
          <div className="confirmation-modal-btns">
            <Button text={"Close"} clickHandler={toggle} />
            <Button
              text={"Confirm"}
              clickHandler={handleDelete}
              styles={{ backgroundColor: "#B74E5A" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
