
import React from 'react';
import { SERVICES_DATA } from '../constants';
import { ServiceItem } from '../types';

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="bg-base-light-dark p-8 rounded-lg shadow-xl text-center transform hover:-translate-y-2 transition-transform duration-300 border border-gray-700 hover:border-accent-green hover:shadow-glow-green">
      <i className={service.icon} aria-hidden="true"></i>
      <h3 className="text-2xl font-headings font-semibold text-white my-4 hover-neon-glow-green transition-all duration-200">{service.title}</h3>
      <p className="text-text-off-white font-body text-sm mb-6 leading-relaxed">{service.description}</p>
      {service.linkText && service.linkHref && (
        <button
          onClick={scrollToContact}
          className="text-accent-green font-semibold hover:text-white border border-accent-green hover:bg-accent-green hover:bg-opacity-20 py-2 px-6 rounded transition-all duration-300 hover-neon-glow-green"
        >
          {service.linkText}
        </button>
      )}
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-green mb-12 transition-all duration-300 hover-neon-glow-green">
          What I Offer
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;