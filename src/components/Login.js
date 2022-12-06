import React, { useState } from "react";
import "./Login.css";
import Button from "./Common/Button";
import Loader from "./Common/Loader";
import { toast } from "react-toastify";
import Api from "../utils/api/api";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);

  if (user) navigate("/");

  const fetchUser = async () => {
    const token = localStorage.getItem("token").split(".");
    const userId = JSON.parse(atob(token[1])).userId;
    const user = await new Api()?.getUser(userId);
    setUser(user);
  };

  const validate = () => {
    if (username.length === 0) {
      toast.error("Username must not be empty!");
      return false;
    }
    if (password.length === 0) {
      toast.error("Password must not be empty!");
      return false;
    }

    const usernameRegex = new RegExp(/^[a-z0-9]+$/i);
    if (!usernameRegex.test(username)) {
      toast.error("Username must be alphanumeric!");
      return false;
    }
    return true;
  };

  const loginSuccess = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    fetchUser();
    navigate("/");
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }

    const api = new Api();
    if (createAcc) {
      const res = await api?.createAcc(username, password);
      if (!res.jwt) {
        toast.error(res.data);
      } else {
        toast.success("Account created!");
        loginSuccess(res.jwt);
      }
    } else {
      const res = await api?.login(username, password);
      if (!res.jwt) {
        toast.error(res.data);
      } else {
        toast.success("You are now logged in!");
        loginSuccess(res.jwt);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        {createAcc ? "Welcome to the club." : "Welcome back."}
      </div>
      <div className="login-form">
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <div
            style={{
              width: "2rem",
              height: "2rem",
              margin: "3rem auto",
            }}
          >
            <Loader />
          </div>
        ) : (
          <Button
            clickHandler={handleSubmit}
            text={createAcc ? "Join" : "Sign in"}
          />
        )}
      </div>
      <hr />
      <div className="login-prompt">
        <p>{createAcc ? "Already a member?" : "Not a member?"}</p>
        <p className="action-link" onClick={() => setCreateAcc(!createAcc)}>
          {createAcc
            ? "Sign in with your account here!"
            : "Create an account now!"}
        </p>
      </div>
    </div>
  );
}
