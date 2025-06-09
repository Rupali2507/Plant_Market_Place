import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm sm:text-sm md:text-base text-gray-700">
      <div>
        <img className="w-12 m-auto mb-5" src={assets.exchange_icon} alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p>we offer hassle free exchange</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.support_img} alt="" />
        <p className="font-semibold">24/7 Best Customer Support</p>
        <p>we provide 24/7 customer support</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.quality_icon} alt="" />
        <p className="font-semibold">7 Days Return Policy </p>
        <p>We provide 7 days return policy</p>
      </div>
    </div>
  );
};

export default OurPolicy;
