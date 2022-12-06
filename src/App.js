import "./App.css";
import "react-tippy/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Account from "./components/Account/Account";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import YarnDetails from "./components/YarnDetails";
import NewReview from "./components/Review/NewReview";
import EditReview from "./components/Review/EditReview";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar key={user} user={user} setUser={setUser} logout={logout} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/add-yarn" element={<div>add yarn</div>} />
          <Route
            path="/yarn/:id"
            element={<YarnDetails user={user} logout={logout} />}
          />
          <Route
            path="/yarn/:id/review"
            element={<NewReview logout={logout} />}
          />
          <Route
            path="/yarn/:yarnId/review/:reviewId/edit"
            element={<EditReview logout={logout} />}
          />
          <Route
            path="/account"
            element={<Account key={user} user={user} logout={logout} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
