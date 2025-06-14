import React, { useContext, useEffect, useState } from "react";
import Tittle from "../components/Tittle";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { token, currency, backendUrl } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorder",
        {},
        { headers: { token } }
      );
      console.log(response.data.orders);
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    loadOrderData();
    console.log(orders);
  }, [token]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <div className="text-2xl py-8">
        <Tittle text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orders.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
          >
            <div className="flex items-start text-sm">
              <img className={"w-16 sm:w-20"} src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium"></p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity:{item.quantity}</p>
                </div>
                <p className="mt-1">
                  Date:
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment Method:
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 txt-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
