import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-portfolio-v2-interactive',
    title: 'Interactive Portfolio V2 (This Site!)',
    imageUrl: '/images/project-portfolio-v2.jpg', // Ensure you add this image
    description: 'The dynamic and interactive personal portfolio you are currently viewing. Built from the ground up with React, TypeScript, and Tailwind CSS, featuring engaging animations, a unique project showcase, and specialized technical content sections like the Pentest Methodologies and Mythology of Vulnerabilities.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Particles.js', 'Framer Motion (Conceptual)', 'Routing', 'Responsive Design'],
    githubUrl: 'https://github.com/mahmoudsalman158/interactive-portfolio-v2', // Replace with actual repo if different
    importance: "This portfolio serves as a live demonstration of modern frontend development capabilities, UI/UX design focus, and the ability to create engaging, content-rich web experiences. It's a testament to practical application of learned skills.",
    benefits: "Provides an interactive and memorable way to showcase my skills, projects, and technical writings. Demonstrates proficiency in React, animations, and building complex single-page applications. Offers a unique platform for visitors to explore my work.",
    developmentDetails: "Developed with a component-based architecture using React and TypeScript for type safety. Tailwind CSS for rapid and responsive UI development. Features include an interactive project display with morphing animations, dynamic content loading for blog and methodology pages, and a particle-based background. The design prioritizes aesthetics, user experience, and performance."
  },
  {
    id: 'project1',
    title: 'Cyber Threat Analyzer',
    imageUrl: '/images/project-threat-analyzer.jpg',
    description: 'AI-powered tool for real-time threat detection and analysis using Go and Python. It leverages machine learning models to identify anomalies and potential cyber attacks from various data sources.',
    techStack: ['Go', 'Python', 'AI/ML', 'Cybersecurity', 'Kafka', 'Elasticsearch'],
    githubUrl: 'https://github.com/mahmoudsalman158/placeholder-repo',
    liveDemoUrl: '#',
    importance: "Provides early warning for emerging cyber threats, enabling proactive defense and reducing incident response times. Crucial for organizations handling sensitive data or critical infrastructure.",
    benefits: "Enhances security posture through automated threat intelligence, reduces analyst fatigue by filtering noise, and improves detection rates for sophisticated attacks.",
    developmentDetails: "Developed using a microservices architecture. Python services handle data ingestion and ML model training/inference, while Go services provide high-performance APIs and data processing pipelines. Kafka used for message queuing and Elasticsearch for storing and querying threat data."
  },
  {
    id: 'project2',
    title: 'Secure Dev Platform',
    imageUrl: '/images/project-secure-dev-platform.jpg',
    description: 'A comprehensive platform integrating SAST/DAST tools, dependency checking, and secret scanning directly into CI/CD pipelines. Built with React for the frontend and Node.js for the backend orchestration.',
    techStack: ['React', 'Node.js', 'Docker', 'Kubernetes', 'DevSecOps', 'Jenkins'],
    githubUrl: 'https://github.com/mahmoudsalman158/placeholder-repo',
    importance: "Empowers development teams to build secure software from the start ('Shift Left') by automating security checks and providing actionable feedback within their existing workflows.",
    benefits: "Reduces the cost of fixing vulnerabilities by catching them early, accelerates secure software delivery, and fosters a collaborative culture between development and security teams.",
    developmentDetails: "The platform uses a plugin-based architecture to integrate various security tools. Jenkins orchestrates the CI/CD pipeline, triggering security scans via Dockerized tool containers. Results are aggregated and displayed on a React-based dashboard. Kubernetes is used for scalable deployment of the platform itself."
  },
  {
    id: 'project3',
    title: 'Vulnerability Scanner',
    imageUrl: '/images/project-vuln-scanner.jpg',
    description: 'An automated network and web application vulnerability scanner. Python-based with custom-written modules for detecting common vulnerabilities like SQLi, XSS, and misconfigurations. Utilizes Nmap for port scanning and service identification.',
    techStack: ['Python', 'Nmap', 'Requests', 'BeautifulSoup', 'Celery'],
    githubUrl: 'https://github.com/mahmoudsalman158/placeholder-repo',
    liveDemoUrl: '#',
    importance: "Helps organizations proactively identify and remediate security weaknesses in their web applications and network infrastructure before attackers can exploit them.",
    benefits: "Automates routine scanning tasks, provides consistent vulnerability reporting, and can be integrated into regular security assessment schedules. Helps in maintaining compliance with security standards.",
    developmentDetails: "The scanner consists of a core Python engine that manages tasks using Celery for distributed scanning. Modules for specific vulnerability checks (e.g., SQLi, XSS) are developed independently. Nmap is called as a subprocess for initial reconnaissance. Results are stored in a database and can be exported to various report formats."
  },
  {
    id: 'project5-redteam-toolkit', // New ID for the new project
    title: 'Red Team Operations Toolkit',
    imageUrl: '/images/project-redteam-framework.jpg', // Placeholder image
    description: 'A comprehensive toolkit for emulating advanced persistent threat (APT) tactics, techniques, and procedures (TTPs) in controlled red team engagements. Includes modules for C2 communication, payload generation, and lateral movement simulation.',
    techStack: ['Python', 'Go', 'Docker', 'Metasploit Framework', 'C2 Design'],
    githubUrl: 'https://github.com/mahmoudsalman158/redteam-toolkit-placeholder', // Placeholder URL
    importance: "Enables realistic adversary simulation to test and validate an organization's detection, response, and overall security posture against sophisticated attacks.",
    benefits: "Helps identify blind spots in defenses, improves blue team readiness through practical drills, provides concrete data for security investment, and validates security control effectiveness.",
    developmentDetails: "Built with a modular architecture. Python scripts orchestrate TTP execution and C2 channels. Go is used for developing lightweight, cross-platform implants. Docker facilitates easy deployment of testing environments. Integrates with Metasploit for certain exploitation phases."
  }
];