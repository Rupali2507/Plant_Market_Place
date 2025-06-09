import React, { useState, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const dropRef1 = useRef();
  const dropRef2 = useRef();
  const dropRef3 = useRef();
  const dropRef4 = useRef();

  const [name, setName] = useState("");
  const [desciption, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("Outdoor");
  const [subCategory, setsubCategory] = useState("Seasonal");
  const [bestseller, setBestseller] = useState(false);

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setter(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", desciption);
      formData.append("price", Number(Price));

      formData.append("category", Category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
      action=""
    >
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product desciption</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={desciption}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row  gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Indoor">Indoor Plant</option>
            <option value="Outdoor">Outdoor Plant</option>
            <option value="Flowers">Flowers</option>
            <option value="Succulents">Succulents</option>

            <option value="Medicinal">Medicinal</option>

            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setsubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Rare">Rare</option>
            <option value="Exotic">Exotic</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Easy-care">Easy-care</option>
            <option value="Herb">Herb</option>
            <option value="Shrub">Shrub</option>
            <option value="Succulents">Succulents</option>

            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <p className="mb-2 ">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={Price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          className="cursor-pointer"
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Bestseller
        </label>
      </div>

      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2 ">
          <div
            onDrop={(e) => handleDrop(e, setImage1)}
            onDragOver={handleDragOver}
            className="w-20 border border-dashed border-gray-400 rounded cursor-pointer overflow-hidden"
            ref={dropRef1}
          >
            <label htmlFor="image1">
              <img
                className="w-20 h-20 object-cover cursor-pointer"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
          </div>
          <div
            onDrop={(e) => handleDrop(e, setImage2)}
            onDragOver={handleDragOver}
            className="w-20 border border-dashed border-gray-400 rounded cursor-pointer overflow-hidden"
            ref={dropRef2}
          >
            <label htmlFor="image2">
              <img
                className="w-20 h-20 object-cover  cursor-pointer"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
          </div>
          <div
            onDrop={(e) => handleDrop(e, setImage3)}
            onDragOver={handleDragOver}
            className="w-20 border border-dashed border-gray-400 rounded cursor-pointer overflow-hidden"
            ref={dropRef3}
          >
            <label htmlFor="image3">
              <img
                className="w-20 h-20 object-cover cursor-pointer"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
          </div>
          <div
            onDrop={(e) => handleDrop(e, setImage4)}
            onDragOver={handleDragOver}
            className="w-20 border border-dashed border-gray-400 rounded cursor-pointer overflow-hidden"
            ref={dropRef4}
          >
            <label htmlFor="image4">
              <img
                className="w-20 h-20 object-cover cursor-pointer"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-green-900 rounded-2xl text-white cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
