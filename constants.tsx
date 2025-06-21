
import { NavLinkItem, SocialLinkItem, CareerPathItem } from './types'; // Added CareerPathItem

// Import data from new dedicated files
import { BLOG_POSTS_PART1_DATA } from './data/blogPostsPart1';
import { BLOG_POSTS_PART2_DATA } from './data/blogPostsPart2';
import { MYTHOLOGY_DATA } from './data/mythology';
import { PENETRATION_TESTING_STEPS } from './data/pentestMethodologySteps';
import { BONUS_TOOLS_DATA } from './data/pentestMethodologyBonusTools';
import { ADVANCED_PENTEST_MYTHOLOGY_DATA } from './data/advancedMythology';
import { SKILLS_DATA } from './data/skills';
import { PROJECTS_DATA } from './data/projects';
import { SERVICES_DATA } from './data/services';
import { TESTIMONIALS_DATA } from './data/testimonials';
import { CAREER_PATH_DATA } from './data/careerPathData'; 
import { SURAHS_DATA } from './data/surahData';
import { RECITERS_DATA } from './data/quranReciters'; // Import new Reciters data


export const SITE_NAME = "Mahmoud Salman";
export const SITE_LOGO_TEXT = "<Mahmoud Salman/>";

export const NAV_LINKS: NavLinkItem[] = [
  { name: 'Home', href: '/#hero', isPageLink: true }, // Ensured this navigates to main page and scrolls to hero
  // { name: 'About Me', href: '#about' },
  // { name: 'Career Path', href: '#career-path'},
  // { name: 'Skills', href: '#skills' },
  // { name: 'Projects', href: '#projects' },
  // { name: 'Services', href: '#services' },
  { name: 'Who I Am', href: '/who-i-am', isPageLink: true }, // New Link
  { name: 'Mythology', href: '/mythology', isPageLink: true },
  { name: 'Adv. Mythology', href: '/advanced-mythology', isPageLink: true },
  { name: 'Pentest Methodology', href: '/pentest-methodology', isPageLink: true },
  { name: 'Quran Player', href: '/quran-player', isPageLink: true },
  // { name: 'Blog', href: '/blog', isPageLink: true },
  // { name: 'Contact', href: '#contact', isPageLink: false }, // This would be for same-page scroll
];


export const SOCIAL_LINKS: SocialLinkItem[] = [
  { id: 'github', name: 'GitHub', url: 'https://github.com/mahmoudsalman158', icon: "fab fa-github" },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/mahmoud-salman-3b4a2a271/', icon: "fab fa-linkedin" },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@FREEfree', icon: "fab fa-youtube" },
  { id: 'leetcode', name: 'LeetCode', url: 'https://leetcode.com/u/mahmoud_Neo/', icon: "fa-solid fa-code" },
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/ginsh18', icon: "fab fa-facebook-f" },
];

// Combine blog post data from the two parts
export const BLOG_POSTS_DATA = [...BLOG_POSTS_PART1_DATA, ...BLOG_POSTS_PART2_DATA];

// Birthday Constants
export const BIRTHDAY_MONTH = 6; // June (1-indexed for month, Date object is 0-indexed)
export const BIRTHDAY_DAY = 19;
export const BIRTH_YEAR = 2003; 
export const BIRTHDAY_SECURITY_TIP = "don't fail to try";

export const SECURITY_TECH_TIPS: string[] = [
  "Regularly update your software and operating systems to patch vulnerabilities.",
  "Use strong, unique passwords for all your accounts. Consider a password manager.",
  "Enable Multi-Factor Authentication (MFA) wherever possible.",
  "Be cautious of phishing emails and suspicious links. Verify sender authenticity.",
  "Back up your important data regularly to multiple locations (cloud and local).",
  "Secure your home Wi-Fi network with WPA3/WPA2 encryption and a strong password.",
  "Understand the principle of least privilege: grant only necessary permissions.",
  "Be mindful of what you share on social media; it can be used for social engineering.",
  "Encrypt sensitive files and communications.",
  "Use a VPN on public Wi-Fi networks to protect your traffic.",
  "Keep your antivirus and anti-malware software up to date.",
  "Learn about common attack vectors like SQL injection, XSS, and CSRF.",
  "Never share your OTPs (One-Time Passwords) with anyone.",
  "Think before you click! Verify URLs before visiting them.",
  "Disable unnecessary services and features on your devices.",
  "Cover your webcam when not in use to prevent unauthorized access.",
  "Be aware of social engineering tactics used by attackers.",
  "Lock your devices (computer, phone) when unattended.",
  "Review app permissions before installing mobile applications.",
  "Monitor your financial accounts for suspicious activity.",
  "Educate yourself continuously about new cybersecurity threats.",
  "Use code versioning (like Git) and commit frequently to track changes and revert if needed.",
  "Automate repetitive tasks with scripting (Python, Bash) to save time and reduce errors.",
  "Understand the basics of networking (TCP/IP, DNS, HTTP) for better troubleshooting.",
  "Explore containerization (Docker, Kubernetes) for consistent development and deployment.",
  "Learn about Infrastructure as Code (IaC) tools like Terraform or Ansible.",
  "Familiarize yourself with cloud computing platforms (AWS, Azure, GCP) and their security models.",
  "Contribute to open-source projects to learn and collaborate.",
  "Practice problem-solving on platforms like LeetCode or HackerRank.",
  "Read tech blogs and documentation to stay updated with new technologies and best practices.",
  "Always test your code thoroughly, including edge cases and security considerations."
];

// User's personal advice (exported for static display)
export const USER_ADVICE: string[] = [
  "Hit the gym & stay active.",
  "Avoid drama, focus on your goals.",
  "Maintain good hygiene & presence.",
  "Build wealth & financial independence.",
  "Curate your circle: positivity & growth.",
  "Stay grounded: pray & reflect.",
  "Continuously elevate yourself: learn & grow."
];

// Shuffled security tips (can be used for the ticker)
const shuffledSecurityTips = [...SECURITY_TECH_TIPS].sort(() => 0.5 - Math.random());
export const SELECTED_SECURITY_TECH_TIPS = shuffledSecurityTips.slice(0, Math.min(30, shuffledSecurityTips.length)); // Take up to 30

// PROFESSIONAL_ADVICE_TIPS is no longer used directly by Hero for the combined ticker.
// Hero component will now handle USER_ADVICE statically and use SELECTED_SECURITY_TECH_TIPS for the ticker.
// We can keep PROFESSIONAL_ADVICE_TIPS if it's used elsewhere, or deprecate it.
// For now, let's keep its definition but acknowledge its changed role.
export const PROFESSIONAL_ADVICE_TIPS: string[] = [
  ...USER_ADVICE, // This part is now handled statically in Hero.tsx
  ...SELECTED_SECURITY_TECH_TIPS // This part is for the ticker
];


// Re-export the imported data arrays so they are available from constants.tsx as before
export {
  SKILLS_DATA,
  PROJECTS_DATA,
  SERVICES_DATA,
  TESTIMONIALS_DATA,
  MYTHOLOGY_DATA,
  // BLOG_POSTS_DATA is now defined above
  PENETRATION_TESTING_STEPS,
  BONUS_TOOLS_DATA,
  ADVANCED_PENTEST_MYTHOLOGY_DATA,
  CAREER_PATH_DATA,
  SURAHS_DATA,
  RECITERS_DATA 
};