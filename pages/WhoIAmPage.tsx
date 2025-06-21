import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'; // For "Let's Connect" button

// New "Who I Am" Storyboard Components
import InteractiveSubHeader from '../components/whoiam/InteractiveSubHeader';
import ProfileCard3D from '../components/whoiam/ProfileCard3D';
import ScrollAnimatedTextBlock from '../components/whoiam/ScrollAnimatedTextBlock';
import RadialProgressBars from '../components/whoiam/RadialProgressBars';
import MiniJourneyTimeline from '../components/whoiam/MiniJourneyTimeline';
import ExplanatoryModal from '../components/whoiam/ExplanatoryModal';

import { CAREER_PATH_DATA } from '../constants';
import { CareerPathItem, FlowchartStep } from '../types';

// Helper to parse date strings from CAREER_PATH_DATA for sorting
const parseCareerDate = (dateString: string): Date => {
  if (dateString.toLowerCase() === 'present') {
    return new Date(); // Treat 'Present' as today for sorting
  }
  if (dateString.toLowerCase().includes('expected') || dateString.toLowerCase().includes('anticipated')) {
    const yearMatch = dateString.match(/\b\d{4}\b/);
    if (yearMatch) {
      return new Date(parseInt(yearMatch[0], 10), 0, 1); // Beginning of that year
    }
  }
  const yearRangeMatch = dateString.match(/(\d{4})\s*-\s*(\d{4})/);
  if (yearRangeMatch) {
    return new Date(parseInt(yearRangeMatch[1], 10), 0, 1); // Use start year for range
  }
  const monthYearMatch = dateString.match(/(\w+)\s+(\d{4})/);
  if (monthYearMatch) {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthIndex = monthNames.indexOf(monthYearMatch[1].toLowerCase());
    return new Date(parseInt(monthYearMatch[2], 10), monthIndex, 1);
  }
  const yearMatch = dateString.match(/\b\d{4}\b/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[0], 10), 0, 1);
  }
  return new Date(1970, 0, 1); // Fallback for unparseable dates
};


const personaDetails = `
<p>My persona is a blend of relentless curiosity, analytical rigor, and creative problem-solving, all anchored by a steadfast commitment to ethical principles. I am driven by the intricate dance of technology – understanding how systems are built, how they can be compromised, and ultimately, how they can be fortified.</p>
<h2>Key Attributes:</h2>
<ul>
  <li><strong>Analytical Mindset:</strong> I dissect complex problems, breaking them into manageable components to understand the 'why' behind the 'what'. For example, when faced with an unknown binary, my first step is not just to run it, but to perform static analysis, observe its imports, and understand its potential capabilities before dynamic execution.</li>
  <li><strong>Innovative Spirit:</strong> I thrive on finding novel solutions. This might involve combining disparate Tactics, Techniques, and Procedures (TTPs) to bypass a defense or developing a custom script to automate a tedious reconnaissance task.</li>
  <li><strong>Integrity First:</strong> The power that comes with cybersecurity knowledge demands unwavering integrity. Every action is guided by ethical considerations and a desire to protect and defend.</li>
  <li><strong>Lifelong Learner:</strong> The digital landscape is ever-evolving, and so is my pursuit of knowledge. I am constantly exploring new attack vectors, defensive strategies, and emerging technologies.</li>
  <li><strong>Impact-Driven:</strong> My goal is to make a tangible, positive impact – whether it's securing an application, sharing knowledge, or contributing to a safer online environment.</li>
</ul>
<p>I believe in the power of technology to shape a better future, and my role is to ensure that future is secure, resilient, and trustworthy.</p>
`;

