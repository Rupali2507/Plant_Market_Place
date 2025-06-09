import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

import ProductItem from "./ProductItem";
import Tittle from "./Tittle";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProducts((prev) => {
        const updatedProducts = products.slice(0, 10);

        return updatedProducts;
      });
    } else {
      console.error("Products is not an array:", products);
    }
  }, [products]);

  return (
    <div className="my-10 mx-10">
      <div className="text-3xl text-center py-8">
        <Tittle text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-gray-700 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, esse
          doloremque ipsa maxime reprehenderit recusandae reiciendis sed ullam
          asperiores.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 h-20px bg-cover ">
        {latestProducts.map((item, index) => (
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

export default Collection;
