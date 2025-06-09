import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { Link } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  return productData ? (
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full h-20px bg-cover">
            {productData.image.map((item, index) => (
              <img
                src={item}
                onClick={() => setImage(item)}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full h-60vh sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-5 4" alt="" />
            <img src={assets.star_icon} className="w-5 5" alt="" />
            <img src={assets.star_icon} className="w-5 5" alt="" />
            <img src={assets.star_icon} className="w-5 5" alt="" />
            <img src={assets.star_dull_icon} className="w-5 5" alt="" />
            <p className="pl-2">{productData.rating}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-green-700 md:w-4/5">
            {productData.description}
          </p>

          <button
            onClick={() => addToCart(productData._id)}
            className="bg-green-900 text-white px-10 py-3 text-sm active:bg-gray-700 mt-4"
          >
            Add to Cart
          </button>

          <Link to={"/cart"}>
            <button className="bg-white border border-green-900 text-green px-10 py-3 text-sm active:bg-gray-700 mt-4">
              Go to Cart
            </button>
          </Link>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p> Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm"> Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus officia natus, voluptatum doloribus obcaecati
            voluptatem recusandae harum velit tempora ab delectus neque
            praesentium perspiciatis, tempore deleniti quia minus, nostrum
            omnis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum
            placeat fuga quibusdam perferendis suscipit, mollitia facilis
            explicabo earum. Unde quis repellat ullam maiores dicta praesentium
            beatae, sequi facilis et.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
