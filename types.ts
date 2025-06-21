import React from 'react';

export interface NavLinkItem {
  name: string;
  href: string; // Can be an ID for scrolling or a path for routing
  isPageLink?: boolean; // True if it links to a different page/route
}

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  icon: string; // Changed from React.ReactNode to string
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string; // Already string
  proficiency: number; // 0-100
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  importance?: string;         // New
  benefits?: string;           // New
  developmentDetails?: string; // New
}

export interface ServiceItem {
  id:string;
  title: string;
  icon: string; // Already string
  description: string;
  linkText?: string;
  linkHref?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string; // For URL generation
  title: string;
  imageUrl: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string; // Full content for single post page
  author?: string; // Optional author
}

export interface IconProps {
  className?: string;
}

// Mythology Section Types
export interface MythResource {
  name: string;
  url: string;
  icon?: string; // Already string
}

export interface MythStep {
  id: string;
  title: string; // e.g., "Reconnaissance of the Hydra’s Heads"
  codeSnippet: string; // e.g., "nmap -sV target.com"
  explanation?: string; // Optional brief explanation of the step
}

export interface MythItem {
  id: string;
  slug: string;
  title: string; // e.g., "The Hydra of Injection"
  icon?: string; // Already string // Thematic icon for the myth
  narrative: string; // Story introduction
  vulnerabilityAnalogy: string; // Real-world vulnerability mapping
  steps: MythStep[];
  resources: MythResource[];
}

// Penetration Testing Methodology Types
export interface TocItem {
  id: string;
  title: string;
  level: number; // For indentation in TOC
}

export type InteractiveElementType = 
  | 'text-input' 
  | 'tabs' 
  | 'json-viewer' 
  | 'bar-chart' 
  | 'tag-input' 
  | 'dropdown-selector'
  | 'progress-bar-simulation'
  | 'file-list'
  | 'parameter-form'
  | 'map-visualization'
  | 'info-tabs';

export interface InteractiveElementData {
  type: InteractiveElementType;
  initialValue?: any;
  options?: any[]; // For dropdowns, tabs, etc.
  placeholder?: string;
  label?: string;
}

export interface MethodologyCommand {
  language: string;
  code: string | ((params: any) => string);
  params?: Record<string, any>;
  showCopyButton?: boolean;
}

export interface MethodologySubStepItem {
  id: string;
  title: string;
  description: React.ReactNode;
  commands?: MethodologyCommand[];
  explanation?: React.ReactNode;
  tips?: string[];
  // Sub-steps could potentially have their own simple interactive elements or visualizations if needed in the future
  // interactiveElement?: InteractiveElementData; 
  // mockOutput?: any;
}

export interface MethodologyStepItem {
  id: string;
  title: string;
  icon: string; // FontAwesome class string
  description: string | React.ReactNode; // Main description for the overall phase
  commands?: MethodologyCommand[]; // General/summary commands for the phase
  interactiveElement?: InteractiveElementData;
  explanation?: React.ReactNode; // General explanation for the phase
  mockOutput?: any; 
  visualizations?: { type: 'bar-chart' | 'map', data?: any };
  tips?: string[]; // General tips for the phase
  subSteps?: MethodologySubStepItem[]; // Detailed breakdown of the phase
}

export interface BonusToolItem {
  id: string;
  name: string;
  icon?: string;
  description: string;
  usageExample: {
    command: string;
    explanation?: string;
  };
  url: string;
}

// Advanced Pentest Mythology Types
export interface CustomParam {
  id: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'select';
  options?: string[]; // for select type
}

export interface AdvancedMythCodeStep {
  id: string;
  title: string; // e.g., "Initial Scan with Nmap"
  commandTemplate: string; // e.g., "nmap -sV {{target}} -p{{port}}"
  explanation: string; // Detailed explanation of this specific command/action
  mockOutput?: string; // Mock output for this command
}

