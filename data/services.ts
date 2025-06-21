
import React from 'react';
import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'pentest',
    title: 'Penetration Testing',
    icon: "fas fa-shield-virus text-4xl text-accent-blue mb-4",
    description: 'Comprehensive security assessments to identify and mitigate vulnerabilities in your systems and applications.',
    linkText: 'Get a Quote',
    linkHref: '#contact',
  },
  {
    id: 'securecode',
    title: 'Secure Coding Workshops',
    icon: "fas fa-chalkboard-teacher text-4xl text-accent-green mb-4",
    description: 'Training sessions focused on secure development practices to empower your team.',
    linkText: 'Learn More',
    linkHref: '#contact',
  },
  {
    id: 'freelance',
    title: 'Freelance Development',
    icon: "fas fa-laptop-code text-4xl text-accent-purple mb-4",
    description: 'Custom software development services, focusing on security and performance.',
    linkText: 'Discuss Project',
    linkHref: '#contact',
  },
  {
    id: 'consulting',
    title: 'Security Consulting',
    icon: "fas fa-user-shield text-4xl text-yellow-400 mb-4",
    description: 'Expert advice and strategy to enhance your organization\'s cybersecurity posture.',
    linkText: 'Inquire Now',
    linkHref: '#contact',
  },
];
