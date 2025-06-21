
import React from 'react';
import { SkillItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  { id: 'go', name: 'Go', icon: "fab fa-golang text-3xl text-accent-blue", proficiency: 85, category: 'Programming' },
  { id: 'python', name: 'Python', icon: "fab fa-python text-3xl text-accent-green", proficiency: 90, category: 'Programming' },
  { id: 'js', name: 'JavaScript', icon: "fab fa-js text-3xl text-yellow-400", proficiency: 80, category: 'Programming' },
  { id: 'cpp', name: 'C/C++', icon: "fas fa-file-code text-3xl text-accent-purple", proficiency: 70, category: 'Programming' },
  { id: 'react', name: 'React', icon: "fab fa-react text-3xl text-sky-400", proficiency: 75, category: 'Web' },
  { id: 'nodejs', name: 'Node.js', icon: "fab fa-node-js text-3xl text-green-500", proficiency: 70, category: 'Web' },
  { id: 'pentest', name: 'Penetration Testing', icon: "fas fa-shield-virus text-3xl text-red-500", proficiency: 90, category: 'Security' },
  { id: 'owasp', name: 'OWASP Top 10', icon: "fas fa-list-check text-3xl text-orange-500", proficiency: 85, category: 'Security' },
  { id: 'nmap', name: 'Nmap', icon: "fas fa-network-wired text-3xl text-blue-500", proficiency: 80, category: 'Tools' },
  { id: 'burp', name: 'Burp Suite', icon: "fas fa-bug text-3xl text-amber-500", proficiency: 75, category: 'Tools' },
  { id: 'git', name: 'Git/GitHub', icon: "fab fa-git-alt text-3xl text-orange-600", proficiency: 90, category: 'Tools' },
  { id: 'docker', name: 'Docker', icon: "fab fa-docker text-3xl text-blue-600", proficiency: 70, category: 'Tools' },
];