const textBlockData: Array<{ icon: string; title: string; summary: string; details: string }> = [
  { 
    icon: 'fas fa-cogs', 
    title: 'My Work Ethos & Philosophy', 
    summary: 'Dedicated to precision and driven by impact. I believe in crafting solutions that are technically sound, elegant, user-centric, and secure by design.', 
    details: `
      <p>My work ethos is founded on several core pillars:</p>
      <h2>Core Pillars</h2>
      <ul>
        <li><strong>Precision & Excellence:</strong> I strive for meticulousness in every task, from writing clean, efficient code to conducting thorough security assessments. Excellence is not an act but a habit.</li>
        <li><strong>Impact-Driven Approach:</strong> The ultimate goal is to deliver solutions that provide tangible value and robust security. I focus on understanding the 'bigger picture' to ensure my work aligns with strategic objectives.</li>
        <li><strong>Security by Design:</strong> Security is not an afterthought or a layer to be added at the end. It's an integral part of the entire lifecycle, from initial concept to deployment and maintenance.</li>
        <li><strong>Elegance in Simplicity:</strong> Complex problems often benefit from elegant, simple solutions. I aim for clarity and efficiency, avoiding unnecessary complexity that can introduce new risks.</li>
        <li><strong>User-Centricity (even in security):</strong> Secure systems should also be usable. I consider the human factor in designing defenses and communicating risks.</li>
        <li><strong>Continuous Improvement:</strong> The threat landscape and technology evolve constantly. I am committed to ongoing learning, refining my skills, and adapting my methods to stay ahead.</li>
      </ul>
      <p>This philosophy guides my approach to every project, ensuring that I deliver not just a functional outcome, but a resilient, secure, and well-crafted solution.</p>
    ` 
  },
  { 
    icon: 'fas fa-brain', 
    title: 'My Problem-Solving Approach', 
    summary: 'Analytical, creative, and persistent. I dissect complex challenges into manageable parts, exploring innovative angles to find effective and secure solutions.', 
    details: `
      <p>When confronted with a complex problem, especially in cybersecurity, my approach is systematic yet flexible:</p>
      <h2>Methodology</h2>
      <ol>
        <li><strong>Decomposition & Analysis:</strong> I begin by breaking down the challenge into smaller, more manageable components. This allows for a thorough understanding of each part and its interdependencies. For a security vulnerability, this means understanding the affected system, the nature of the flaw, and potential exploit paths.</li>
        <li><strong>Information Gathering (Reconnaissance):</strong> I collect all relevant data. This could be system logs, network traffic, source code, or threat intelligence. A deep understanding of the context is crucial.</li>
        <li><strong>Hypothesis Generation & Creative Brainstorming:</strong> I explore multiple potential solutions or attack vectors, even unconventional ones. Thinking "outside the box" is often key to uncovering sophisticated vulnerabilities or designing innovative defenses.</li>
        <li><strong>Iterative Testing & Refinement:</strong> I test hypotheses systematically. If one approach fails, I analyze why and adapt. This iterative process continues until an effective solution is found or the problem is fully understood. For example, if an initial XSS payload is blocked, I'll analyze the WAF behavior and craft new payloads to bypass it.</li>
        <li><strong>Root Cause Analysis:</strong> It's not enough to fix a symptom; I aim to identify and address the underlying root cause of a problem or vulnerability.</li>
        <li><strong>Persistence:</strong> Complex challenges require tenacity. I am persistent in my efforts, driven by the desire to find the most robust and secure outcome.</li>
      </ol>
      <p>This methodical yet creative approach enables me to tackle diverse challenges, from intricate code debugging to simulating advanced persistent threats.</p>
    ` 
  },
  { 
    icon: 'fas fa-users', 
    title: 'My Communication & Collaboration Style', 
    summary: 'Clear, proactive, and collaborative. I value open communication, active listening, and teamwork to achieve shared goals seamlessly and effectively.', 
    details: `
      <p>Effective communication and collaboration are fundamental to success in any technical field, especially cybersecurity, which often requires coordinating across diverse teams.</p>
      <h2>Communication Style:</h2>
      <ul>
        <li><strong>Clarity & Conciseness:</strong> I strive to communicate complex technical information in a clear, understandable manner, whether to technical peers or non-technical stakeholders. This includes well-documented code, detailed reports, and precise verbal explanations.</li>
        <li><strong>Proactiveness:</strong> I believe in proactive communication – sharing updates, potential issues, or new findings in a timely manner, rather than waiting to be asked.</li>
        <li><strong>Active Listening:</strong> Understanding others' perspectives is crucial. I practice active listening to ensure I fully grasp requirements, concerns, and feedback.</li>
        <li><strong>Constructive Feedback:</strong> I am open to giving and receiving constructive feedback as a tool for growth and improvement.</li>
      </ul>
      <h2>Collaboration Style:</h2>
      <ul>
        <li><strong>Team-Oriented:</strong> I thrive in collaborative environments and believe that the best solutions often emerge from diverse perspectives and shared expertise. My experience leading "Team Al Mawt" to a CTF victory underscores my ability to work effectively in a team under pressure.</li>
        <li><strong>Bridging Gaps:</strong> I enjoy bridging the gap between different teams, for instance, helping development teams understand security requirements or explaining technical risks to management.</li>
        <li><strong>Shared Ownership:</strong> I believe in shared responsibility for project success and security outcomes.</li>
        <li><strong>Respect & Empathy:</strong> Treating all team members with respect and understanding their viewpoints is essential for a positive and productive working environment.</li>
      </ul>
      <p>By fostering open communication and strong collaboration, I aim to contribute to a more efficient, effective, and secure project environment.</p>
    ` 
  },
  { 
    icon: 'fas fa-lightbulb', 
    title: 'My Inspiration & Continuous Learning', 
    summary: 'Fueled by an insatiable curiosity and a passion for the ever-evolving tech landscape. I am a dedicated lifelong learner, constantly seeking new knowledge and skills.', 
    details: `
      <p>The field of technology, and cybersecurity in particular, is characterized by rapid evolution. This constant change is not a challenge to me, but a primary source of inspiration and motivation.</p>
      <h2>Sources of Inspiration:</h2>
      <ul>
        <li><strong>The "Puzzle" of Security:</strong> I am fascinated by the intricate dance between attackers and defenders – understanding vulnerabilities, crafting exploits (ethically), and designing robust defenses is like solving a complex, ever-changing puzzle.</li>
        <li><strong>Technological Advancement:</strong> New technologies, from AI in threat detection to quantum computing's potential impact on cryptography, continually present new learning opportunities and challenges.</li>
        <li><strong>Making an Impact:</strong> The ability to use my skills to protect systems, data, and ultimately people, is a powerful motivator.</li>
        <li><strong>The Cybersecurity Community:</strong> The collaborative spirit of the security community, with its open sharing of research, tools, and techniques (e.g., via conferences like DEF CON, blogs, open-source projects), is incredibly inspiring.</li>
      </ul>
      <h2>Commitment to Continuous Learning:</h2>
      <ul>
        <li><strong>Formal Education & Certifications:</strong> My engineering studies and pursuit of certifications like eJPT and advanced Red Teaming courses provide structured learning.</li>
        <li><strong>Hands-On Practice:</strong> Platforms like LeetCode (over 1000 problems solved), CTF competitions, and my home lab are crucial for practical skill development.</li>
        <li><strong>Reading & Research:</strong> I regularly consume security blogs, research papers, technical documentation, and news from sources like The Hacker News, Bleeping Computer, and academic journals.</li>
        <li><strong>Community Engagement:</strong> I aim to participate in online forums, local meetups, and (aspirations for the future) conferences like DEF CON or Black Hat to learn from and share with peers.</li>
        <li><strong>Exploring New Domains:</strong> I'm always looking to expand my knowledge into related areas, such as cloud security, IoT security, and AI/ML applications in cybersecurity.</li>
      </ul>
      <p>This dedication to continuous learning ensures that my skills remain relevant and effective in addressing the cybersecurity challenges of today and tomorrow.</p>
    ` 
  },
];

