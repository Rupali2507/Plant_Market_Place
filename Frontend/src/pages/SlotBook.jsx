import React, { useContext, useEffect } from "react";
import Tittle from "../components/Tittle";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const SlotBook = () => {
  const [selectOption, setSelectedOption] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState("");
  const { consultants, currency, navigate } = useContext(ShopContext);

  const [LiveVideoConsultant, setLiveVideoConsultant] = useState([]);
  const [LiveChatConsultant, setLiveChatConsultant] = useState([]);
  const [GuidanceConsultant, setGuidanceConsultant] = useState([]);
  const [QnaConsultant, setQnaConsultant] = useState([]);

  useEffect(() => {
    setLiveVideoConsultant(
      consultants
        .filter((item) => item.availability.includes("Video Call"))
        .slice(0, 8)
    );
    setLiveChatConsultant(
      consultants
        .filter((item) => item.availability.includes("Live Chat"))
        .slice(0, 8)
    );
    setGuidanceConsultant(
      consultants
        .filter((item) => item.availability.includes("Guidance"))
        .slice(0, 8)
    );
    setQnaConsultant(
      consultants
        .filter((item) => item.availability.includes("QnA"))
        .slice(0, 4)
    );
  }, [consultants]);

  const getConsultants = () => {
    switch (selectOption) {
      case "Live Video Consultation":
        return LiveVideoConsultant;
      case "Chat-Based Consultation":
        return LiveChatConsultant;
      case "Personalized Care Plans":
        return GuidanceConsultant;
      case "Q&A Section":
        return QnaConsultant;
      default:
        return [];
    }
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[6vw] lg:[7vw]">
      <div className="text-center text-3xl mt-10">
        <Tittle text1={"SLOT"} text2={"BOOKING"} />
      </div>

      <section className="mb-6">
        <h2 className="text-xl  font-semibold mb-3 text-green-900">
          Choose A Consultation Option
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div
            className="p-4 border cursor-pointer bg-white rounded-lg shadow hover:border-green-900"
            onClick={() => setSelectedOption("Live Video Consultation")}
          >
            <h3 className="font-bold   bg-white">Live Video Consultation</h3>
            <p className="bg-white">Schedule a video call with an expert.</p>
          </div>
          <div
            className="p-4 bg-white border cursor-pointer hover:border-green-900 rounded-lg shadow"
            onClick={() => setSelectedOption("Chat-Based Consultation")}
          >
            <h3 className="font-bold bg-white">Chat-Based Consultation</h3>
            <p className="bg-white">
              Get quick advice via WhatsApp or Live Chat.
            </p>
          </div>
          <div
            className="p-4 bg-white border cursor-pointer hover:border-green-900 rounded-lg shadow "
            onClick={() => setSelectedOption("Personalized Care Plans")}
          >
            <h3 className="font-bold bg-white">Personalized Care Plans</h3>
            <p className="bg-white">Receive customized plant care guides.</p>
          </div>
          <div
            className="p-4 bg-white border cursor-pointer hover:border-green-900  rounded-lg shadow"
            onClick={() => setSelectedOption("Q&A Section")}
          >
            <h3 className=" bg-white font-bold">Q&A Section</h3>
            <p className="bg-white">
              Ask experts specific plant care questions.
            </p>
          </div>
        </div>
      </section>

      <div>
        {selectOption && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-3 text-green-900 text-center">
              Available Experts With {selectOption}
            </h2>
            <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-4">
              {getConsultants().map((consultant, index) => (
                <div
                  key={index}
                  className={`p-4 bg-white  rounded-lg shadow cursor-pointer  ${
                    selectedExpert?.id === consultant.id
                      ? "border-2 border-green-500 "
                      : ""
                  }`}
                >
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-20 h-20 rounded-full mx-auto"
                  />
                  <h2 className="text-lg bg-white font-semibold text-center mt-2">
                    {consultant.name}
                  </h2>
                  <p className="text-center text-sm text-gray-500 bg-white">
                    {consultant.specialization}
                  </p>

                  <p className="text-center bg-white">{consultant.rating}</p>
                  <p className="text-center text-xl bg-white">
                    Price: {currency}
                    {consultant.price}
                  </p>
                  <button
                    onClick={() => {
                      navigate("/user-details", { state: consultant });
                    }}
                    className="ml-12 px-8 py-2 bg-green-900 mt-4 text-white rounded"
                  >
                    BOOK YOUR SLOT
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SlotBook;
