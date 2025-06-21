
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import { BlogPostItem } from '../types';

const POSTS_PER_PAGE = 15;

const BlogArchivePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

  const categories = useMemo(() => {
    const allCategories = BLOG_POSTS_DATA.map(post => post.category);
    return Array.from(new Set(allCategories));
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(post => selectedCategory ? post.category === selectedCategory : true)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, selectedCategory]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPostsToDisplay = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    // Optional: Update URL query parameter for page
    // navigate(`/blog?page=${pageNumber}`); // If using useNavigate
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white">
      <div className="container mx-auto">
        <header className="text-center mb-16 pt-10">
          <h1 className="text-5xl font-headings font-bold text-accent-blue transition-all duration-300 hover-neon-glow-blue">Blog Archive</h1>
          <p className="text-xl text-gray-400 mt-2">Explore articles on cybersecurity, programming, and tech.</p>
        </header>

        {/* Filters and Search */}
        <div className="mb-12 grid md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-accent-green mb-1 font-headings">Search Articles</label>
            <input
              type="text"
              id="search"
              placeholder="Enter keywords..."
              className="w-full bg-base-light-dark border border-gray-700 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-green focus:border-accent-green"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              aria-label="Search blog articles"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-accent-green mb-1 font-headings">Filter by Category</label>
            <select
              id="category"
              className="w-full bg-base-light-dark border border-gray-700 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-green focus:border-accent-green"
              value={selectedCategory || ''}
              onChange={(e) => { setSelectedCategory(e.target.value || null); setCurrentPage(1); }}
              aria-label="Filter articles by category"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Post List */}
        {currentPostsToDisplay.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
            {currentPostsToDisplay.map((post: BlogPostItem) => (
              <article key={post.id} className="bg-base-light-dark p-6 rounded-lg shadow-lg hover:shadow-glow-green transition-shadow duration-300 flex flex-col md:flex-row items-start gap-6 border border-gray-700 hover:border-accent-green">
                <Link to={`/blog/${post.slug}`} className="block md:w-1/4 flex-shrink-0" aria-label={`Read more about ${post.title}`}>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-40 md:h-full object-cover rounded-md mb-4 md:mb-0" loading="lazy"/>
                </Link>
                <div className="flex-grow">
                  <div className="text-xs text-gray-400 mb-2">
                    <span className="mr-3"><i className="fas fa-calendar-alt mr-1 text-accent-green"></i>{post.date}</span>
                    <span><i className="fas fa-tag mr-1 text-accent-green"></i>{post.category}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                    <h2 className="text-2xl font-headings font-semibold text-accent-green hover:text-white transition-colors mb-2 hover-neon-glow-green">{post.title}</h2>
                  </Link>
                  <p className="text-sm text-text-off-white font-body mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="font-semibold text-accent-green hover:text-white transition-colors group hover-neon-glow-green" aria-label={`Read more about ${post.title}`}>
                    Read More <i className="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-400 py-10">No articles found matching your criteria.</p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav aria-label="Blog post pagination" className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-base-light-dark text-accent-blue rounded-md hover:bg-accent-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Go to previous page"
            >
              <i className="fas fa-chevron-left mr-1"></i> Prev
            </button>

            {pageNumbers.map(number => {
              if (number === currentPage || 
                  number <= 2 || number >= totalPages -1 || 
                  (number >= currentPage - 1 && number <= currentPage + 1)
              ) {
                const buttonElement = (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === number 
                        ? 'bg-accent-blue text-base-dark font-bold' 
                        : 'bg-base-light-dark text-accent-blue hover:bg-accent-blue/20'
                    }`}
                    aria-current={currentPage === number ? "page" : undefined}
                    aria-label={`Go to page ${number}`}
                  >
                    {number}
                  </button>
                );

                const showEllipsisAfter = 
                  (currentPage > 3 && number === 2 && currentPage > 2 + 1 ) || 
                  (currentPage < totalPages - 2 && number === currentPage + 1 && number < totalPages - 1 && currentPage + 1 < totalPages - 1);

                if (showEllipsisAfter) {
                  return (
                    <React.Fragment key={`item-${number}`}>
                      {buttonElement}
                      <span key={`ellipsis-after-${number}`} className="text-gray-500 px-2">...</span>
                    </React.Fragment>
                  );
                }
                return buttonElement;
              }
              return null;
            })}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-base-light-dark text-accent-blue rounded-md hover:bg-accent-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Go to next page"
            >
              Next <i className="fas fa-chevron-right ml-1"></i>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default BlogArchivePage;