const drivingForcesDetails = `
<p>My professional drive is powered by a synergistic trio of core motivators:</p>
<h2>1. Insatiable Curiosity (92%):</h2>
<p>This is the bedrock of my technical exploration. I'm not content with just knowing *that* something works; I need to understand *how* and *why*. In cybersecurity, this translates to:</p>
<ul>
  <li>Deconstructing malware to understand its payload and C2 mechanisms.</li>
  <li>Reverse engineering applications to find subtle logic flaws.</li>
  <li>Deep-diving into network protocols to identify potential weaknesses.</li>
  <li>Constantly asking "What if?" – What if this input is malformed? What if this security control fails? This proactive questioning helps me anticipate attack vectors. My weekly habit of dissecting 5+ new CVEs and tech articles is a testament to this.</li>
</ul>
<h2>2. Unwavering Drive (88%):</h2>
<p>I possess a strong internal locus of control and a desire to achieve impactful results. This drive manifests as:</p>
<ul>
  <li><strong>Persistence:</strong> When faced with a complex vulnerability or a difficult CTF challenge, I don't give up easily. I will explore multiple avenues, research extensively, and iterate until a solution is found.</li>
  <li><strong>Exceeding Expectations:</strong> I aim not just to meet requirements but to deliver work that is robust, well-documented, and anticipates future needs. This often means dedicating extra hours to perfect a project or a penetration test report.</li>
  <li><strong>Ownership:</strong> I take full responsibility for my tasks and their outcomes, ensuring quality and diligence in every endeavor.</li>
</ul>
<h2>3. Creative Problem-Solving (85%):</h2>
<p>Cybersecurity often requires thinking like an attacker, which demands creativity. My creative approach involves:</p>
<ul>
  <li><strong>Connecting Disparate Concepts:</strong> Seeing patterns and linking seemingly unrelated pieces of information to form a novel attack chain or a unique defensive strategy. For instance, combining an information disclosure vulnerability with a misconfigured service to achieve privilege escalation.</li>
  <li><strong>Innovative Tooling:</strong> Designing and developing custom scripts or small tools to automate repetitive tasks or solve specific problems that off-the-shelf tools might not address. My three custom security automation tools developed last quarter exemplify this.</li>
  <li><strong>Adaptive Thinking:</strong> When standard approaches fail, I pivot and explore alternative methods, adapting my techniques to the specific context of the challenge.</li>
</ul>
<p>Together, these motivators – curiosity to explore, drive to achieve, and creativity to innovate – fuel my passion for cybersecurity and my commitment to continuous growth in this dynamic field.</p>
`;

