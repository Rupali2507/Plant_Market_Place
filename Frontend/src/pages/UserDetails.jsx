import React, { useContext } from "react";
import Tittle from "../components/Tittle";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";

const UserDetails = () => {
  const location = useLocation();
  const data = location.state || {};
  console.log(data);

  // const { addToCart, navigate } = useContext(ShopContext);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    plantIssue: "",
    files: null,
    dateTime: "",
    duration: "15 mins",
    paymentMethod: "UPI",
    cardDetails: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };
  return (
    <div className="px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]">
      <div className="text-3xl text-center mt-4">
        <Tittle text1={"USER"} text2={"DETAILS"} />
      </div>
      <div>
        {data && (
          <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow">
            <h1 className="text-xl p-2 mb-2 bg-green-900 rounded text-white font-bold">
              Booking your session with {data.name}.
            </h1>
            <div className=" bg-white flex justify-between mb-6">
              <button
                className={`px-4 py-2 rounded ${
                  step === 1 ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setStep(1)}
              >
                1. Booking
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  step === 2 ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setStep(2)}
              >
                2. Describe Issue
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  step === 3 ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setStep(3)}
              >
                3. Payment
              </button>
            </div>
            {/* Step 1: Booking System */}
            {step === 1 && (
              <section className="p-4 border rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">
                  Step 1: Book Your Consultation
                </h2>
                <label className="block font-semibold">
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  className="w-full border p-2 rounded mt-2"
                  required
                  onChange={handleInputChange}
                />

                <label className="block font-semibold mt-4">
                  Select Duration
                </label>
                <select
                  name="duration"
                  className="w-full border p-2 rounded mt-2"
                  onChange={handleInputChange}
                  required
                >
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>1 hour</option>
                </select>

                <button
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => setStep(2)}
                >
                  Next: Describe Issue
                </button>
              </section>
            )}
            {/* Step 2: Describe Problem */}
            {step === 2 && (
              <section className="p-4 border rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">
                  Step 2: Describe Your Issue
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border p-2 rounded mb-3"
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border p-2 rounded mb-3"
                  onChange={handleInputChange}
                />
                <textarea
                  name="issue"
                  placeholder="Describe your plant issue..."
                  className="w-full border p-2 rounded mb-3"
                  rows="3"
                  onChange={handleInputChange}
                ></textarea>

                <label className="block font-semibold">
                  Upload Photos/Videos
                </label>
                <input
                  type="file"
                  multiple
                  className="w-full border p-2 rounded mt-2"
                  onChange={handleFileChange}
                />

                <button
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => setStep(3)}
                >
                  Next: Payment
                </button>
              </section>
            )}
            {/* Step 3: Payment Option */}
            {step === 3 && (
              <section className="p-4 border rounded-lg shadow ">
                <CartTotal />

                <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-1/3">
                  Proceed to payement
                </button>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
