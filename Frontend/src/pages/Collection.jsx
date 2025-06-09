import React, { useContext, useEffect, useState } from "react";
import Tittle from "../components/Tittle";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = Array.isArray(products) ? products.slice() : [];

    if (search && showSearch) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
      console.log(productCopy);
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };
  const SortProduct = () => {
    let filterCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    console.log("Raw products from context:", products);
    applyFilter();
  }, [category, subCategory, search, showSearch]);
  useEffect(() => {
    SortProduct();
  }, [sortType]);
  console.log("Filtered Products:", filterProducts);

  return (
    <div className="flex flex-col sm:flex-row gap-2 ml-10 sm:gap-10 pt-10 border-t">
      {/* Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          <img
            className={`h-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
          FILTERS
        </p>
        <div className="border border-grey-500 pl-5 py-3 mt-6 ">
          <p className="text-sm mb-3 font-medium text-green-700 ">CATEGORIES</p>
          <p className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Indoor"}
              />
              Indoor Plant
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Outdoor"}
              />
              Outdoor Plant
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Flowers"}
              />
              Flowers
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Succulents"}
              />
              Succulents
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Medicinal"}
              />
              Medicinal Plants
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-3"
                value={"Others"}
              />
              Others
            </p>
          </p>
        </div>
        <div className="border border-grey-500 pl-5 py-3 mt-6 ">
          <p className="text-sm mb-3 font-medium text-green-700 ">TYPE</p>
          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Rare"}
              />
              Rare
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Exotic"}
              />
              Exotic
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Seasonal"}
              />
              Seasonal
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Easy-care"}
              />
              Easy-care
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Herb"}
              />
              Herb
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Shrub"}
              />
              Shrub
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Succulents"}
              />
              Succulents
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-3"
                value={"Others"}
              />
              Others
            </p>
          </div>
        </div>
      </div>
      {/* collections */}
      <div className="flex-1 mr-10">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-green-700 text-sm py-2"
          >
            <option value="relevant"> Sort by: Relevant</option>
            <option value="high-low">Sort by:High to low</option>
            <option value="low-high">Sort by: Low to High</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
