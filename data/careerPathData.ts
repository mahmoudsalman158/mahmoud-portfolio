
import { CareerPathItem } from '../types';

export const CAREER_PATH_DATA: CareerPathItem[] = [
  {
    id: 'edu-gammaltech',
    date: '2022 - 2024', 
    title: 'Foundational CS & Programming',
    category: 'Education',
    description: 'Completed a comprehensive suite of foundational courses via Gammal Tech, covering core programming languages, data structures, algorithms, object-oriented programming, and entrepreneurship principles.',
    icon: 'fas fa-book-reader',
    details: [
      'C Programming',
      'C++ Programming',
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Entrepreneurship Fundamentals'
    ],
    sortDate: new Date(2022, 0, 1) // Start date for sorting
  },
  {
    id: 'edu-zagazig',
    date: 'Expected 2026',
    title: 'B.Sc. in Electronics & Communications Engineering',
    category: 'Education',
    description: 'Pursuing a Bachelor\'s degree from Zagazig University, Faculty of Engineering. Specializing in Electronics and Communications with a focus on network security and secure software development.',
    icon: 'fas fa-graduation-cap',
    details: [
      'Core curriculum: Advanced Electronics, Communication Systems, Network Protocols.',
      'Specialized coursework: Network Security, Cryptography, Embedded Systems Security.',
      'Actively involved in university tech clubs and cybersecurity workshops.'
    ],
    sortDate: new Date(2026, 0, 1) // Expected date for sorting
  },
  {
    id: 'achieve-leetcode',
    date: '2021 - Present',
    title: '1000+ LeetCode Problems Solved',
    category: 'Achievement',
    description: 'Consistently honing problem-solving and algorithmic thinking skills by successfully tackling over 1000 challenges on LeetCode, covering a wide range of difficulties and data structures.',
    icon: 'fas fa-laptop-code',
    details: [
      'Focus on algorithm optimization and efficient data structure implementation.',
      'Regular participation in LeetCode contests to simulate competitive programming scenarios.'
    ],
    sortDate: new Date(2021, 0, 1) // Start date for sorting, "Present" implies ongoing
  },
  {
    id: 'ach-ctf-winner',
    date: 'May 2024',
    title: 'National CTF Competition - 1st Place (Team Al Mawt)',
    category: 'Achievement',
    description: 'Led "Team Al Mawt" to first place in a prominent national Capture The Flag competition, demonstrating expertise in web exploitation, reverse engineering, and cryptography challenges.',
    icon: 'fas fa-trophy',
    details: [
        'Solved complex challenges under time pressure.',
        'Collaborated effectively with team members to strategize and execute solutions.',
        'Recognized for innovative approaches to problem-solving in the competition.'
    ],
    sortDate: new Date(2024, 4, 1) // May 2024
  },
  {
    id: 'cert-ejpt',
    date: 'May 2025',
    title: 'eJPT v2 Certified',
    category: 'Certification',
    description: 'eLearnSecurity Junior Penetration Tester v2. A hands-on certification validating practical penetration testing skills across network and web application domains, including assessment methodologies and reporting.',
    icon: 'fas fa-certificate',
    details: [
      'Proficiency in information gathering, footprinting, scanning, and enumeration.',
      'Hands-on exploitation of common vulnerabilities (SQLi, XSS, LFI/RFI, etc.).',
      'Post-exploitation techniques and pivoting within compromised networks.',
      'Instructor: Ahmed Sultan (Net Raider Academy)'
    ],
    sortDate: new Date(2025, 4, 1) // May 2025
  },
  {
    id: 'cert-red-teaming-udemy',
    date: 'Anticipated 2025',
    title: 'Red Teaming Course (Udemy)',
    category: 'Certification',
    description: 'Comprehensive training in offensive security and red team operations, focusing on emulating adversary tactics, techniques, and procedures (TTPs).',
    icon: 'fas fa-user-secret',
    details: [
      'Covers attack lifecycle from initial compromise to persistence and data exfiltration.',
      'Emphasis on stealth, operational security (OPSEC), and custom tool development.',
      'Instructor: Hossam Shady'
    ],
    sortDate: new Date(2025, 11, 31) // End of 2025 for anticipated
  },
  {
    id: 'cert-adv-red-teaming-udemy',
    date: 'Anticipated 2025/2026',
    title: 'Advanced Red Teaming Course (Udemy)',
    category: 'Certification',
    description: 'In-depth exploration of advanced red teaming strategies, including sophisticated attack vectors, evasion techniques, and commanding complex offensive engagements.',
    icon: 'fas fa-user-shield',
    details: [
      'Focus on Active Directory attacks, advanced lateral movement, and C2 infrastructure.',
      'Bypassing modern defensive solutions and advanced persistence mechanisms.',
      'Instructor: Hossam Shady'
    ],
    sortDate: new Date(2026, 11, 31) // End of 2026 for anticipated range
  },
  {
    id: 'future-goals',
    date: 'Future Horizons',
    title: 'Aspirations & Continuous Development',
    category: 'Achievement',
    description: 'Driven by a commitment to mastery, my sights are set on evolving into a distinguished Senior Cybersecurity Professional and a proficient Malware Analyst. This path is fueled by relentless learning and a dedication to making significant contributions to the field, constantly loading new skills and knowledge.',
    icon: 'fas fa-spinner fa-spin', // Changed from fas fa-rocket
    details: [
      'Achieve Senior-level expertise in cybersecurity strategy and defense.',
      'Master advanced malware analysis techniques and reverse engineering.',
      'Continuously contribute to open-source security projects.',
      'Mentor upcoming talent in the cybersecurity community.'
    ],
    sortDate: new Date(2099, 0, 1) // Ensures it appears last if sorted by date
  }
];
