import "./App.css";
import "react-tippy/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Account from "./components/Account";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import YarnDetails from "./components/YarnDetails";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar key={user} user={user} setUser={setUser} />
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
          <Route path="/yarn/:id" element={<YarnDetails />} />
          <Route
            path="/account"
            element={<Account key={user} user={user} setUser={setUser} />}
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
