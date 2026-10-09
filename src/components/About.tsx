import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Mail, Phone, Sparkles } from 'lucide-react';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';
import { NeonPhotoFrame } from './NeonPhotoFrame';
import { certificateList } from './Certificates';
import shadesImg from '../assets/with_shades.png';

export const About = () => {
  const { setCursorType } = useCursor();

  const headingPhysics = useAntiGravity<HTMLDivElement>({
    strength: 4500,
    maxOffset: 20,
    maxRotate: 2,
    floatAmpX: 2,
    floatAmpY: 4,
  });

  const photoPhysics = useAntiGravity<HTMLDivElement>({
    strength: 5000,
    maxOffset: 20,
    maxRotate: 2,
    floatAmpX: -2,
    floatAmpY: 4,
  });

  // Four floating stat pills in --accent outline
  const stat1Physics = useAntiGravity<HTMLDivElement>({
    strength: 7000,
    maxOffset: 30,
    maxRotate: 3,
    baseRotate: -1.5,
    floatAmpX: 3,
    floatAmpY: 5,
  });

  const stat2Physics = useAntiGravity<HTMLDivElement>({
    strength: 7500,
    maxOffset: 30,
    maxRotate: -3,
    baseRotate: 1.5,
    floatAmpX: -4,
    floatAmpY: 6,
  });

  const stat3Physics = useAntiGravity<HTMLDivElement>({
    strength: 7200,
    maxOffset: 30,
    maxRotate: 2.5,
    baseRotate: -1,
    floatAmpX: 3,
    floatAmpY: -5,
  });

  const stat4Physics = useAntiGravity<HTMLDivElement>({
    strength: 7200,
    maxOffset: 30,
    maxRotate: -2.5,
    baseRotate: 1.5,
    floatAmpX: -3,
    floatAmpY: 5,
  });

  // Floating interest pills
  const interestCooking = useAntiGravity<HTMLDivElement>({
    strength: 8000,
    maxOffset: 35,
    maxRotate: 3,
    baseRotate: -2,
    floatAmpX: 4,
    floatAmpY: 6,
  });

  const interestGym = useAntiGravity<HTMLDivElement>({
    strength: 8500,
    maxOffset: 35,
    maxRotate: -3,
    baseRotate: 2,
    floatAmpX: -5,
    floatAmpY: 6,
  });

  const interestDrawing = useAntiGravity<HTMLDivElement>({
    strength: 8000,
    maxOffset: 35,
    maxRotate: 3,
    baseRotate: -1,
    floatAmpX: 4,
    floatAmpY: -5,
  });

  const interestDrone = useAntiGravity<HTMLDivElement>({
    strength: 8200,
    maxOffset: 35,
    maxRotate: -3,
    baseRotate: 1.5,
    floatAmpX: -3,
    floatAmpY: 6,
  });

  const educationList = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'GMR Institute of Technology (GMRIT)',
      period: '2023–2027',
      score: 'CGPA 7.8',
      highlight: 'Core CS, Data Structures, Full-Stack & Generative AI Systems',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Sri Junior College',
      period: '2021–2023',
      score: '93%',
      highlight: 'Mathematics, Physics & Chemistry excellence',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Sri Chaitanya School',
      period: '2020–2021',
      score: '99.5%',
      highlight: 'Top academic honor with distinction',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14 bg-[#111010] w-full overflow-hidden border-t border-[#1E1B18]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Top Header */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div ref={headingPhysics.ref} style={headingPhysics.style}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
                Profile & Vision
              </span>
            </div>
            <h2 className="font-heading font-bold text-[clamp(36px,5.5vw,64px)] text-[#F2EDE6] tracking-tight leading-none">
              About Me<span className="text-[#C9A84C]">.</span>
            </h2>
          </motion.div>

          <p className="font-mono text-xs md:text-sm text-[#8C827A] max-w-md">
            Full-Stack Developer · AI Workflow Explorer · Drone Pilot Trainee
          </p>
        </div>

        {/* Main Balanced Grid: Left Column (Photo + Description Underneath) & Right Column (Stats + Experience + Education + Hobbies) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ================= LEFT COLUMN: Photo Frame + Description Under Image ================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="p-6 md:p-7 rounded-[26px] border border-[#1E1B18] bg-[#0A0909]/80 backdrop-blur-md flex flex-col justify-between h-full shadow-2xl relative overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300">
              {/* Subtle Ambient Radial Light */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '20%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '320px',
                  height: '320px',
                  background:
                    'radial-gradient(circle, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.03) 50%, transparent 75%)',
                  filter: 'blur(45px)',
                  zIndex: 0,
                }}
              />

              {/* Photo Area Centered */}
              <div className="flex flex-col items-center justify-center relative z-10 pt-2 pb-4">
                <motion.div
                  ref={photoPhysics.ref}
                  style={photoPhysics.style}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative flex items-center justify-center"
                >
                  {/* Studio Gold Backdrop Ambient Light behind the photo */}
                  <div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '280px',
                      height: '280px',
                      background:
                        'radial-gradient(circle, rgba(242, 237, 230, 0.24) 0%, rgba(201, 168, 76, 0.18) 40%, rgba(201, 168, 76, 0.04) 70%, transparent 85%)',
                      filter: 'blur(35px)',
                      zIndex: 0,
                    }}
                  />

                  {/* Framed Photo with Gold Continuous Motion at Speed 16 */}
                  <NeonPhotoFrame
                    src={shadesImg}
                    alt="Kunu Mouli — Portrait with Shades"
                    color="#CC9149"
                    rounded={22}
                    thickness={5}
                    borderSize={50}
                    glow={100}
                    movement="continuous"
                    speed={16}
                    style={{ width: 'min(78vw, 240px)' }}
                  />
                </motion.div>

                {/* Tag Pill Under Photo */}
                <div className="mt-4 flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#1E1B18] bg-[#111010]/90 text-[11px] font-mono text-[#E8DCC8]">
                  <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                  <span>Kunu Mouli · B.Tech CSE</span>
                </div>
              </div>

              {/* Description Block DIRECTLY UNDER THE IMAGE */}
              <div className="space-y-3.5 pt-4 pb-2 border-t border-[#1E1B18]/90 relative z-10 font-mono text-xs md:text-[13.5px] leading-relaxed">
                <p className="text-[#F2EDE6]">
                  Hey! I’m <span className="text-[#C9A84C] font-semibold">Kunu Mouli</span>, a Computer Science engineer and developer passionate about <span className="text-[#E8DCC8] font-semibold">web development, AI, and emerging technologies</span>.
                </p>

                <p className="text-[#8C827A] leading-[1.75]">
                  I worked as a <span className="text-[#C9A84C] font-medium">Web Developer Intern at Infochord Technologies</span>, building full-stack applications with <span className="text-[#E8DCC8]">React, Node.js, and Google Gemini API</span>. I enjoy <span className="text-[#C9A84C] font-medium">vibe coding</span>—exploring new technologies, experimenting with AI tools, and turning ideas into real, useful projects.
                </p>

                <p className="text-[#8C827A] leading-[1.75]">
                  Beyond coding, I’m also <span className="text-[#C9A84C] font-medium">trained as a drone pilot</span>. I’m always learning, experimenting, and looking for new ways to build smarter and more creative solutions.
                </p>
              </div>

              {/* Quick Meta Row at bottom of left card */}
              <div className="pt-3 border-t border-[#1E1B18]/70 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#5C5650] relative z-10">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C9A84C]" />
                  Palasa, AP, India
                </span>
                <a
                  href="mailto:moulikunu33@gmail.com"
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="hover:text-[#C9A84C] transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3 text-[#C9A84C]" />
                  moulikunu33@gmail.com
                </a>
                <a
                  href="tel:7997038681"
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="hover:text-[#C9A84C] transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#C9A84C]" />
                  7997038681
                </a>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Stats + Experience + Education + Hobbies ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 h-full">
            {/* 1. Four Floating Stat Pills in a 2x2 Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <motion.div
                ref={stat1Physics.ref}
                style={stat1Physics.style}
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="p-3.5 rounded-2xl border border-[#C9A84C] bg-[#0A0909] text-[#F2EDE6] font-mono text-center shadow-[0_0_15px_rgba(201,168,76,0.12)] flex flex-col items-center justify-center cursor-pointer hover:bg-[#C9A84C]/10 transition-all"
              >
                <span className="text-base md:text-lg font-bold text-[#C9A84C]">7.8</span>
                <span className="text-[11px] text-[#8C827A]">CGPA / 10</span>
              </motion.div>

              <motion.div
                ref={stat2Physics.ref}
                style={stat2Physics.style}
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="p-3.5 rounded-2xl border border-[#C9A84C] bg-[#0A0909] text-[#F2EDE6] font-mono text-center shadow-[0_0_15px_rgba(201,168,76,0.12)] flex flex-col items-center justify-center cursor-pointer hover:bg-[#C9A84C]/10 transition-all"
              >
                <span className="text-base md:text-lg font-bold text-[#C9A84C]">3+</span>
                <span className="text-[11px] text-[#8C827A]">Featured Systems</span>
              </motion.div>

              <motion.div
                ref={stat3Physics.ref}
                style={stat3Physics.style}
                onClick={() => {
                  const section = document.getElementById('certificates');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = 'certificates';
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="View Certifications section"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="p-3.5 rounded-2xl border border-[#C9A84C] bg-[#0A0909] text-[#F2EDE6] font-mono text-center shadow-[0_0_15px_rgba(201,168,76,0.12)] flex flex-col items-center justify-center cursor-pointer hover:bg-[#C9A84C]/10 active:scale-95 transition-all select-none"
              >
                <span className="text-base md:text-lg font-bold text-[#C9A84C]">{certificateList.length}+</span>
                <span className="text-[11px] text-[#8C827A]">Certifications</span>
              </motion.div>

              <motion.div
                ref={stat4Physics.ref}
                style={stat4Physics.style}
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="p-3.5 rounded-2xl border border-[#C9A84C] bg-[#0A0909] text-[#F2EDE6] font-mono text-center shadow-[0_0_15px_rgba(201,168,76,0.12)] flex flex-col items-center justify-center cursor-pointer hover:bg-[#C9A84C]/10 transition-all"
              >
                <span className="text-base md:text-lg font-bold text-[#C9A84C]">Pilot</span>
                <span className="text-[11px] text-[#8C827A]">Drone Trainee</span>
              </motion.div>
            </div>

            {/* 2. Experience Card */}
            <div className="p-5 md:p-6 rounded-[24px] border border-[#1E1B18] bg-[#0A0909]/80 backdrop-blur-md hover:border-[#C9A84C]/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base md:text-lg text-[#F2EDE6]">
                      Web Developer Intern
                    </h3>
                    <p className="font-mono text-xs text-[#C9A84C]">Infochord Technologies</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#8C827A] bg-[#111010] px-2.5 py-1 rounded-full border border-[#1E1B18]">
                  Present · Remote/Hybrid
                </span>
              </div>

              <ul className="space-y-1.5 font-mono text-xs md:text-[13px] text-[#E8DCC8]/90 leading-relaxed pt-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] mt-0.5">✦</span>
                  <span>Building full-stack responsive web platforms using React.js, Node.js, and modern UI tooling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] mt-0.5">✦</span>
                  <span>Integrating Gemini API LLM workflows, automated quiz engines, and document parsing pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C] mt-0.5">✦</span>
                  <span>Architecting RESTful endpoints, secure JWT authentication, and relational/NoSQL schemas.</span>
                </li>
              </ul>
            </div>

            {/* 3. Academic Background Timeline */}
            <div className="p-5 md:p-6 rounded-[24px] border border-[#1E1B18] bg-[#0A0909]/80 backdrop-blur-md hover:border-[#C9A84C]/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-heading font-semibold text-base md:text-lg text-[#F2EDE6]">
                  Academic Journey
                </h3>
              </div>

              <div className="space-y-3.5">
                {educationList.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5 border-l-2 border-[#C9A84C]/70 hover:border-[#C9A84C] transition-colors duration-200 group"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#0A0909] border border-[#C9A84C] group-hover:bg-[#C9A84C] transition-colors" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 font-mono text-xs md:text-sm">
                      <span className="font-semibold text-[#F2EDE6] group-hover:text-[#C9A84C] transition-colors">
                        {edu.degree} · <span className="text-[#8C827A] font-normal">{edu.institution}</span>
                      </span>
                      <span className="text-[#8C827A] text-xs">
                        {edu.period} · <span className="text-[#C9A84C] font-semibold">{edu.score}</span>
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#5C5650] mt-0.5">
                      {edu.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Personal Pursuits & Hobbies */}
            <div className="p-4 md:p-5 rounded-[22px] border border-[#1E1B18] bg-[#0A0909]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C827A] whitespace-nowrap">
                Personal Pursuits:
              </span>

              <div className="flex flex-wrap items-center gap-2.5">
                <motion.div
                  ref={interestCooking.ref}
                  style={interestCooking.style}
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="px-3.5 py-1.5 rounded-full border border-[#E8DCC8]/60 bg-[#111010] font-mono text-xs text-[#E8DCC8] hover:bg-[#E8DCC8] hover:text-black transition-colors cursor-pointer select-none"
                >
                  <span>🍳 Cooking</span>
                </motion.div>

                <motion.div
                  ref={interestGym.ref}
                  style={interestGym.style}
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="px-3.5 py-1.5 rounded-full border border-[#E8DCC8]/60 bg-[#111010] font-mono text-xs text-[#E8DCC8] hover:bg-[#E8DCC8] hover:text-black transition-colors cursor-pointer select-none"
                >
                  <span>💪 Gym & Fitness</span>
                </motion.div>

                <motion.div
                  ref={interestDrawing.ref}
                  style={interestDrawing.style}
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="px-3.5 py-1.5 rounded-full border border-[#E8DCC8]/60 bg-[#111010] font-mono text-xs text-[#E8DCC8] hover:bg-[#E8DCC8] hover:text-black transition-colors cursor-pointer select-none"
                >
                  <span>✏️ Drawing</span>
                </motion.div>

                <motion.div
                  ref={interestDrone.ref}
                  style={interestDrone.style}
                  onMouseEnter={() => setCursorType('button')}
                  onMouseLeave={() => setCursorType('default')}
                  className="px-3.5 py-1.5 rounded-full border border-[#E8DCC8]/60 bg-[#111010] font-mono text-xs text-[#E8DCC8] hover:bg-[#E8DCC8] hover:text-black transition-colors cursor-pointer select-none"
                >
                  <span>🛸 Drone Piloting</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

