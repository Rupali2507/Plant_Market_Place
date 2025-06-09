import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t  sm:flex-row  ml-10 sm:gap-10 ">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-2xl py-8">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="First name"
            required
          />
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Last name"
            required
          />
        </div>
        <input
          type="text"
          className="border border-green-900 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
          required
        />
        <input
          type="text"
          className="border border-green-900 rounded py-1.5 px-3.5 w-full"
          placeholder="Street name"
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
            required
          />
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Zip Code"
            required
          />
          <input
            type="text"
            className="border border-green-900 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
            required
          />
        </div>
        <input
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
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-900" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
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
              onClick={() => navigate("/orders")}
              className="bg-green-900 text-xs text-white px-16 py-3"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
