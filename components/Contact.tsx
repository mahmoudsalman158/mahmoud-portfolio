
import React, { useState } from 'react';
import { SOCIAL_LINKS, SITE_NAME } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xrbkewzq', { // Updated Formspree ID
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Your message has been sent successfully! Thank you.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        const responseData = await response.json();
        if (responseData && responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          setSubmitMessage(responseData.errors.map((error: any) => error.message || 'Unknown error').join(", "));
        } else if (responseData && responseData.error) {
           setSubmitMessage(responseData.error);
        }
        else {
          setSubmitMessage("Oops! There was a problem submitting your form. Please try again.");
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitMessage("Oops! There was a problem submitting your form. Please check your network connection and try again.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Hide message after a few seconds
      setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage('');
      }, 7000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-blue mb-12 transition-all duration-300 hover-neon-glow-blue">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-headings text-white mb-4 hover-neon-glow-blue transition-all duration-200">Contact Details</h3>
            <p className="text-text-off-white font-body mb-6">
              Feel free to reach out for collaborations, projects, or just a chat about tech and security!
            </p>
            <ul className="space-y-4 font-body text-text-off-white">
              <li className="flex items-center">
                <i className="fas fa-envelope text-accent-blue mr-3 text-xl"></i>
                <a href="mailto:mahmoudsalman796@gmail.com" className="hover:text-accent-blue transition-colors hover-neon-glow-blue">mahmoudsalman796@gmail.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-accent-blue mr-3 text-xl"></i>
                <a href="tel:+201094962170" className="hover:text-accent-blue transition-colors hover-neon-glow-blue">+201094962170</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-accent-blue mr-3 text-xl"></i>
                <span>Cairo, Egypt (Remote)</span>
              </li>
            </ul>
            <div className="mt-8 flex space-x-5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-gray-400 hover:text-accent-blue text-2xl transition-colors duration-300 transform hover:scale-125 hover-neon-glow-blue"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            {/* Form submission status messages */}
            {submitMessage && (
              <div 
                className={`p-4 mb-4 rounded-md text-center font-semibold ${
                  submitStatus === 'success' ? 'bg-accent-green/20 border border-accent-green text-accent-green' : 
                  submitStatus === 'error' ? 'bg-accent-red/20 border border-accent-red text-accent-red' : ''
                }`}
                role="alert"
              >
                {submitStatus === 'success' && <i className="fas fa-check-circle mr-2"></i>}
                {submitStatus === 'error' && <i className="fas fa-exclamation-triangle mr-2"></i>}
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-accent-blue font-headings">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-off-white focus:outline-none focus:ring-accent-blue focus:border-accent-blue"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-accent-blue font-headings">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-off-white focus:outline-none focus:ring-accent-blue focus:border-accent-blue"/>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-accent-blue font-headings">Subject</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-off-white focus:outline-none focus:ring-accent-blue focus:border-accent-blue"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-accent-blue font-headings">Message</label>
                <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-off-white focus:outline-none focus:ring-accent-blue focus:border-accent-blue"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-green text-base-dark font-headings font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover-neon-glow-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
              {/* Removed the paragraph: <p className="text-xs text-center text-gray-500 mt-2">This form is configured to send messages to your email.</p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;