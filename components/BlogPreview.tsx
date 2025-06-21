
import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import { BlogPostItem } from '../types';

const BlogCard: React.FC<{ post: BlogPostItem }> = ({ post }) => {
  return (
    <div className="bg-base-light-dark rounded-lg shadow-xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-accent-green">
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <span className="mr-2"><i className="fas fa-calendar-alt mr-1 text-accent-green"></i>{post.date}</span>
          <span><i className="fas fa-tag mr-1 text-accent-green"></i>{post.category}</span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-headings font-semibold text-accent-green hover:text-white transition-colors mb-2 hover-neon-glow-green">{post.title}</h3>
        </Link>
        <p className="text-sm text-text-off-white font-body mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="font-semibold text-accent-green hover:text-white transition-colors group-hover:underline hover-neon-glow-green"
        >
          Read More <i className="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>
    </div>
  );
};

const BlogPreview: React.FC = () => {
  const latestPosts = BLOG_POSTS_DATA.slice(0, 3); // Show 3 latest posts

  return (
    <section id="blog-preview" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-green mb-12 transition-all duration-300 hover-neon-glow-green">
          Latest Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {BLOG_POSTS_DATA.length > 3 && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="bg-accent-green text-base-dark font-headings font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-80 hover:shadow-glow-green transition-all duration-300 transform hover:scale-105 hover-neon-glow-green"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;