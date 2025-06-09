import React, { useContext } from "react";
import Tittle from "../components/Tittle";
import { ShopContext } from "../context/ShopContext";
import NewsLetter from "../components/NewsLetter";

const Consultation = () => {
  const { experts, navigate } = useContext(ShopContext);
  return (
    <div className="px-4 sm:[5vw] md:[6vw] lg:[7vw]">
      <div className="text-3xl pt-8 text-center">
        <Tittle text1={"PLANT"} text2={"CONSULTANT"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <div className=" grid grid-cols-2  gap-6  sm:w-full md:w-full">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className={`p-4 bg-white rounded-lg shadow cursor-pointer
              `}
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h2 className="text-lg bg-white font-semibold text-center mt-2">
                {expert.name}
              </h2>
              <p className="text-center text-sm text-gray-500 bg-white">
                {expert.specialization}
              </p>
              <p className="text-center bg-white">{expert.rating}</p>
            </div>
          ))}
        </div>
        <div className="pt-20 w-1/2 sm:w-full m-5">
          <h1 className="text-3xl font-bold text-green-900">
            Welcome to our plant consultation services!
          </h1>
          <p className="pt-5">
            With a passion for nurturing and understanding the needs of plants,
            we specialize in providing expert advice and tailored solutions for
            all your plant care needs. Whether you're a beginner looking for
            guidance on indoor plant growth or an experienced gardener wanting
            to explore advanced techniques like hydroponics or organic
            gardening, we are here to help you grow and maintain a healthy and
            thriving garden.
          </p>
          <button
            onClick={() => navigate("/book-slot")}
            className="px-8 py-4 bg-green-900 rounded-md text-white  my-10"
          >
            Book Your Slot Today
          </button>
        </div>
      </div>
      <div>
        <NewsLetter />
      </div>
    </div>
  );
};

export default Consultation;
