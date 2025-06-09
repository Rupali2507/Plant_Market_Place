import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestProducts, setBestProducts] = useState([]);
  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProduct = products.filter((item) => item.bestSeller);

      setBestProducts(bestProduct.slice(0, 5));
    } else {
      console.error("products is not an array:", products);
    }
  }, [products]);
  return (
    <div className="mx-10 my-10">
      <div className="text-center text-3xl py-8">
        <Tittle text1={"BEST"} text2={"SELLER"} />
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          corrupti quaerat animi fugit quisquam, porro, accusamus quasi
          veritatis aliquam laborum qui deserunt perferendis cum necessitatibus
          dolores quos? Iure, veniam labore!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 h-20px bg-cover ">
        {bestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
