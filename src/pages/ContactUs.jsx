/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const ContactUs = () => {
  // Scroll to the top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {/* Add SEO component at the top */}
      <SEO title="Contact Us - Kealthy" description="This is a Contact Page" />

      <section
        id="contactus"
        className="bg-white text-black py-12 px-6 md:px-16 lg:px-24 mt-10"
      >
        {/* Container */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12">
          {/* Left Side - Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black">
              Contact Us
            </h2>

            <div className="space-y-4 text-lg">
              <p className="flex items-center space-x-3 ml-1">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Ftelephone.png?alt=media&token=099c5c70-f581-4bab-9b28-2c1a8c7a9a2f"
                  alt="Phone Icon"
                  className="w-6 h-6"
                />
                <span>+91 7736765198</span>
              </p>

              <p className="flex items-center space-x-3 ml-1">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Femail.png?alt=media&token=6ccaa738-086b-49a5-98ee-3c8c3ec02e89"
                  alt="Email Icon"
                  className="w-6 h-6"
                />
                <span>cotoloreenterprisellp@gmail.com, info@cotolore.com</span>
              </p>

              <p className="flex items-start space-x-3">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2Fhome.png?alt=media&token=aeb7fb4e-b3ad-491c-91a9-2ef220d27529"
                  alt="Address Icon"
                  className="w-8 h-8 mt-1"
                />
                <span>
                  15/293-C Muriyankara - Pinarmunda Road Peringala, Ernakulam -
                  683565
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-2xl font-bold text-black mb-4">
              Let us get in touch with you
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Comments"
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-black"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className={`w-full md:w-auto bg-black text-white px-6 py-2 rounded-md transition ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-black"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>

            {responseMessage && (
              <p
                className={`mt-4 ${
                  responseMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {responseMessage}
              </p>
            )}
          </motion.div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-20 w-full h-64 md:h-80 lg:h-96">
          <iframe
            title="Cotolore Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.6740043006544!2d76.38158247479379!3d10.010110890095776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b52139af969%3A0x4c62473d70e72564!2sCotolore%20Enterprises%20LLP!5e1!3m2!1sen!2sin!4v1735299711130!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-lg shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
