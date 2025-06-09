import React from "react";

const NewsLetter = () => {
  return (
    <div className="text-center">
      <div className="text-green-900 text-2xl">Subscribe now & get 10% off</div>
      <p className="mt-3 text-gray-900">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
        recusandae.
      </p>
      <div className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button className="py-4 px-10 text-xs text-white bg-green-900">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
