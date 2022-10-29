import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Homepage from "./components/homepage";
import Cart from "./components/cart";
import PaymentPage from "./components/paymentPage";
import PurchaseHistory from "./components/purchaseHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/purchaseHistory" element={<PurchaseHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
