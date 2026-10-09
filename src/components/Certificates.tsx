import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ExternalLink,
  Download,
  Eye,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Globe,
  Code2,
  Briefcase,
  HeartHandshake,
  Wrench,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category:
    | 'ai-generative-ai'
    | 'web-development'
    | 'programming'
    | 'servicenow'
    | 'productivity'
    | 'professional'
    | 'workshops'
    | 'participation-volunteering'
    | 'badges';
  subcategory?: string;
  description: string;
  filePath: string;
  previewImage?: string;
  isBadge?: boolean;
  tags: string[];
  featured?: boolean;
  date?: string;
}

export const certificateCategories = [
  { id: 'all', label: 'All Credentials', icon: Award },
  { id: 'ai-generative-ai', label: 'AI & Generative AI', icon: Cpu },
  { id: 'web-development', label: 'Web Development', icon: Globe },
  { id: 'programming', label: 'Python & SQL', icon: Code2 },
  { id: 'servicenow', label: 'ServiceNow (CAD)', icon: ShieldCheck },
  { id: 'professional', label: 'Internship & Work', icon: Briefcase },
  { id: 'workshops', label: 'Workshops', icon: Wrench },
  { id: 'productivity', label: 'Productivity & Hackathons', icon: BookOpen },
  { id: 'participation-volunteering', label: 'Volunteering & NSS', icon: HeartHandshake },
  { id: 'badges', label: 'Digital Badges', icon: Sparkles },
] as const;

export const certificateList: CertificateItem[] = [
  // 1. AI & Generative AI
  {
    id: 'ai-intro',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud / Coursera',
    category: 'ai-generative-ai',
    description:
      'Core foundations of Generative AI, Large Language Models (LLMs), attention mechanism concepts, and real-world transformer applications.',
    filePath: '/certificates/ai-generative-ai/introduction-generative-ai-coursera.pdf',
    tags: ['Generative AI', 'LLMs', 'Coursera', 'Google Cloud'],
    featured: true,
  },
  {
    id: 'ai-prompt-engineering',
    title: 'Prompt Engineering for ChatGPT',
    issuer: 'Vanderbilt University / Coursera',
    category: 'ai-generative-ai',
    description:
      'Advanced prompt patterns, chain-of-thought steering, zero/few-shot prompting, and automated contextual LLM workflow pipelines.',
    filePath: '/certificates/ai-generative-ai/prompt-engineering-chatgpt-coursera.pdf',
    tags: ['Prompt Engineering', 'ChatGPT', 'Coursera', 'Vanderbilt'],
    featured: true,
  },

  // 2. Web Development
  {
    id: 'web-dev-fundamentals',
    title: 'Web Development Fundamentals: HTML, CSS & JavaScript',
    issuer: 'IBM Cognitive Class / Global Credential',
    category: 'web-development',
    description:
      'Foundational web architecture, semantic HTML5, modern CSS3 layout paradigms, DOM lifecycle, and asynchronous client-side scripting.',
    filePath: '/certificates/web-development/web-development-fundamentals.pdf',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Frontend Architecture'],
    featured: true,
  },
  {
    id: 'web-react-dotnet',
    title: 'React & .NET API Bootcamp: Next.js, Redux & Advanced Hooks',
    issuer: 'Full-Stack Web Bootcamp',
    category: 'web-development',
    description:
      'Enterprise React component architecture, Redux Toolkit centralized state, custom hooks, Next.js rendering, and robust RESTful .NET API integration.',
    filePath: '/certificates/web-development/react-dotnet-api-bootcamp.pdf',
    tags: ['React.js', 'Next.js', 'Redux', '.NET API', 'Full Stack'],
    featured: true,
  },

  // 3. Programming (Python & SQL)
  {
    id: 'prog-python-edx',
    title: 'Programming with Python',
    issuer: 'edX',
    category: 'programming',
    subcategory: 'Python',
    description:
      'Computational problem solving, object-oriented programming, data structures, modular software engineering, and algorithmic complexity in Python.',
    filePath: '/certificates/programming/python/edx-python.pdf',
    tags: ['Python', 'Algorithms', 'edX', 'Object-Oriented'],
    featured: true,
  },
  {
    id: 'prog-python-hackerrank',
    title: 'Python Skill Certification',
    issuer: 'HackerRank',
    category: 'programming',
    subcategory: 'Python',
    description:
      'Verified competency in Python data structures, list comprehensions, functional constructs, and problem-solving algorithms.',
    filePath: '/certificates/programming/python/python-hackerrank.pdf',
    tags: ['Python', 'HackerRank', 'Verified Skill'],
  },
  {
    id: 'prog-python-joy',
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL / IIT Madras',
    category: 'programming',
    subcategory: 'Python',
    description:
      'Advanced computational thinking, data modeling, image processing basics, recursive logic, and mathematical algorithms with Python.',
    filePath: '/certificates/programming/python/joy-of-computing-python.pdf',
    tags: ['Python', 'NPTEL', 'IIT Madras', 'Computing'],
    featured: true,
  },
  {
    id: 'prog-sql-hackerrank',
    title: 'SQL Skill Certification',
    issuer: 'HackerRank',
    category: 'programming',
    subcategory: 'SQL',
    description:
      'Certified proficiency in relational database queries, complex joins, subqueries, indexing, and aggregate reporting.',
    filePath: '/certificates/programming/sql/sql-hackerrank.pdf',
    tags: ['SQL', 'HackerRank', 'Relational DB', 'Joins'],
  },
  {
    id: 'prog-sql-analytics',
    title: 'SQL for Data Analytics',
    issuer: 'Data Analytics Credential',
    category: 'programming',
    subcategory: 'SQL',
    description:
      'Comprehensive analytical SQL querying, window functions, statistical partitioning, time-series data analysis, and schema modeling.',
    filePath: '/certificates/programming/sql/sql-data-analytics.pdf',
    tags: ['SQL', 'Data Analytics', 'Window Functions', 'BI'],
    featured: true,
  },

  // 4. ServiceNow
  {
    id: 'servicenow-cad',
    title: 'Certified Application Developer (CAD)',
    issuer: 'ServiceNow',
    category: 'servicenow',
    description:
      'Official industry certification demonstrating expertise in designing, building, and deploying custom applications on the Now Platform, including client/server scripting, UI policies, and workflow automation.',
    filePath: '/certificates/servicenow/servicenow-cad.pdf',
    previewImage: '/certificates/servicenow/servicenow-cad-preview.jpg',
    tags: ['ServiceNow', 'CAD', 'Now Platform', 'Certified Developer', 'Enterprise'],
    featured: true,
  },
  {
    id: 'servicenow-welcome',
    title: 'Micro-Certification: Welcome to ServiceNow',
    issuer: 'ServiceNow',
    category: 'servicenow',
    description:
      'Foundational platform architecture, user interface navigation, tables, schema relationships, list/form personalization, and core ITSM workflow paradigms.',
    filePath: '/certificates/servicenow/servicenow-welcome.pdf',
    tags: ['ServiceNow', 'Micro-Certification', 'Now Learning', 'ITSM'],
  },

  // 5. Professional & Internship
  {
    id: 'prof-infochord',
    title: 'Full-Stack Web Development Internship',
    issuer: 'Infochord Technologies',
    category: 'professional',
    description:
      'Successfully completed intensive web developer internship building full-stack web applications, REST API integration, frontend state management, and real client projects.',
    filePath: '/certificates/professional/internship-infochord.pdf',
    tags: ['Infochord', 'Internship', 'Full-Stack', 'Production Code'],
    featured: true,
  },

  // 6. Workshops
  {
    id: 'workshop-iith',
    title: 'Advanced Technical Workshop at IIT Hyderabad',
    issuer: 'IIT Hyderabad (IITH)',
    category: 'workshops',
    description:
      'Hands-on technical workshop on emerging computing architectures, systems engineering, and modern development best practices conducted at IIT Hyderabad.',
    filePath: '/certificates/workshops/workshop-iith.pdf',
    tags: ['IIT Hyderabad', 'Workshop', 'Engineering Excellence'],
    featured: true,
  },

  // 7. Productivity & Excellence
  {
    id: 'prod-excel',
    title: 'Microsoft Excel Certification',
    issuer: 'Productivity & Office Mastery',
    category: 'productivity',
    description:
      'Proficiency in spreadsheets, data analysis, advanced lookup formulas (VLOOKUP, XLOOKUP, INDEX-MATCH), pivot tables, and analytical visual dashboards.',
    filePath: '/certificates/productivity/ms-excel.pdf',
    tags: ['MS Excel', 'Data Analysis', 'Dashboards', 'Productivity'],
    featured: true,
  },
  {
    id: 'prod-stepcone',
    title: 'STEPCONE HACKHUB National Hackathon',
    issuer: 'GMRIT National Techfest',
    category: 'productivity',
    description:
      'National-level hackathon recognition for rapid software engineering, problem definition, architecture pitching, and building functioning prototypes under time pressure.',
    filePath: '/certificates/productivity/stepcone-hackhub.pdf',
    tags: ['Hackathon', 'STEPCONE', 'Innovation', 'National Level'],
  },
  {
    id: 'prod-unsw',
    title: 'UNSW Global Mathematics Assessment',
    issuer: 'University of New South Wales (UNSW Global)',
    category: 'productivity',
    description:
      'International certificate of distinction in logical mathematical reasoning, problem analysis, and quantitative aptitude.',
    filePath: '/certificates/productivity/unsw-global-maths.pdf',
    tags: ['UNSW Global', 'Mathematics', 'Quantitative Reasoning'],
  },
  {
    id: 'prod-english-club',
    title: 'English Club Leadership & Communication',
    issuer: 'English Literary & Communication Forum',
    category: 'productivity',
    description:
      'Recognized for exceptional public speaking, articulation, collaborative leadership, and technical symposium presentations.',
    filePath: '/certificates/productivity/english-club.pdf',
    tags: ['Leadership', 'Communication', 'Symposium'],
  },
  {
    id: 'prod-isto-merit',
    title: 'ISTO Certificate of Merit',
    issuer: 'Indian Student Talent Olympiad (ISTO)',
    category: 'productivity',
    description:
      'National Certificate of Merit awarded for high percentile analytical performance and problem-solving excellence in ISTO.',
    filePath: '/certificates/productivity/isto-merit.pdf',
    tags: ['ISTO', 'Merit Award', 'Talent Olympiad'],
  },

  // 8. Participation & Volunteering
  {
    id: 'vol-my-bharat',
    title: 'MY Bharat Youth Leadership Certificate',
    issuer: 'Ministry of Youth Affairs & Sports (Govt. of India)',
    category: 'participation-volunteering',
    description:
      'Official recognition from the Government of India for national youth empowerment, active community mobilization, and leadership service.',
    filePath: '/certificates/participation-volunteering/my-bharat.pdf',
    tags: ['MY Bharat', 'Govt of India', 'Youth Leadership'],
    featured: true,
  },
  {
    id: 'vol-nss-camp',
    title: 'NSS Special National Camp Certificate',
    issuer: 'National Service Scheme (NSS)',
    category: 'participation-volunteering',
    description:
      'Special 7-day residential community service camp, recognized as Best Volunteer (2024–25) for rural literacy, health awareness, and team leadership.',
    filePath: '/certificates/participation-volunteering/nss-camp.pdf',
    tags: ['NSS', 'Community Leadership', 'Best Volunteer'],
    featured: true,
  },
  {
    id: 'vol-blood-donation',
    title: 'Life Saver Blood Donation Certificate',
    issuer: 'Indian Red Cross Society & NSS',
    category: 'participation-volunteering',
    description:
      'Humanitarian voluntary blood donation certificate for emergency healthcare support and social commitment.',
    filePath: '/certificates/participation-volunteering/blood-donation.pdf',
    tags: ['Red Cross', 'Blood Donation', 'Humanitarian'],
  },

  // 9. Digital Badges
  {
    id: 'badge-mern',
    title: 'Full-Stack Application using MERN Stack',
    issuer: 'Full Stack Development Pathway',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge for constructing complete end-to-end MERN (MongoDB, Express, React, Node) applications.',
    filePath: '/certificates/badges/Full-stack application using the MERN stack.png',
    previewImage: '/certificates/badges/Full-stack application using the MERN stack.png',
    tags: ['MERN', 'MongoDB', 'React', 'Node.js'],
  },
  {
    id: 'badge-node-mongo',
    title: 'Full Stack Development with Node.js, MongoDB & Express',
    issuer: 'Backend Pathway Evaluation',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge in building secure RESTful backend APIs, schema validation, and database operations.',
    filePath: '/certificates/badges/Full Stack Development with Node.js, MongoDB and Express.png',
    previewImage: '/certificates/badges/Full Stack Development with Node.js, MongoDB and Express.png',
    tags: ['Node.js', 'MongoDB', 'Express', 'APIs'],
  },
  {
    id: 'badge-react-mastery',
    title: 'Full-Stack React Development Mastery',
    issuer: 'Course Pathway Evaluation',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge for advanced React concepts, state orchestration, component performance, and design patterns.',
    filePath: '/certificates/badges/Course Pathway Evaluation_ Full-Stack React Development Mastery (1).png',
    previewImage: '/certificates/badges/Course Pathway Evaluation_ Full-Stack React Development Mastery (1).png',
    tags: ['React.js', 'State Management', 'Frontend'],
  },
  {
    id: 'badge-web-fundamentals',
    title: 'Web Development Fundamentals: HTML, CSS & JS',
    issuer: 'Course Pathway Evaluation',
    category: 'badges',
    isBadge: true,
    description: 'Verified credential badge for core responsive layout design, semantic styling, and DOM scripting.',
    filePath: '/certificates/badges/Course Pathway Evaluation_ Web Development Fundamentals_ HTML, CSS and JavaScript.png',
    previewImage: '/certificates/badges/Course Pathway Evaluation_ Web Development Fundamentals_ HTML, CSS and JavaScript.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'badge-css-interactive',
    title: 'CSS Fundamentals & Interactive Design Projects',
    issuer: 'Interactive Design Pathway',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge in CSS Grid, Flexbox, responsive design, typography, and interactive UI styling.',
    filePath: '/certificates/badges/CSS Fundamentals and Interactive Design Projects.png',
    previewImage: '/certificates/badges/CSS Fundamentals and Interactive Design Projects.png',
    tags: ['CSS3', 'Interactive Design', 'Responsive'],
  },
  {
    id: 'badge-js-dom',
    title: 'JavaScript Fundamentals & DOM Interaction',
    issuer: 'JavaScript Pathway Evaluation',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge for DOM manipulation, event bubbling, asynchronous promises, and JavaScript programming.',
    filePath: '/certificates/badges/JavaScript Fundamentals and DOM Interaction.png',
    previewImage: '/certificates/badges/JavaScript Fundamentals and DOM Interaction.png',
    tags: ['JavaScript', 'DOM', 'Events'],
  },
  {
    id: 'badge-html-essentials',
    title: 'HTML Essentials & Project-Based Learning',
    issuer: 'Web Fundamentals Pathway',
    category: 'badges',
    isBadge: true,
    description: 'Verified badge for modern HTML5 semantics, accessibility, form validations, and structured markup.',
    filePath: '/certificates/badges/HTML Essentials and Project-Based Learning.png',
    previewImage: '/certificates/badges/HTML Essentials and Project-Based Learning.png',
    tags: ['HTML5', 'Semantics', 'Accessibility'],
  },
  {
    id: 'badge-codechef-star',
    title: 'CodeChef Algorithmic Proficiency (Division Badge)',
    issuer: 'CodeChef Competitive Programming',
    category: 'badges',
    isBadge: true,
    description: 'Earned competitive coding badge for algorithmic speed, data structures, and multi-problem contests.',
    filePath: '/certificates/badges/CodeChefBadge (6).png',
    previewImage: '/certificates/badges/CodeChefBadge (6).png',
    tags: ['CodeChef', 'Algorithms', 'Competitive Coding'],
  },
  {
    id: 'badge-codechef-contest',
    title: 'CodeChef Contest Achievement Badge',
    issuer: 'CodeChef Competitive Programming',
    category: 'badges',
    isBadge: true,
    description: 'Earned achievement badge for active problem solving and rating milestone progression.',
    filePath: '/certificates/badges/CodeChefBadge (8).png',
    previewImage: '/certificates/badges/CodeChefBadge (8).png',
    tags: ['CodeChef', 'Milestone', 'Problem Solving'],
  },
];

export const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const [viewFilter, setViewFilter] = useState<'all' | 'featured'>('all');
  const { setCursorType } = useCursor();

  // Physics for section header
  const titlePhysics = useAntiGravity<HTMLDivElement>({
    strength: 4200,
    maxOffset: 16,
    maxRotate: 1.5,
    floatAmpX: 2,
    floatAmpY: 3,
  });

  // Filter items based on category, search, and featured toggle
  const filteredCertificates = useMemo(() => {
    return certificateList.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Featured toggle
      if (viewFilter === 'featured' && !item.featured) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchIssuer = item.issuer.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchTitle || matchIssuer || matchDesc || matchTags;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, viewFilter]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalCert) return;
      if (e.key === 'Escape') {
        setActiveModalCert(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredCertificates.findIndex((c) => c.id === activeModalCert.id);
        if (currentIndex < filteredCertificates.length - 1) {
          setActiveModalCert(filteredCertificates[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredCertificates.findIndex((c) => c.id === activeModalCert.id);
        if (currentIndex > 0) {
          setActiveModalCert(filteredCertificates[currentIndex - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalCert, filteredCertificates]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: certificateList.length };
    certificateList.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handlePrevCert = () => {
    if (!activeModalCert) return;
    const currentIndex = filteredCertificates.findIndex((c) => c.id === activeModalCert.id);
    if (currentIndex > 0) {
      setActiveModalCert(filteredCertificates[currentIndex - 1]);
    }
  };

  const handleNextCert = () => {
    if (!activeModalCert) return;
    const currentIndex = filteredCertificates.findIndex((c) => c.id === activeModalCert.id);
    if (currentIndex < filteredCertificates.length - 1) {
      setActiveModalCert(filteredCertificates[currentIndex + 1]);
    }
  };

  const activeIndex = activeModalCert
    ? filteredCertificates.findIndex((c) => c.id === activeModalCert.id)
    : -1;

  return (
    <section id="certificates" className="relative w-full py-28 md:py-36 bg-[#0A0909] text-[#F2EDE6]">
      {/* Background Ambience / Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,168,76,0.06),transparent)] pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E1B18] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div ref={titlePhysics.ref} style={titlePhysics.style} className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C]">
              // 05. CREDENTIALS & CERTIFICATIONS
            </span>
            <span className="h-px w-16 bg-[#C9A84C]/30" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25">
              <Sparkles className="w-3 h-3 animate-spin-7s" />
              Verified Portfolio
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2EDE6]">
                Accredited <span className="text-glow-accent text-[#C9A84C]">Certificates</span>
              </h2>
              <p className="mt-4 font-mono text-sm md:text-base text-[#8C8479] max-w-2xl leading-relaxed">
                A verified record of technical certifications, enterprise developer credentials (ServiceNow CAD),
                bootcamps, algorithmic achievements, and community leadership awards.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111010] border border-[#1E1B18] shadow-inner">
                <Award className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-mono text-xs text-[#E8DCC8]">
                  <strong className="text-[#C9A84C] font-semibold">{certificateList.length}</strong> Total Records
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111010] border border-[#1E1B18] shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-mono text-xs text-[#E8DCC8]">
                  <strong className="text-[#C9A84C] font-semibold">ServiceNow CAD</strong> Certified
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search & Quick Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-2xl bg-[#111010] border border-[#1E1B18]">
          {/* Search Input Button/Field */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5650]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, issuer (e.g. Coursera, ServiceNow, HackerRank, edX), or skills..."
              className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-[#0A0909] border border-[#1E1B18] text-xs md:text-sm font-mono text-[#F2EDE6] placeholder-[#5C5650] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5C5650] hover:text-[#C9A84C] transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewFilter === 'all'
                  ? 'bg-[#C9A84C] text-[#0A0909] font-semibold shadow-md shadow-[#C9A84C]/20'
                  : 'bg-[#0A0909] text-[#8C8479] hover:text-[#F2EDE6] border border-[#1E1B18]'
              }`}
            >
              All ({certificateList.length})
            </button>
            <button
              onClick={() => setViewFilter('featured')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewFilter === 'featured'
                  ? 'bg-[#C9A84C] text-[#0A0909] font-semibold shadow-md shadow-[#C9A84C]/20'
                  : 'bg-[#0A0909] text-[#8C8479] hover:text-[#F2EDE6] border border-[#1E1B18]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Featured ({certificateList.filter((c) => c.featured).length})
            </button>
          </div>
        </div>

        {/* Category Navigation Buttons ("use good buttons to interface") */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#5C5650]">
              Filter by Category
            </span>
          </div>

          {/* Scrollable / Wrap Pill Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {certificateCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs md:text-sm transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#C9A84C] to-[#E8DCC8] text-[#0A0909] font-bold shadow-lg shadow-[#C9A84C]/25 scale-[1.02]'
                      : 'bg-[#111010] text-[#8C8479] hover:text-[#F2EDE6] border border-[#1E1B18] hover:border-[#C9A84C]/50 hover:bg-[#161413]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                      isSelected ? 'text-[#0A0909]' : 'text-[#C9A84C]'
                    }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                      isSelected
                        ? 'bg-[#0A0909]/20 text-[#0A0909] font-bold'
                        : 'bg-[#0A0909] text-[#5C5650] group-hover:text-[#C9A84C] border border-[#1E1B18]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E1B18]">
          <p className="font-mono text-xs text-[#8C8479]">
            Showing <span className="text-[#C9A84C] font-semibold">{filteredCertificates.length}</span> certificate{filteredCertificates.length === 1 ? '' : 's'}
            {selectedCategory !== 'all' && (
              <span>
                {' '}in <span className="text-[#E8DCC8]">
                  {certificateCategories.find((c) => c.id === selectedCategory)?.label}
                </span>
              </span>
            )}
            {searchQuery && (
              <span> matching "<span className="text-[#E8DCC8]">{searchQuery}</span>"</span>
            )}
          </p>

          {(selectedCategory !== 'all' || searchQuery !== '' || viewFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setViewFilter('all');
              }}
              className="text-xs font-mono text-[#C9A84C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#111010] border border-[#1E1B18]">
            <Award className="w-12 h-12 text-[#5C5650] mx-auto mb-4" />
            <h3 className="font-heading text-xl text-[#E8DCC8] mb-2">No certificates found</h3>
            <p className="font-mono text-sm text-[#8C8479] mb-6">
              Try adjusting your search query or select another category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setViewFilter('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#C9A84C] text-[#0A0909] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E8DCC8] transition-colors cursor-pointer"
            >
              Show All Certificates
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCertificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                index={index}
                onOpenModal={() => setActiveModalCert(cert)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Interactive Modal PDF / Document Viewer */}
      <AnimatePresence>
        {activeModalCert && (
          <CertificateModal
            cert={activeModalCert}
            currentIndex={activeIndex}
            totalCount={filteredCertificates.length}
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < filteredCertificates.length - 1}
            onPrev={handlePrevCert}
            onNext={handleNextCert}
            onClose={() => setActiveModalCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// ----------------------------------------------------------------------
// Certificate Card Component
// ----------------------------------------------------------------------
interface CertificateCardProps {
  cert: CertificateItem;
  index: number;
  onOpenModal: () => void;
}

const CertificateCard = ({ cert, index, onOpenModal }: CertificateCardProps) => {
  const { setCursorType } = useCursor();

  // Subtle anti-gravity micro-tilt on card
  const cardPhysics = useAntiGravity<HTMLDivElement>({
    strength: 3200 + (index % 4) * 800,
    maxOffset: 12,
    maxRotate: 1.5,
    floatAmpX: 1.5,
    floatAmpY: 3,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      ref={cardPhysics.ref}
      style={cardPhysics.style}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#111010] border border-[#1E1B18] hover:border-[#C9A84C]/60 transition-all duration-400 p-6 shadow-lg hover:shadow-2xl hover:shadow-[#C9A84C]/10 overflow-hidden"
    >
      {/* Top Ambient Glow on Hover */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9A84C]/5 rounded-full blur-2xl group-hover:bg-[#C9A84C]/15 transition-all duration-500 pointer-events-none" />

      {/* Card Content Top */}
      <div>
        {/* Header Tags & Badge Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#C9A84C] font-semibold">
              {cert.category.replace(/-/g, ' ')}
            </span>
          </div>

          {cert.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#C9A84C]/15 text-[#E8DCC8] border border-[#C9A84C]/30">
              <Sparkles className="w-2.5 h-2.5 text-[#C9A84C]" />
              Featured
            </span>
          )}
        </div>

        {/* Thumbnail Preview for Images / Badges / CAD */}
        {(cert.previewImage || cert.isBadge) && (
          <div
            onClick={onOpenModal}
            className="mb-4 relative w-full h-40 rounded-xl overflow-hidden bg-[#0A0909] border border-[#1E1B18] flex items-center justify-center p-3 cursor-pointer group/img"
          >
            <img
              src={cert.previewImage || cert.filePath}
              alt={cert.title}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/img:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0A0909]/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-[#C9A84C] text-[#0A0909] font-mono text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Eye className="w-3.5 h-3.5" />
                Click to Preview
              </span>
            </div>
          </div>
        )}

        {/* Certificate Title */}
        <h3
          onClick={onOpenModal}
          onMouseEnter={() => setCursorType('button')}
          onMouseLeave={() => setCursorType('default')}
          className="font-heading text-lg md:text-xl font-bold text-[#F2EDE6] group-hover:text-[#E8DCC8] transition-colors leading-snug mb-2 cursor-pointer"
        >
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="font-mono text-xs text-[#C9A84C] flex items-center gap-1.5 mb-3">
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>{cert.issuer}</span>
        </p>

        {/* Description */}
        <p className="font-mono text-xs text-[#8C8479] leading-relaxed mb-4 line-clamp-3">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {cert.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#0A0909] text-[#A69E94] border border-[#1E1B18]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Action Buttons ("use good buttons to interface") */}
      <div className="pt-4 border-t border-[#1E1B18]/80 flex items-center justify-between gap-2">
        {/* Primary View Certificate Button */}
        <button
          onClick={onOpenModal}
          onMouseEnter={() => setCursorType('button')}
          onMouseLeave={() => setCursorType('default')}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFBA62] text-[#0A0909] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#C9A84C]/15 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Cert</span>
        </button>

        {/* Direct New Tab Button */}
        <a
          href={cert.filePath}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setCursorType('button')}
          onMouseLeave={() => setCursorType('default')}
          className="p-2.5 rounded-xl bg-[#0A0909] text-[#8C8479] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 border border-[#1E1B18] transition-all cursor-pointer"
          title="Open Certificate in New Tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Direct Download Button */}
        <a
          href={cert.filePath}
          download
          onMouseEnter={() => setCursorType('button')}
          onMouseLeave={() => setCursorType('default')}
          className="p-2.5 rounded-xl bg-[#0A0909] text-[#8C8479] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 border border-[#1E1B18] transition-all cursor-pointer"
          title="Download Certificate File"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Interactive Certificate Modal Viewer
// ----------------------------------------------------------------------
interface CertificateModalProps {
  cert: CertificateItem;
  currentIndex: number;
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const CertificateModal = ({
  cert,
  currentIndex,
  totalCount,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onClose,
}: CertificateModalProps) => {
  const { setCursorType } = useCursor();
  const isImage = cert.filePath.match(/\.(png|jpg|jpeg|webp)$/i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[880px] flex flex-col bg-[#111010] border border-[#C9A84C]/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
      >
        {/* Modal Header Bar with "Good Buttons" */}
        <div className="px-5 py-4 border-b border-[#1E1B18] bg-[#0A0909]/90 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#C9A84C] font-semibold">
                {cert.category.replace(/-/g, ' ')}
              </span>
              <span className="text-[#5C5650] text-xs">·</span>
              <span className="font-mono text-[11px] text-[#8C8479]">
                {currentIndex + 1} of {totalCount}
              </span>
            </div>
            <h3 className="font-heading text-lg md:text-xl font-bold text-[#F2EDE6] truncate">
              {cert.title}
            </h3>
            <p className="font-mono text-xs text-[#C9A84C] truncate">{cert.issuer}</p>
          </div>

          {/* Action Button Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Previous Certificate Button */}
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className={`p-2 rounded-xl border border-[#1E1B18] transition-all cursor-pointer ${
                hasPrev
                  ? 'bg-[#111010] text-[#E8DCC8] hover:text-[#C9A84C] hover:border-[#C9A84C]'
                  : 'bg-transparent text-[#38332F] cursor-not-allowed border-transparent'
              }`}
              title="Previous Certificate (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Certificate Button */}
            <button
              onClick={onNext}
              disabled={!hasNext}
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className={`p-2 rounded-xl border border-[#1E1B18] transition-all cursor-pointer ${
                hasNext
                  ? 'bg-[#111010] text-[#E8DCC8] hover:text-[#C9A84C] hover:border-[#C9A84C]'
                  : 'bg-transparent text-[#38332F] cursor-not-allowed border-transparent'
              }`}
              title="Next Certificate (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Open in New Tab Button */}
            <a
              href={cert.filePath}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111010] hover:bg-[#1E1B18] text-[#E8DCC8] hover:text-[#C9A84C] border border-[#1E1B18] text-xs font-mono transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full View</span>
            </a>

            {/* Download Certificate Button */}
            <a
              href={cert.filePath}
              download
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8DCC8] text-[#0A0909] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="p-2 rounded-xl bg-[#111010] hover:bg-[#1E1B18] text-[#8C8479] hover:text-[#F2EDE6] border border-[#1E1B18] transition-all cursor-pointer ml-1"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Embedded Document Preview */}
        <div className="relative flex-1 bg-[#0A0909] overflow-hidden flex items-center justify-center">
          {isImage ? (
            <div className="w-full h-full p-4 flex items-center justify-center overflow-auto">
              <img
                src={cert.filePath}
                alt={cert.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-xl border border-[#1E1B18]"
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              {/* Native PDF iframe */}
              <iframe
                src={`${cert.filePath}#toolbar=1&navpanes=0&scrollbar=1`}
                title={cert.title}
                className="w-full h-full border-none"
              />

              {/* Direct Fallback notice at bottom if PDF plugin is blocked or on mobile */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[#111010]/90 backdrop-blur-md border border-[#1E1B18] text-center shadow-lg md:hidden">
                <a
                  href={cert.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#C9A84C] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Tap here to open PDF directly
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Description & Tags */}
        <div className="px-5 py-3 border-t border-[#1E1B18] bg-[#0A0909]/95 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8C8479]">
          <div className="line-clamp-1 max-w-2xl">{cert.description}</div>
          <div className="flex items-center gap-2 shrink-0">
            {cert.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] bg-[#111010] text-[#C9A84C] border border-[#1E1B18]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
