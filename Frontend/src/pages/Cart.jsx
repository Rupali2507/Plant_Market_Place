import React, { useContext, useEffect, useState } from "react";
import Tittle from "../components/Tittle";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } =
    useContext(ShopContext);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (!cartItem || Object.keys(cartItem).length === 0) {
      setProductData([]);
      console.warn("cartItem is empty");
      return;
    }

    if (products.length > 0) {
      const tempData = Object.keys(cartItem)
        .filter((itemId) => cartItem[itemId] > 0)
        .map((itemId) => ({
          _id: itemId,
          quantity: cartItem[itemId],
        }));
      setProductData(tempData);
    }
  }, [cartItem]);

  return (
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t pt-14">
      <div className=" text-2xl mb-3">
        <Tittle text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {productData?.length > 0 ? (
          productData.map((item, index) => {
            const productDATA = products.find(
              (product) => product._id === item._id
            );
            if (!productDATA) {
              console.error(`Product with ID ${item._id} not found`);
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={productDATA.image[0]}
                    alt={productDATA.name}
                    className="w-16 sm:w-20"
                  />

                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productDATA.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productDATA.price}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 sm:px-2 py-1 "
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  src={assets.bin_icon}
                  className="cursor-pointer"
                  onClick={() => {
                    updateQuantity(item._id, 0);
                  }}
                  alt=""
                />
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No products found</p>
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeOrder")}
              className="text-sm text-white bg-green-900 my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
