import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItem) {
        if (cartItem[items] > 0) {
          const itemInfo = structuredClone(
            products.find((item) => item._id === items)
          );
          if (itemInfo) {
            itemInfo.quantity = cartItem[items];
            orderItems.push(itemInfo);
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        //api call for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Error while placing order:", err);
      toast.error(err.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t  sm:flex-row  ml-10 sm:gap-10 "
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-2xl py-8">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="text"
          className="border border-green-900 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-green-900 rounded py-1.5 px-3.5 w-full"
          placeholder="Street name"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="text"
          className="border border-green-900 rounded py-1.5 px-3.5 w-full "
          placeholder="Phone"
          required
        />
      </div>
      <div className="mt-8 mr-10">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Tittle text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment method selction */}
          <div className={`flex gap-3 flex-col  lg:flex-row`}>
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-900" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-900" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-green-900 text-xs text-white px-16 py-3"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
