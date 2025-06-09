import React from "react";
import Tittle from "../components/Tittle";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-center text-2xl pt-10 border-t">
        <Tittle text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col items-center sm:justify-center  md:flex-row sm:flex-row gap-10 mb-28 ">
        <img
          className="h-1/2  max-w-[360px] md:max-w-[480px] sm:max-w-[240px]  "
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col   gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms station <br />
            Suite 350,Washington DC, USA
          </p>
          <p className="text-gray-500">
            Tel:(415) 555-0132 <br />
            Email:admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-600"></p>
          <p className="text-gray-500">
            Learn more about teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-green-900 hover:text-white transition-all duration-500 ">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
