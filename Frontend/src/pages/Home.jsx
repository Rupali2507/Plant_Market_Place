import React from "react";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />

      <Collection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
};

export default Home;
