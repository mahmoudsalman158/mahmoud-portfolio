
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../constants';
import TerminalAdviceBlock from '../components/TerminalAdviceBlock'; // Import the new component

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS_DATA.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="bg-transparent min-h-screen flex flex-col items-center justify-center py-24 px-4 text-text-off-white">
        <h1 className="text-4xl font-headings text-accent-red mb-4">Post Not Found</h1>
        <p className="text-lg mb-8">Sorry, the post you are looking for does not exist.</p>
        <Link to="/blog" className="bg-accent-blue text-base-dark font-semibold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors hover-neon-glow-blue">
          Back to Blog
        </Link>
      </div>
    );
  }

  const currentPostIndex = BLOG_POSTS_DATA.findIndex(p => p.slug === slug);
  const previousPost = currentPostIndex > 0 ? BLOG_POSTS_DATA[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < BLOG_POSTS_DATA.length - 1 ? BLOG_POSTS_DATA[currentPostIndex + 1] : null;


  return (
    <div className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white">
      <div className="container mx-auto max-w-3xl">
        <header className="mb-12 pt-10">
          <Link to="/blog" className="text-accent-blue hover:underline mb-6 block font-body hover-neon-glow-blue transition-all duration-200">
            <i className="fas fa-arrow-left mr-2"></i>Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-headings font-bold text-accent-green mb-4 transition-all duration-300 hover-neon-glow-green">{post.title}</h1>
          <div className="text-sm text-gray-400 flex items-center space-x-4">
            <span><i className="fas fa-calendar-alt mr-1 text-accent-purple"></i>{post.date}</span>
            <span><i className="fas fa-tag mr-1 text-accent-purple"></i>{post.category}</span>
            {post.author && <span><i className="fas fa-user mr-1 text-accent-purple"></i>By {post.author}</span>}
          </div>
        </header>
        
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" loading="lazy"/>

        <article className="prose prose-invert prose-lg lg:prose-xl max-w-none font-body leading-relaxed blog-content">
          {/* Using dangerouslySetInnerHTML for placeholder HTML content. Sanitize if from user input. */}
          <div dangerouslySetInnerHTML={{ __html: post.content || '<p>Content not available.</p>' }} />
        </article>

        {/* Render the TerminalAdviceBlock component here */}
        <TerminalAdviceBlock />

        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-2xl font-headings text-accent-blue mb-4 hover-neon-glow-blue transition-all duration-200">Share this post:</h3>
          <div className="flex space-x-4">
            {/* Replace with actual sharing links */}
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue text-2xl hover-neon-glow-blue transition-all duration-200" aria-label="Share on Twitter"><i className="fab fa-twitter"></i></a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue text-2xl hover-neon-glow-blue transition-all duration-200" aria-label="Share on LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue text-2xl hover-neon-glow-blue transition-all duration-200" aria-label="Share on Facebook"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        
        {/* Simple "Previous/Next Post" navigation - can be enhanced */}
        <div className="mt-12 flex justify-between items-center border-t border-gray-700 pt-8">
            {previousPost ? 
              <Link to={`/blog/${previousPost.slug}`} className="text-accent-purple hover:underline hover-neon-glow-purple transition-all duration-200">
                <i className="fas fa-chevron-left mr-2"></i> Previous Post
              </Link>
              : <div></div> // Empty div for spacing if no previous post
            }
            {nextPost &&
              <Link to={`/blog/${nextPost.slug}`} className="text-accent-purple hover:underline ml-auto hover-neon-glow-purple transition-all duration-200">
                Next Post <i className="fas fa-chevron-right ml-2"></i>
              </Link>
            }
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;