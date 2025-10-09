/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [activeTab, setActiveTab] = useState("mission");

  // Reference to "Who We Are" section
  const whoWeAreRef = useRef(null);

  const handleTabClick = (key) => {
    setActiveTab(key);

    setTimeout(() => {
      if (whoWeAreRef.current) {
        // Experiment with this value; try -30, 0, or even a positive value if needed
        const yOffset = -30;
        const elementY =
          whoWeAreRef.current.getBoundingClientRect().top + window.scrollY;
        console.log("Calculated scroll position:", elementY + yOffset);
        window.scrollTo({ top: elementY + yOffset, behavior: "smooth" });
      }
    }, 200);
  };

  const content = {
    mission: {
      title: "Mission",
      text: [
        "Provide fresh, nutritious, and high-quality food products that support a healthy lifestyle.",
        "Ensure convenience and accessibility by delivering wholesome meals and groceries right to your doorstep.",
        "Educate and inspire individuals to make informed health choices by offering a variety of nutrient-rich products.",
        "Deliver an exceptional customer experience through innovation, reliability, and a commitment to well-being.",
      ],
      image:
        "https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fmission.jpeg?alt=media&token=f81fa64c-b4c9-4000-90a4-9069b2efd4fc",
    },

    vision: {
      title: "Vision",
      text: "At Kealthy, we envision a world where healthy eating is effortless, accessible, and enjoyable for everyone. We aim to be a trusted brand that empowers individuals to make nutritious choices by providing high-quality, natural, and wholesome food products. Our goal is to revolutionize the way people consume food by making healthier lifestyles convenient and sustainable through fast and reliable doorstep delivery.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fvission.avif?alt=media&token=57ffcecd-1c48-495c-90f9-fc6d044b3168",
    },

    values: {
      title: "Values",
      text: "💚Health & Wellness – We prioritize nutrition and well-being in everything we do, ensuring our products support a healthy lifestyle.\n🌱Quality & Freshness – We are committed to providing only the best, freshest, and most wholesome products for our customers.\n 🤝Trust & Transparency – We work with reliable suppliers and maintain honest communication about our sourcing and quality standards.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fvalues.jpg?alt=media&token=2ea4b3ce-a911-4c15-9f85-32c2350fc8e7",
    },
  };

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <SEO title="Kealthy" description="This is a Home Page" />
      {/* Home */}
      <section
        id="home"
        className="bg-white text-black py-24 px-4 md:px-12 lg:px-24 flex flex-wrap lg:flex-nowrap items-center gap-10 mt-4 md:mt-8 lg:mt-10"
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Welcome to Kealthy <br /> Where Good Health Begins
          </h1>

          {/* Mobile Image: Visible on small screens only */}
          <div className="md:hidden flex justify-center">
            <HeroSection />
          </div>

          {/* Paragraph with mobile justify and left on md and above */}
          <p className="[text-align:justify] md:text-left text-base md:text-lg lg:text-xl text-black-700 leading-relaxed">
            Kealthy is your go-to destination for fresh, wholesome, and
            nutritious products delivered straight to your doorstep. We believe
            that healthy living should be effortless and accessible, which is
            why we curate a wide range of high-quality, natural, and organic
            products to support your wellness journey. At Kealthy, we are more
            than just a brand—we are a movement towards a healthier, happier
            lifestyle. Your well-being is our priority, and we strive to make
            clean eating and mindful nutrition easier than ever. Join us in our
            journey towards better health, better choices, and a better life
            because at Kealthy, your well-being is our priority.
            <br />
            <br />
            <strong>Kealthy – Eat Well, Live Well.</strong>
            <br />
            🌿 <strong>Purity & Transparency</strong> – Ingredients sourced from
            certified, eco-conscious farmers.
            <br />
            🌍 <strong>Sustainability & Responsibility</strong> – Ethical
            sourcing, eco-friendly packaging, and reducing environmental impact.
            <br />
            💡 <strong>Innovation & Excellence</strong> – Blending science,
            nutrition, and taste.
          </p>
        </motion.div>

        {/* Desktop Image: Visible on medium (md) and larger screens only */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:flex w-full lg:w-1/2 justify-center"
        >
          <HeroSection />
        </motion.div>
      </section>

      <section
        id="aboutus"
        className="scroll-mt-24 bg-white text-black py-10 px-6 md:px-12 lg:px-20"
      >
        {/* Mobile Layout: Visible on screens below "lg" */}
        <div className="lg:hidden flex flex-col items-center gap-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="bg-black text-white px-6 py-3 rounded-md inline-block text-xl md:text-2xl lg:text-3xl font-bold transition-transform duration-700 ease-in-out hover:scale-105"
            >
              About Us / The Kealthy Way
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Faboutus.webp?alt=media&token=451df978-1ce9-471e-a7ab-5e26e27141a3"
              alt="Culinary Innovation"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-base md:text-lg lg:text-xl text-black-700 transition-opacity duration-500 ease-in-out hover:opacity-80 py-6 text-justify"
          >
            At Kealthy, we believe that the foundation of a happy life is good
            health, and the foundation of good health is good food. That's why
            we are committed to bringing you the very best in nutritious,
            wholesome, and delicious food products. Founded on the principles of
            purity and simplicity, we strive to help you maintain a balanced
            diet without compromising on taste. We understand that maintaining a
            healthy diet can be challenging in today’s fast-paced world. That’s
            why we offer door-to-door delivery, bringing nutritious choices
            straight to your home with just a few taps. Whether you’re looking
            for a quick, nourishing meal or stocking up on healthy essentials,
            Kealthy makes it easier than ever to stay on track with your
            wellness goals.
          </motion.p>
        </div>

        {/* Desktop Layout: Visible on "lg" and above */}
        <div className="hidden lg:flex max-w-7xl mx-auto flex-row-reverse items-center gap-10">
          {/* Text Content (Heading & Paragraph) */}
          <motion.div className="w-1/2 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="bg-black text-white px-6 py-3 rounded-md inline-block text-xl md:text-2xl lg:text-3xl font-bold transition-transform duration-700 ease-in-out hover:scale-105"
            >
              About Us / The Kealthy Way
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-base md:text-lg lg:text-xl text-black-700 transition-opacity duration-500 ease-in-out hover:opacity-80 py-6 text-justify"
            >
              At Kealthy, we believe that the foundation of a happy life is good
              health, and the foundation of good health is good food. That's why
              we are committed to bringing you the very best in nutritious,
              wholesome, and delicious food products. Founded on the principles
              of purity and simplicity, we strive to help you maintain a
              balanced diet without compromising on taste. We understand that
              maintaining a healthy diet can be challenging in today’s
              fast-paced world. That’s why we offer door-to-door delivery,
              bringing nutritious choices straight to your home with just a few
              taps. Whether you’re looking for a quick, nourishing meal or
              stocking up on healthy essentials, Kealthy makes it easier than
              ever to stay on track with your wellness goals.
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-1/2 flex justify-center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Faboutus.webp?alt=media&token=451df978-1ce9-471e-a7ab-5e26e27141a3"
              alt="Culinary Innovation"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      <section
        id="whoweare"
        ref={whoWeAreRef}
        className="bg-white text-black py-14 px-6 md:px-12 lg:px-20"
      >
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-3xl md:text-4xl font-bold text-[#263848] flex items-center justify-center mt-0"
        >
          <span className="border-t-2 border-[#027d4f] w-16 mr-2"></span>
          WHO WE ARE
          <span className="border-t-2 border-[#027d4f] w-16 ml-2"></span>
        </motion.h2>

        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-10 mb-0 py-10">
          {/* Left Side - Tabs (Responsive) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/3 space-y-6 text-lg text-center lg:text-left"
          >
            {Object.keys(content).map((key) => (
              <div
                key={key}
                className={`cursor-pointer py-3 px-4 border-b transition duration-300 ${
                  activeTab === key
                    ? "text-[#027d4f] font-bold bg-gray-100 rounded-md"
                    : "text-black"
                }`}
                onClick={() => handleTabClick(key)}
              >
                {content[key].title} {activeTab === key && <span>→</span>}
              </div>
            ))}
          </motion.div>

          {/* Right Side - Content (Responsive & Stacked) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:w-2/3 flex flex-col md:flex-row items-center gap-6 text-center lg:text-left"
          >
            {Array.isArray(content[activeTab].text) ? (
              <ul className="list-disc list-outside pl-5 space-y-2 text-base md:text-lg text-black-700 md:w-3/5 text-justify lg:text-justify">
                {content[activeTab].text.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-base md:text-lg text-black-700 md:w-3/5 text-justify lg:text-justify">
                {content[activeTab].text.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            )}

            {/* Image */}
            <div className="md:w-2/5 w-full flex justify-center">
              <img
                src={content[activeTab].image}
                alt={content[activeTab].title}
                className="rounded-lg w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-cover shadow-md"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
