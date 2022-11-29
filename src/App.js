import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/add-yarn" element={<div>add yarn</div>} />
          <Route path="/account" element={<div>account</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