const journeyHighlightsDetails = `
<p>My journey into the world of technology and cybersecurity has been a deliberate and escalating progression of acquiring knowledge and honing practical skills. Each phase has built upon the last, creating a strong foundation for future specialization.</p>

<h2>Phase 1: Academic & Foundational Learning</h2>
<p>The journey began with a rigorous academic pursuit in <strong>Electronics & Communications Engineering at Zagazig University</strong> (expected graduation 2026). This provided a deep understanding of the underlying principles of complex systems, networks, and signal processing – essential knowledge for a cybersecurity professional.</p>
<p>Parallel to formal education, I immersed myself in foundational computer science through <strong>Gammal Tech's comprehensive courses (2022-2024)</strong>. Here, I mastered core programming languages (C, C++), delved into Data Structures & Algorithms, and grasped Object-Oriented Programming concepts. This phase was crucial for developing the "builder's mindset," understanding how software is constructed, which is invaluable for learning how to deconstruct and secure it.</p>

<h2>Phase 2: Algorithmic Prowess & Competitive Application</h2>
<p>To sharpen my problem-solving abilities and algorithmic thinking, I dedicated significant time to <strong>LeetCode (2021-Present)</strong>, successfully tackling over 1000 problems. This disciplined practice honed my ability to devise efficient and optimized solutions under pressure – a skill directly transferable to analyzing complex security scenarios and developing efficient security tools.</p>
<p>The practical application of these rapidly developing skills culminated in a significant achievement: leading <strong>"Team Al Mawt" to 1st Place in a National CTF Competition (May 2024)</strong>. This victory was a testament to effective teamwork, rapid learning in areas like web exploitation and cryptography, and the ability to perform under competitive conditions.</p>

<h2>Phase 3: Specialization & Practical Certification</h2>
<p>With a strong foundation, the focus shifted towards specialized cybersecurity skills. Achieving the <strong>eLearnSecurity Junior Penetration Tester (eJPT v2) certification (May 2025)</strong>, under the guidance of Ahmed Sultan (Net Raider Academy), validated my hands-on capabilities in penetration testing. This involved practical application of reconnaissance, scanning, exploitation of common vulnerabilities, and post-exploitation techniques.</p>

<h2>Phase 4: Advanced Pursuits & Future Trajectory</h2>
<p>The journey is one of continuous advancement. I am currently deepening my expertise through advanced <strong>Red Teaming courses (anticipated completion 2025/2026)</strong> with Hossam Shady, focusing on emulating sophisticated adversary TTPs, advanced Active Directory attacks, and C2 infrastructure. This specialization aims to provide a holistic understanding of offensive security, enabling me to better design and implement robust defenses.</p>

<p>This path, marked by academic rigor, competitive success, practical certification, and an unyielding commitment to continuous learning, reflects my dedication to becoming a highly skilled and impactful cybersecurity professional.</p>
`;

