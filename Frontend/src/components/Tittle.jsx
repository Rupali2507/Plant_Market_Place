import React from "react";

const Tittle = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 ">
      <p className="text-gray-500">
        {text1}
        <span className="text-green-900 font-medium">{text2}</span>
      </p>
      <p className="w-2 sm:w-12 sm:h-[2px] bg-gray-900  "></p>
    </div>
  );
};

export default Tittle;
