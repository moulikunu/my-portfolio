import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';
import { certificateList } from './Certificates';

interface SkillItem {
  id: string;
  name: string;
  variant: 'accent' | 'cream';
  top: number;
  left: number;
  baseRotate: number;
  strength: number;
}

const skillsList: SkillItem[] = [
  { id: 'python', name: 'Python', variant: 'accent', top: 10, left: 12, baseRotate: -3, strength: 9500 },
  { id: 'javascript', name: 'JavaScript', variant: 'cream', top: 6, left: 34, baseRotate: 2, strength: 10500 },
  { id: 'react', name: 'React', variant: 'accent', top: 12, left: 56, baseRotate: -2, strength: 11000 },
  { id: 'nodejs', name: 'Node.js', variant: 'cream', top: 8, left: 78, baseRotate: 4, strength: 9200 },
  { id: 'express', name: 'Express.js', variant: 'accent', top: 30, left: 6, baseRotate: 3, strength: 10000 },
  { id: 'mongodb', name: 'MongoDB', variant: 'cream', top: 32, left: 26, baseRotate: -4, strength: 10500 },
  { id: 'mysql', name: 'MySQL', variant: 'accent', top: 28, left: 45, baseRotate: 2, strength: 9200 },
  { id: 'xampp', name: 'XAMPP', variant: 'cream', top: 34, left: 63, baseRotate: -3, strength: 8900 },
  { id: 'gemini', name: 'Gemini API', variant: 'accent', top: 26, left: 82, baseRotate: 3, strength: 12000 },
  { id: 'mern', name: 'MERN Stack', variant: 'cream', top: 52, left: 8, baseRotate: -2, strength: 11500 },
  { id: 'html', name: 'HTML', variant: 'accent', top: 56, left: 24, baseRotate: 3, strength: 8800 },
  { id: 'css', name: 'CSS', variant: 'cream', top: 50, left: 40, baseRotate: -3, strength: 9000 },
  { id: 'bootstrap', name: 'Bootstrap', variant: 'accent', top: 54, left: 56, baseRotate: 2, strength: 8900 },
  { id: 'tailwind', name: 'Tailwind CSS', variant: 'cream', top: 48, left: 74, baseRotate: -4, strength: 10800 },
  { id: 'jwt', name: 'JWT', variant: 'accent', top: 56, left: 88, baseRotate: 3, strength: 9400 },
  { id: 'rest', name: 'REST APIs', variant: 'cream', top: 78, left: 10, baseRotate: 2, strength: 10200 },
  { id: 'git', name: 'Git', variant: 'accent', top: 74, left: 28, baseRotate: -2, strength: 9300 },
  { id: 'github', name: 'GitHub', variant: 'cream', top: 78, left: 46, baseRotate: 3, strength: 9600 },
  { id: 'vscode', name: 'VS Code', variant: 'accent', top: 72, left: 66, baseRotate: -3, strength: 9000 },
  { id: 'pdfjs', name: 'PDF.js', variant: 'cream', top: 76, left: 84, baseRotate: 2, strength: 9100 },
];

const certificates = [
  'ServiceNow Certified Application Developer (CAD)',
  'Generative AI & Prompt Engineering (Coursera)',
  'Web Development Fundamentals (IBM)',
  'React & .NET API Bootcamp (Next.js & Redux)',
  'Joy of Computing Python (NPTEL / IIT Madras)',
  'Python & SQL Verified (HackerRank)',
  'Full-Stack Internship (Infochord)',
  'IIT Hyderabad Advanced Workshop',
  'MY Bharat National Youth Leadership',
  'NSS Best Volunteer 2024–25',
];

