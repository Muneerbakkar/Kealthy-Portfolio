/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, XIcon, MessageCircle  } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Smooth Scroll Function
  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // Handle Newsletter Subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log(
        "🛰️ fetch to",
        `${API_BASE}/api/subscribers`,
        "returned",
        res.status,
        res.statusText
      );

      const text = await res.text();
      console.log("📝 raw response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: res.ok, message: text };
      }

      setIsSuccess(data.success);
      setMessage(
        data.message || (data.success ? "Subscribed!" : "Failed to subscribe.")
      );

      if (data.success) {
        setEmail("");
      }
    } catch (error) {
      console.error("🔴 Subscription fetch error:", error);
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Company Info and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Kealthy</h2>
            <p className="text-sm max-w-md">
              Kealthy is a premium, eco-friendly brand that delivers fresh,
              organic meals with modern, sustainable solutions for healthy
              living.
            </p>
            <p className="text-sm mt-2">
              &copy; 2024 Kealthy. All Rights Reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row">
            <div className="mb-4 sm:mb-0 sm:mr-8">
              <h3 className="text-lg font-semibold mb-2">Company</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#aboutus"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => handleSmoothScroll(e, "aboutus")}
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/careers" className="hover:underline cursor-pointer">
                    Careers
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <ul>
                <li className="mb-1">
                  <a href="/contact" className="hover:underline cursor-pointer">
                    Contact Us
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-[#027d4f]" />

        {/* Bottom Section: Social Media and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex mb-4 md:mb-0">
            {[
              {
                Icon: Facebook,
                url: "https://www.facebook.com/profile.php?id=61571096468965&mibextid=ZbWKwL",
                label: "Facebook",
              },
              {
                Icon: XIcon,
                url: "https://x.com/Kealthy_life",
                label: "Twitter",
              },
              {
                Icon: Instagram,
                url: "https://www.instagram.com/kealthy.life/",
                label: "Instagram",
              },
              {
                Icon: Linkedin,
                url: "https://www.linkedin.com/in/yourprofile",
                label: "LinkedIn",
              },
              // {
              //   Icon: Youtube,
              //   url: "https://www.youtube.com/channel/yourchannel",
              //   label: "YouTube",
              // },
              {
                Icon: MessageCircle,
                url: "https://chat.whatsapp.com/BxNSEDXO6jfKmUl0EuZ6qt?mode=r_t", // Replace with your WhatsApp number
                label: "WhatsApp",
              },
            ].map(({ Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white hover:text-[#027d4f] mx-2 transition-colors duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="w-full sm:w-auto">
            <p className="text-sm mb-2 text-center md:text-right">
              Subscribe to our newsletter
            </p>
            <form
              className="flex flex-col sm:flex-row justify-center md:justify-end"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 w-full sm:w-auto text-gray-800 
                           rounded-lg sm:rounded-none md:rounded-l-md 
                           focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`mt-2 sm:mt-0 bg-[#027d4f] text-white p-2 
                           rounded-lg sm:rounded-none md:rounded-r-md transition-colors duration-300 
                           ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`mt-2 text-sm text-center md:text-right ${
                  isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
