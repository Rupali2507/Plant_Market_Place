import { createContext, useEffect, useState } from "react";
import { experts, faqs, consultants } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$"; //currency
  const delivery_fee = 10; //delivery fee
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      cartData[itemId] += 1; // Increase quantity
    } else {
      cartData[itemId] = 1; // Initialize new item
    }

    setCartItem(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItem) {
      let quantity = Number(cartItem[itemId]); // Convert to number

      if (!isNaN(quantity) && quantity > 0) {
        totalCount += quantity;
      }
    }

    return totalCount;
  };
  //  Cart ammount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);

      if (cartItem[items] > 0) {
        totalAmount += itemInfo.price * cartItem[items];
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, quantity) => {
    console.log(cartItem);
    let cartData = structuredClone(cartItem);

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    console.log(cartData);
    setCartItem(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    currency,
    delivery_fee,
    products,
    experts,
    faqs,
    consultants,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    addToCart,
    updateQuantity,
    getCartCount,
    cartItem,
    setCartItem,
    getCartAmount,
    backendUrl,
    token,
    setToken,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
