import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore Database
import SEO from "../components/SEO";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  // Function to format blog content with paragraphs, bullet points, and numbered lists
  const renderContent = (content) => {
    if (!content) return null;

    return content.split("\n").map((line, index) => {
      // Bullet points
      if (line.startsWith("* ")) {
        return (
          <li
            key={index}
            className="list-disc ml-6 text-base sm:text-lg text-gray-700 leading-relaxed"
          >
            {line.substring(2)}
          </li>
        );
      }

      // Numbered lists (e.g., 1. First item)
      // if (/^\d+\./.test(line)) {
      //   return (
      //     <li
      //       key={index}
      //       className="list-decimal ml-6 text-base sm:text-lg text-gray-700 leading-relaxed"
      //     >
      //       {line}
      //     </li>
      //   );
      // }

      // Regular paragraph
      return (
        <p
          key={index}
          className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify mb-4"
        >
          {line}
        </p>
      );
    });
  };

  if (!blog) {
    return (
      <p className="text-center text-lg font-semibold py-10">Loading...</p>
    );
  }

  return (
    <>
      <SEO title="Kealthy Blog" description="This is a Blog Page" />

      <div className="bg-white text-black">
        {/* ✅ Blog Header Section - Enlarged Image */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[450px] flex items-center justify-center overflow-hidden">
          {blog.imageUrls?.[0] ? (
            <img
              src={blog.imageUrls[0]}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "/images/placeholder.png";
              }}
            />
          ) : (
            <img
              src="/images/placeholder.png"
              alt="Placeholder"
              className="w-full h-full object-cover rounded-lg"
            />
          )}

          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Centered Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 text-white text-center z-10 mt-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              {blog.title}
            </h1>
            <p className="text-sm sm:text-lg mt-2">
              {blog.createdAt?.toDate().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* ✅ Blog Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* ✅ Render the blog content dynamically with smaller text */}
          <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
            {renderContent(blog.content)}
          </div>

          <div className="border-t border-gray-300 my-6"></div>

          <p className="text-gray-500 italic text-sm sm:text-base mb-4">
            By{" "}
            <span className="font-semibold text-[#263848]">
              Kealthy Editorial
            </span>
          </p>

          {/* ✅ Back to Blog Button */}
          <div className="flex justify-center sm:justify-start mt-10">
            <Link
              to="/blog"
              className="bg-black text-white px-5 py-2 rounded-md text-sm sm:text-base hover:bg-[#1b2a38] transition duration-300"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