export interface AdvancedMythPhase {
  id: string;
  title: 'Reconnaissance' | 'Enumeration' | 'Exploitation' | 'Post-Exploitation' | 'Reporting' | 'Understanding' | 'Defense' | 'Understanding XML' | 'Crafting Malicious DTDs' | 'File Disclosure via XXE' | 'SSRF via XXE' | 'Blind XXE' | 'Blind XXE (Out-of-Band Exfiltration)' | 'Identifying Deserialization' | 'Object Gadgets' | 'Payload Generation' | 'Achieving RCE via Deserialization';
  description: string; // Brief overview of this phase in context of the myth
  codeSteps: AdvancedMythCodeStep[]; // Specific commands within this phase
}

export interface AdvancedMythResource {
  name: string;
  url: string;
  icon?: string; // Already string
}

export interface AdvancedMythItem {
  id: string;
  slug: string;
  title: string; // e.g., "The Hydra of Injection"
  iconClass: string; // FontAwesome class string
  legend: string; // Short legend for the myth card
  narrativeIntro: string; // Full narrative introduction for the myth
  vulnerabilityAnalogy: string; // How it maps to a real vulnerability
  customParams: CustomParam[]; // Customizable parameters for commands (e.g., target.com)
  phases: AdvancedMythPhase[];
  resources: AdvancedMythResource[];
}

export interface CareerPathItem {
  id: string;
  date: string;
  title: string;
  category: 'Experience' | 'Certification' | 'Education' | 'Achievement';
  description: string;
  icon: string; // FontAwesome class string
  details?: string[];
  sortDate?: Date; // Optional, for easier sorting
}

export interface SurahDataItem {
  id: number; // 1 to 114
  number: string; // "001" to "114"
  name: string; // Arabic name
  englishName: string; // Transliteration or English name
  revelationType: 'Meccan' | 'Medinan';
  content?: string; // Optional: Full text of the Surah in Arabic
  asbabNuzul?: string; // Optional: Reasons for revelation in Arabic
}

// Quran Player Types
export interface ReciterItem {
  id: string;
  name: string;
  imageUrl: string;
  audioBaseUrl: string;
}

// "Who I Am" Page Specific Types
export interface ImpactCounter {
  id: string;
  label: string;
  targetValue: number;
  icon: string; // FontAwesome class string
  tooltipText: string;
  suffix?: string;
}

export interface BeforeAfterItem {
  id: string;
  before: {
    imageUrl: string; // Placeholder: /images/placeholder-before.png
    title: string;
    description: string;
    hotspots?: Hotspot[];
  };
  after: {
    imageUrl: string; // Placeholder: /images/placeholder-after.png
    title: string;
    description: string;
    hotspots?: Hotspot[];
  };
}

export interface Hotspot {
  id: string;
  top: string; // e.g., '20%'
  left: string; // e.g., '30%'
  label: string; // Text for tooltip
}

export interface ClientMapLocation {
  id: string;
  lat: number;
  lon: number;
  name: string;
  serviceType: 'Pen-Testing' | 'Secure Coding' | 'Consulting' | 'Other'; // Add 'Other' or more specific types
  year: number;
  industry?: string;
  caseStudyUrl?: string;
}

export interface SkillEndorsement {
  id: string;
  name: string;
  endorsements: number; // For sizing/prominence in cloud
  testimonial: string;
  client?: string; // Name of client or organization
}

export interface InteractiveVideoData {
  id: string;
  videoSrc: string; // Path to video or GIF, e.g., /videos/showcase.mp4
  posterSrc?: string; // Optional poster image
  overlays?: Array<{ time: number; text: string }>; // For timed text overlays on video
  ctaText: string;
  ctaLink: string; // Could be a mailto: or link to contact section
}

// Flowchart type for "Who I Am" page
export interface FlowchartStep {
  id: string;
  label: string;
  icon?: string;
  type?: 'start' | 'process' | 'decision' | 'end' | 'milestone'; // Added milestone type
  color?: string; // Optional: e.g., 'text-accent-blue'
}