// Curated milestones for the MiniJourneyTimeline
const miniJourneyMilestones: CareerPathItem[] = [
  CAREER_PATH_DATA.find(item => item.id === 'achieve-leetcode')!, 
  CAREER_PATH_DATA.find(item => item.id === 'edu-gammaltech')!, 
  CAREER_PATH_DATA.find(item => item.id === 'ach-ctf-winner')!, 
  CAREER_PATH_DATA.find(item => item.id === 'cert-ejpt')!, 
  CAREER_PATH_DATA.find(item => item.id === 'cert-red-teaming-udemy')!, 
].filter(Boolean); 

// Updated flowchart for "Trace My Steps" modal
const journeyFlowchartData: FlowchartStep[] = [
  { id: 'f_cert_start', label: 'Specialization Path', icon: 'fas fa-flag-checkered', type: 'start', color: 'text-accent-blue' },
  { id: 'f_ejptv2', label: 'eJPT v2 Certified', icon: 'fas fa-shield-alt', type: 'milestone', color: 'text-accent-green' },
  { id: 'f_rtc_normal', label: 'Red Teaming Fundamentals', icon: 'fas fa-user-secret', type: 'process', color: 'text-accent-purple' },
  { id: 'f_rtc_advanced', label: 'Advanced Red Teaming', icon: 'fas fa-user-shield', type: 'process', color: 'text-accent-blue' },
  { id: 'f_loading', label: 'To Be Continued...', icon: 'fas fa-spinner fa-spin', type: 'end', color: 'text-gray-400' },
];


const WhoIAmPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '', flowchartData: undefined as FlowchartStep[] | undefined });
  
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    sectionsRef.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []); 

  const openModal = (title: string, content: string, flowchart?: FlowchartStep[]) => {
    setModalContent({ title, content, flowchartData: flowchart });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white">
      <div className="container mx-auto">
        
        <section ref={addToRefs} className="mb-16 scroll-reveal-section">
           <InteractiveSubHeader />
        </section>

        <section ref={addToRefs} className="mb-20 scroll-reveal-section" style={{animationDelay: '0.2s'}}>
          <ProfileCard3D 
            avatarSrc="/mahmoud-portfolio/images/profile-avatar.jpg" 
            name="Mahmoud Salman"
            title="Cybersecurity Specialist & Go Developer"
            bio="Passionate Learner, Cybersecurity Enthusiast & Go Developer. Crafting secure, elegant, and high-performing systems."
            onCTAClick={() => openModal("My Persona", personaDetails)}
            ctaText="Unveil My Persona"
          />
        </section>

        {textBlockData.map((block, index) => (
          <section 
            ref={addToRefs} 
            key={block.title} 
            className="mb-16 scroll-reveal-section"
            style={{animationDelay: `${0.4 + index * 0.2}s`}} 
          >
            <ScrollAnimatedTextBlock
              icon={block.icon}
              title={block.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              onCTAClick={() => openModal(block.title, block.details)}
              ctaText="Learn More"
            >
              <p className="text-gray-300 font-body leading-relaxed">{block.summary}</p>
            </ScrollAnimatedTextBlock>
          </section>
        ))}
        
        <section ref={addToRefs} className="mb-20 scroll-reveal-section" style={{animationDelay: '1.2s'}}>
          <RadialProgressBars 
            onCTAClick={() => openModal("My Driving Forces", drivingForcesDetails)}
            ctaText="See My Driving Forces"
          />
        </section>

        <section ref={addToRefs} className="mb-20 scroll-reveal-section" style={{animationDelay: '1.4s'}}>
          <MiniJourneyTimeline 
            milestones={miniJourneyMilestones} 
            onCTAClick={() => openModal("My Journey Highlights", journeyHighlightsDetails, journeyFlowchartData)}
            ctaText="Trace My Steps"
          />
        </section>

        <div className="text-center mt-20 mb-12 scroll-reveal-section" ref={addToRefs} style={{animationDelay: '1.6s'}}>
          <Link
            to="/#contact" 
            className="button-neon-blue font-headings font-semibold py-3 px-8 text-lg transition-all duration-300 transform hover:scale-110 inline-block cursor-pointer"
            aria-label="Navigate to contact section on homepage"
          >
            Let's Connect <i className="fas fa-paper-plane ml-2"></i>
          </Link>
        </div>

      </div>
      {modalOpen && <ExplanatoryModal title={modalContent.title} content={modalContent.content} flowchartData={modalContent.flowchartData} onClose={closeModal} />}
    </div>
  );
};

export default WhoIAmPage;
