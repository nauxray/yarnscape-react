import "./ReviewMenu.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useModal from "../hooks/useModal";
import AuthApi from "../utils/api/authApi";
import Button from "./Button";
import Modal from "./Modal";

export default function ReviewMenu({
  showMenu,
  hideMenu,
  yarnId,
  reviewId,
  refreshReviews,
}) {
  const navigate = useNavigate();
  const { isShowing, toggle } = useModal();

  const deleteReview = async () => {
    const api = new AuthApi();
    const res = await api.deleteReview(reviewId);
    if (res.status === 204) {
      refreshReviews();
      toast.success("Review successfully deleted!");
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
        <li
          className="review-menu-item"
          onClick={() => {
            hideMenu();
            navigate(`/yarn/${yarnId}/review/${reviewId}/edit`);
          }}
        >
          <img src="/icons/edit.svg" alt="edit" />
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