const FloatingSkillTag = ({ skill }: { skill: SkillItem }) => {
  const { setCursorType } = useCursor();

  const physics = useAntiGravity<HTMLDivElement>({
    strength: skill.strength,
    maxOffset: 85,
    maxRotate: 6,
    baseRotate: skill.baseRotate,
    floatAmpX: 5,
    floatAmpY: 10,
    floatAmpRotate: 2.5,
  });

  const isAccent = skill.variant === 'accent';

  return (
    <motion.div
      ref={physics.ref}
      onMouseEnter={() => setCursorType('skill')}
      onMouseLeave={() => setCursorType('default')}
      className={`hidden md:flex absolute items-center justify-center font-mono text-[13px] px-4 py-1.5 rounded-full border transition-colors duration-200 cursor-pointer select-none ${
        isAccent
          ? 'border-[#C9A84C] text-[#F2EDE6] bg-[#111010] hover:bg-[#C9A84C] hover:text-black shadow-[0_0_15px_rgba(201,168,76,0.12)]'
          : 'border-[#E8DCC8] text-[#F2EDE6] bg-[#111010] hover:bg-[#E8DCC8] hover:text-black shadow-[0_0_15px_rgba(232,220,200,0.10)]'
      }`}
      style={{
        ...physics.style,
        top: `${skill.top}%`,
        left: `${skill.left}%`,
      }}
    >
      <span>{skill.name}</span>
    </motion.div>
  );
};

const MobileSkillTag = ({ skill }: { skill: SkillItem }) => {
  const { setCursorType } = useCursor();
  const isAccent = skill.variant === 'accent';

  return (
    <div
      onMouseEnter={() => setCursorType('skill')}
      onMouseLeave={() => setCursorType('default')}
      className={`font-mono text-[13px] px-4 py-1.5 rounded-full border transition-colors duration-200 select-none ${
        isAccent
          ? 'border-[#C9A84C] text-[#F2EDE6] bg-[#111010] hover:bg-[#C9A84C] hover:text-black'
          : 'border-[#E8DCC8] text-[#F2EDE6] bg-[#111010] hover:bg-[#E8DCC8] hover:text-black'
      }`}
    >
      <span>{skill.name}</span>
    </div>
  );
};

export const Skills = () => {
  const headingPhysics = useAntiGravity<HTMLDivElement>({
    strength: 4500,
    maxOffset: 20,
    maxRotate: 2,
    floatAmpX: 2,
    floatAmpY: 4,
  });

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 lg:px-16 bg-[#111010] w-full overflow-hidden border-t border-[#1E1B18]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-12">
          <motion.div ref={headingPhysics.ref} style={headingPhysics.style}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C] mb-2 block">
              Capabilities & Tools
            </span>
            <h2 className="font-heading font-bold text-[clamp(40px,6vw,72px)] text-[#F2EDE6] tracking-tight">
              Skills<span className="text-[#C9A84C]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* Freeform Floating Scatter Container (height: 480px on desktop) */}
        <div className="hidden md:block relative w-full h-[480px] rounded-[24px] border border-[#1E1B18] bg-[#111010]/50 backdrop-blur-sm overflow-hidden p-6 mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(#1E1B18_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

          {skillsList.map((skill) => (
            <FloatingSkillTag key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Responsive Flex Layout (Mobile) */}
        <div className="md:hidden flex flex-wrap gap-2.5 justify-center py-6 mb-12">
          {skillsList.map((skill) => (
            <MobileSkillTag key={skill.id} skill={skill} />
          ))}
        </div>

        {/* 18s Linear Infinite Marquee of Certificates */}
        <div className="mt-8 pt-8 border-t border-[#1E1B18]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C9A84C]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#5C5650]">
                Verified Certifications & Credentials
              </span>
            </div>
            <a
              href="#certificates"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors"
            >
              <span>Explore All ({certificateList.length}+)</span>
              <span>→</span>
            </a>
          </div>

          <div className="relative w-full overflow-hidden py-3 bg-[#111010] border border-[#1E1B18] rounded-full">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#111010] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111010] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
              {[...certificates, ...certificates, ...certificates].map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 text-xs md:text-sm font-mono text-[#5C5650] hover:text-[#C9A84C] transition-colors cursor-default"
                >
                  <span className="text-[#C9A84C] font-bold">✦</span>
                  <span>{cert}</span>
                  <span className="text-[#1E1B18]">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
