"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaSearch, FaHeart } from "react-icons/fa"
import PropTypes from "prop-types"

const BlogListView = ({ blogs, onBack, onLike }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const blogsPerPage = 5
  const [filteredBlogs, setFilteredBlogs] = useState([])

  // Filter options
  const filterOptions = [
    { value: "all", label: "All Time" },
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
  ]

  // Reset to first page when search term or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, timeFilter])

  // Filter blogs
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      setFilteredBlogs([])
      return
    }

    let filtered = [...blogs]

    // Apply time filter
    filtered = filterBlogsByTime(filtered, timeFilter)

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (blog) =>
          (blog.title && blog.title.toLowerCase().includes(searchLower)) ||
          (blog.content && blog.content.toLowerCase().includes(searchLower)) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    setFilteredBlogs(filtered)
  }, [blogs, timeFilter, searchTerm])

  // Helper function to safely convert Firebase timestamp to Date
  const getDateFromTimestamp = (timestamp) => {
    if (!timestamp) return null

    try {
      if (timestamp.toDate && typeof timestamp.toDate === "function") {
        return timestamp.toDate() // Firestore Timestamp
      }
      if (timestamp instanceof Date) {
        return timestamp
      }
      if (timestamp.seconds) {
        return new Date(timestamp.seconds * 1000) // Firestore Timestamp object
      }
      if (typeof timestamp === "number") {
        return new Date(timestamp)
      }
      if (typeof timestamp === "string") {
        const date = new Date(timestamp)
        return isNaN(date.getTime()) ? null : date
      }
      return null
    } catch (error) {
      console.error("Error parsing timestamp:", error)
      return null
    }
  }

  // Filter blogs based on time period
  const filterBlogsByTime = (blogs, timeFilter) => {
    if (timeFilter === "all") {
      return blogs
    }

    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return blogs.filter((blog) => {
      if (!blog.createdAt) return false

      const blogDate = getDateFromTimestamp(blog.createdAt)
      if (!blogDate || isNaN(blogDate.getTime())) return false

      switch (timeFilter) {
        case "lastWeek":
          return blogDate >= oneWeekAgo && blogDate <= now
        case "lastMonth":
          return blogDate >= oneMonthAgo && blogDate <= now
        default:
          return true
      }
    })
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const formatDate = (createdAt) => {
    const date = getDateFromTimestamp(createdAt)
    if (!date || isNaN(date.getTime())) return "Recent"

    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }

  const getFilterLabel = (filter) => {
    const option = filterOptions.find((opt) => opt.value === filter)
    return option ? option.label : "All Time"
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Grid View
          </button>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
            />
          </div>

          {/* Filter and Results Count */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[120px] bg-white"
              >
                <span className="text-sm font-medium text-gray-700">{getFilterLabel(timeFilter)}</span>
                <FaChevronDown
                  className={`w-3 h-3 text-gray-500 transition-transform ${showFilterDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {filterOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTimeFilter(option.value)
                        setShowFilterDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        index === 0 ? "rounded-t-lg" : ""
                      } ${index === filterOptions.length - 1 ? "rounded-b-lg" : ""} ${
                        timeFilter === option.value ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">{filteredBlogs.length} blogs found</div>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">No blogs found</p>
            <p className="text-gray-400 text-sm mb-4">
              {searchTerm ? "Try adjusting your search criteria." : "No blogs match the selected filter."}
            </p>
            {(searchTerm || timeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setTimeFilter("all")
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {/* Blog Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={blog.imageUrls?.[0] || "/images/placeholder.png"}
                      alt={blog.title}
                      className="w-32 h-32 object-cover"
                      onError={(e) => (e.target.src = "/images/placeholder.png")}
                    />
                    {/* Date Badge */}
                    <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded font-medium">
                      {formatDate(blog.createdAt)}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="flex-1 p-6">
                    <Link to={`/blog/${blog.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => onLike(blog.id)}
                      >
                        <FaHeart className={`w-4 h-4 ${blog.liked ? "text-red-500" : ""}`} />
                        <span className="text-sm">{blog.likes}</span>
                      </button>

                      <Link
                        to={`/blog/${blog.id}`}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredBlogs.length > 0 && (
          <div className="mt-12">
            {/* Results Info */}
            <div className="text-center text-sm text-gray-600 mb-6">
              Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} blogs
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaArrowLeft className="w-3 h-3 mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === "number" && goToPage(pageNum)}
                    disabled={pageNum === "..."}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : pageNum === "..."
                          ? "text-gray-400 cursor-default"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
                <FaArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dropdown Overlay */}
      {showFilterDropdown && <div className="fixed inset-0 z-10" onClick={() => setShowFilterDropdown(false)} />}
    </div>
  )
}
BlogListView.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      content: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      imageUrls: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.any,
      liked: PropTypes.bool,
      likes: PropTypes.number,
    })
  ),
  onBack: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
}

export default BlogListView

