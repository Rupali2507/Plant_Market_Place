import React, { useContext } from "react";
import Tittle from "./Tittle";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl py-8 ">
        <Tittle text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <div>Subtotal</div>
          <p>
            {currency} {getCartAmount()}.00{" "}
          </p>
        </div>
        <hr />
        <div className="flex  justify-between">
          <p>Shipping fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {delivery_fee + getCartAmount()}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
