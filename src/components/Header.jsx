/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector("header").offsetHeight; // Get Navbar Height
        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY; // Get Section Position
        window.scrollTo({
          top: sectionPosition - navbarHeight - 20, // Adjust for navbar height and extra spacing
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => scrollToSection(sectionId), 800);
    }
    setTimeout(() => setMenuOpen(false), 400);
  };

  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      setTimeout(() => scrollToSection(sectionId), 500);
    }
  }, [location]);

  const menuItems = [
    { name: "Home", section: "home" },
    { name: "About Us", section: "aboutus" },
    { name: "Who We Are", section: "whoweare" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white p-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="flex items-center space-x-3 ml-6 lg:ml-20">
        <Link to="/" onClick={(e) => handleNavigation(e, "home")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kealthy-90c55.appspot.com/o/Kealthy_web%2FKealthy_logo.png?alt=media&token=6d9d1fe1-0fa7-4938-947f-f7c4c5683e9f"
            alt="Kealthy Logo"
            className="h-15 w-20 object-cover cursor-pointer"
          />
        </Link>
      </div>

      <nav className="hidden lg:flex">
        <ul className="flex space-x-6 mr-20">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <Link to={item.path} className="text-black font-semibold">
                  {item.name}
                </Link>
              ) : (
                <a
                  href={`#${item.section}`}
                  className="text-black cursor-pointer font-semibold"
                  onClick={(e) => handleNavigation(e, item.section)}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:hidden mr-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black focus:outline-none"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-6 bg-gray-800 text-white shadow-lg rounded-lg py-4 px-5 w-64 flex flex-col space-y-3 lg:hidden">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className="py-2 text-lg font-semibold cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className="py-2 text-lg font-semibold cursor-pointer"
                  onClick={(e) => {
                    handleNavigation(e, item.section);
                    setTimeout(() => setMenuOpen(false), 500);
                  }}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
