import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Homepage from "./components/homepage";
import Cart from "./components/cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
