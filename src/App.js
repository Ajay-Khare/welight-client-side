import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Homepage from "./components/homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
