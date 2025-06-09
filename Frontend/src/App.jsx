import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import SearchBar from "./components/SearchBar";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import SlotBook from "./pages/SlotBook";
import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/book-slot" element={<SlotBook />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
