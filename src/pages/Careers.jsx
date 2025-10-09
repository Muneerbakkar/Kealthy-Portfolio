/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useEffect } from "react";
import SEO from "../components/SEO";

const Careers = () => {
  // Scroll to the top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO title="Kealthy Careers" description="This is a Career Page" />

      <section
        id="careers"
        className="bg-white text-black py-10 px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center mt-16 mb-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center lg:gap-12 gap-6">
          {/* Left Side - Image (Appears Below on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fcareers_img.avif?alt=media&token=aea15179-8894-4363-b214-9128fb98c25a"
              alt="Career Opportunities"
              className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl h-auto object-cover rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Right Side - Text Content (Appears Above on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="bg-black text-white px-6 py-3 rounded-md inline-block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-transform duration-700 ease-in-out hover:scale-105"
            >
              Careers at Kealthy
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-black-700 leading-relaxed transition-opacity duration-500 ease-in-out hover:opacity-80 max-w-3xl mx-auto lg:mx-0"
            >
              "At Kealthy, we believe that a fulfilling career starts with
              passion, purpose, and a commitment to well-being. We are dedicated
              in creating a dynamic work environment where innovation,
              collaboration, and personal growth thrive. By joining Kealthy, you
              become part of a mission-driven team that is redefines healthy
              living through nutritious, wholesome, and sustainable food
              solutions. If you're passionate about making a difference and want
              to grow in a purpose-driven company, explore career opportunities
              with us today."
            </motion.p>

            {/* Email Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl text-black-700 transition-opacity duration-500 ease-in-out hover:opacity-80 max-w-3xl mx-auto lg:mx-0"
            >
              <p>
                📩 To apply for jobs at Kealthy, kindly email:{" "}
                <a
                  href="mailto:careers@kealthy.com"
                  className="text-[#263848] font-semibold hover:underline"
                >
                  careers@kealthy.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Careers;
