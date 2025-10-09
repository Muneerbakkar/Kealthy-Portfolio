
import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { Link } from "react-router-dom"
import SEO from "../components/SEO"
import BlogListView from "./BlogListVies"

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [showListView, setShowListView] = useState(false)
  const [displayedBlogs, setDisplayedBlogs] = useState([])
  const [blogsToShow, setBlogsToShow] = useState(3) // Initially show 6 blogs
  const blogsPerLoad = 3 // Load 3 more blogs each time

  // Scroll to the top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Fetch blogs from Firestore, ordered by date (newest first)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          liked: false, // Add liked state for each blog
          likes: Math.floor(Math.random() * 50), // Random initial likes
        }))
        setBlogs(blogData)
        setDisplayedBlogs(blogData.slice(0, blogsToShow))
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      }
    }
    fetchBlogs()
  }, [])

  // Update displayed blogs when blogsToShow changes
  useEffect(() => {
    setDisplayedBlogs(blogs.slice(0, blogsToShow))
  }, [blogs, blogsToShow])

  const handleSeeMore = () => {
    setBlogsToShow((prev) => prev + blogsPerLoad)
  }

  const handleViewAllBlogs = () => {
    setShowListView(true)
  }

  const handleBackToGrid = () => {
    setShowListView(false)
  }

  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              liked: !blog.liked,
              likes: blog.liked ? blog.likes - 1 : blog.likes + 1,
            }
          : blog,
      ),
    )
  }

  if (showListView) {
    return <BlogListView blogs={blogs} onBack={handleBackToGrid} onLike={handleLike} />
  }

  return (
    <>
      <SEO title="Kealthy Blog" description="This is a Blog Page" />
      <section className="bg-white text-black pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <span className="border-t-2 border-[#027d4f] w-8 mr-2"></span>
            KEALTHY BLOG
            <span className="border-t-2 border-[#027d4f] w-8 ml-2"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={blog.imageUrls?.[0] || "/images/placeholder.png"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "/images/placeholder.png")}
                />
                <div className="p-4">
                  <p className="text-gray-500 text-sm">
                    {blog.createdAt?.toDate().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-700 mt-2 line-clamp-3">{blog.content}</p>

                  {/* Like Button */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                      onClick={() => handleLike(blog.id)}
                    >
                      <svg
                        className={`w-5 h-5 ${blog.liked ? "fill-red-500 text-red-500" : "fill-none"}`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-sm">{blog.likes}</span>
                    </button>

                    <Link to={`/blog/${blog.id}`} className="text-[#027d4f] font-semibold hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {/* {blogsToShow < blogs.length && (
              <button
                onClick={handleSeeMore}
                className="px-6 py-3 bg-[#027d4f] text-white rounded-lg hover:bg-[#025a3a] transition-colors font-medium"
              >
                See More ({blogs.length - blogsToShow} remaining)
              </button>
            )} */}

            <button
              onClick={handleViewAllBlogs}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              View All Blogs
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog