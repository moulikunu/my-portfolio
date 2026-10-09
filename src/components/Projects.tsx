import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';
import { GithubIcon } from './Icons';
import projectAiImg from '../assets/project_ai.png';
import projectEcomImg from '../assets/project_ecommerce.png';
import projectSmsImg from '../assets/project_sms.png';

interface ProjectData {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  features: string[];
  tags: { name: string; variant: 'accent' | 'cream' }[];
  githubUrl: string;
  thumbnail: string;
}

const projects: ProjectData[] = [
  {
    id: 'ai-assistant',
    index: '01',
    title: 'AI-based Learning Assistant',
    subtitle: 'MERN Stack + Gemini API',
    description:
      'AI-powered study suite for PDF analysis, flashcard generation, automated quizzes, and context-aware chat.',
    detailedDescription:
      'Engineered an intelligent educational copilot that ingests student lecture notes and textbook PDFs using PDF.js and LLM embeddings. Orchestrates Google Gemini API to automatically produce comprehensive summaries, adaptive multiple-choice quizzes with explanations, and active-recall flashcard decks.',
    features: [
      'PDF document ingestion & context-aware semantic summarization',
      'Automated quiz generation with instant score evaluation & explanations',
      'Active-recall flashcard deck generator powered by Gemini 1.5 Flash',
      'Secure user accounts with JWT authentication and MongoDB cloud storage',
    ],
    tags: [
      { name: 'MongoDB', variant: 'accent' },
      { name: 'Express', variant: 'cream' },
      { name: 'React', variant: 'accent' },
      { name: 'Node.js', variant: 'cream' },
      { name: 'Gemini API', variant: 'accent' },
      { name: 'JWT', variant: 'cream' },
      { name: 'Tailwind', variant: 'accent' },
    ],
    githubUrl: 'https://github.com/moulikunu',
    thumbnail: projectAiImg,
  },
  {
    id: 'ecommerce',
    index: '02',
    title: 'E-Commerce MK-Shopping',
    subtitle: 'React Commerce & SQLite Storage',
    description:
      'Responsive React e-commerce platform with product search, cart persistence, secure auth, and SQLite.',
    detailedDescription:
      'Built with React.js and modern state management, MK-Shopping delivers a high-speed shopping experience with dynamic catalogue searching, price range filtering, persistent shopping cart, session authentication, and lightweight SQLite database integration for catalog management.',
    features: [
      'Dynamic product catalog with instant search & category filtering',
      'Persistent cart management with local storage and database sync',
      'Secure user authentication & order summary workflow',
      'Lightweight SQLite database with relational queries',
    ],
    tags: [
      { name: 'React', variant: 'accent' },
      { name: 'JavaScript', variant: 'cream' },
      { name: 'SQLite', variant: 'accent' },
      { name: 'Bootstrap', variant: 'cream' },
    ],
    githubUrl: 'https://github.com/moulikunu',
    thumbnail: projectEcomImg,
  },
  {
    id: 'student-mgmt',
    index: '03',
    title: 'Student Management System',
    subtitle: 'Role-Based Academic Administration',
    description:
      'Academic portal with role-based access for admins, faculty, and students to track records, attendance, and marks.',
    detailedDescription:
      'Engineered a multi-tier academic management portal supporting administrator, teacher, and student permission roles. Features secure login, real-time attendance calculation, marks entry with grade calculations, and relational MySQL database structuring for high data integrity.',
    features: [
      'Role-based access control (Admin, Faculty, Student)',
      'Automated attendance tracking and monthly percentage analytics',
      'Student record management with marks grading ledger',
      'MySQL database schema optimized for academic records',
    ],
    tags: [
      { name: 'HTML', variant: 'accent' },
      { name: 'CSS', variant: 'cream' },
      { name: 'JavaScript', variant: 'accent' },
      { name: 'MySQL', variant: 'cream' },
    ],
    githubUrl: 'https://github.com/moulikunu',
    thumbnail: projectSmsImg,
  },
];

const ProjectRow = ({
  project,
  onOpenModal,
}: {
  project: ProjectData;
  onOpenModal: (p: ProjectData) => void;
}) => {
  const { setCursorType } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  // Each card registered with useAntiGravity
  const physics = useAntiGravity<HTMLDivElement>({
    strength: 7500,
    maxOffset: 45,
    maxRotate: 2,
    floatAmpX: 3,
    floatAmpY: 6,
  });

  return (
    <motion.div
      ref={physics.ref}
      style={physics.style}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorType('project', 'VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorType('default');
      }}
      onClick={() => onOpenModal(project)}
      className="relative w-full border-t border-[#1E1B18] py-8 md:py-10 px-2 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group select-none transition-colors duration-300 hover:bg-[#0A0909]/40"
    >
      {/* Left Text Block — Nudges right 10px on hover */}
      <div
        className="flex flex-col space-y-3 transition-transform duration-300"
        style={{ transform: isHovered ? 'translateX(10px)' : 'translateX(0px)' }}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm md:text-base font-medium text-[#5C5650] group-hover:text-[#C9A84C] transition-colors">
            {project.index}
          </span>
          <h3 className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-[#F2EDE6] group-hover:text-[#C9A84C] transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="font-mono text-xs md:text-sm text-[#5C5650] group-hover:text-[#E8DCC8] max-w-xl leading-relaxed transition-colors">
          {project.description}
        </p>

        {/* Tech Tag Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={`px-3 py-1 rounded-full font-mono text-xs transition-colors duration-200 ${
                tag.variant === 'accent'
                  ? 'border border-[#C9A84C]/50 text-[#C9A84C] bg-[#C9A84C]/5'
                  : 'border border-[#E8DCC8]/40 text-[#E8DCC8] bg-[#E8DCC8]/5'
              }`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Right: 280×180px thumbnail revealed on row hover */}
      <div className="relative shrink-0 hidden lg:block overflow-hidden rounded-[16px] w-[280px] h-[170px] border border-[#1E1B18]">
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 24,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-[#C9A84C] bg-black/70 px-2 py-0.5 rounded-full border border-[#C9A84C]/40 backdrop-blur-sm">
            CLICK TO INSPECT
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { setCursorType } = useCursor();

  const headingPhysics = useAntiGravity<HTMLDivElement>({
    strength: 4500,
    maxOffset: 20,
    maxRotate: 2,
    floatAmpX: 2,
    floatAmpY: 4,
  });

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-16 bg-[#0A0909] w-full overflow-hidden border-t border-[#1E1B18]">
      <div className="max-w-7xl mx-auto">
        {/* Left-Aligned Heading: Syne 700 clamp(40px,6vw,72px) */}
        <div className="mb-14">
          <motion.div ref={headingPhysics.ref} style={headingPhysics.style}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C] mb-2 block">
              Featured Systems
            </span>
            <h2 className="font-heading font-bold text-[clamp(40px,6vw,72px)] text-[#F2EDE6] tracking-tight">
              Projects<span className="text-[#C9A84C]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* Vertically Stacked Project Cards */}
        <div className="border-b border-[#1E1B18]">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="relative w-full max-w-2xl bg-[#111010] border border-[#C9A84C]/40 rounded-[24px] p-6 md:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="absolute top-5 right-5 p-2 rounded-full border border-[#1E1B18] text-[#F2EDE6]/60 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-md border border-[#C9A84C]/20">
                  PROJECT {selectedProject.index}
                </span>
                <span className="font-mono text-xs text-[#E8DCC8]">{selectedProject.subtitle}</span>
              </div>

              <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#F2EDE6] mb-4">
                {selectedProject.title}
              </h3>

              <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden mb-6 border border-[#1E1B18]">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-mono text-sm text-[#E8DCC8] leading-relaxed mb-6">
                {selectedProject.detailedDescription}
              </p>

              <div className="mb-6">
                <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#C9A84C] mb-3">
                  Technical Architecture & Key Features
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-mono text-xs md:text-sm text-[#F2EDE6]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#5C5650] mb-2">
                  Stack & Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`px-3 py-1 rounded-full font-mono text-xs ${
                        tag.variant === 'accent'
                          ? 'border border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                          : 'border border-[#E8DCC8] text-[#E8DCC8] bg-[#E8DCC8]/10'
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#1E1B18]">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="flex-1 py-3 text-center rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-heading font-semibold text-sm transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository on GitHub</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
