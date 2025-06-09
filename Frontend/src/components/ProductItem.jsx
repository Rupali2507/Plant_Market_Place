import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-green-900 cursor-pointer" to={`/products/${id}`}>
      <div className="overflow-hidden ">
        <img
          src={image[0]}
          className="hover:scale-110 transition ease-in-out w-60 h-60 object-cover  shadow-md"
          alt=""
        />
        <h3 className="pt-3 pb-1 text-sm">{name}</h3>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
