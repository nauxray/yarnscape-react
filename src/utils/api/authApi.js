import axios from "axios";
import { handleError } from "./api";

export default class AuthApi {
  constructor() {
    this.authToken = "";
    this.apiClient = null;
    this.apiUrl = process.env.REACT_APP_API_URL ?? "";
  }

  init = () => {
    if (this.apiUrl.length === 0) {
      console.error("api url undefined");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("token is missing!");
      return;
    } else this.authToken = token;

    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${this.authToken}`,
    };

    this.apiClient = axios.create({
      baseURL: this.apiUrl + "/",
      timeout: 30000, //timeout 30sec
      headers: headers,
    });

    return this.apiClient;
  };

  editUser = async (userId, username, password) => {
    try {
      const res = await this.init()?.put(`users/${userId}`, {
        username,
        password,
      });
      return res;
    } catch (err) {
      handleError(err);
      return err.response;
    }
  };
  postReview = async (yarnId, content, rating, imgUrl) => {
    try {
      const res = await this.init()?.post(`reviews/${yarnId}`, {
        content,
        rating,
        img_url: imgUrl,
      });
      return res;
    } catch (err) {
      handleError(err);
      return err.response;
    }
  };
  editReview = async (id, content, rating, imgUrl) => {
    try {
      const res = await this.init()?.put(`reviews/${id}`, {
        content,
        rating,
        img_url: imgUrl,
      });
      return res;
    } catch (err) {
      handleError(err);
      return err.response;
    }
  };
  deleteReview = async (id) => {
    try {
      const res = await this.init()?.delete(`reviews/${id}`);
      return res;
    } catch (err) {
      handleError(err);
      return err.response;
    }
  };
}
