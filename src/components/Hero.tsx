import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';
import { GithubIcon, LinkedinIcon } from './Icons';
import { NeonBorder } from './NeonBorder';
import classic from '../assets/classic.png';
import blackSuit from '../assets/blacksuit.png';
import withShades from '../assets/with_shades.png';
import brushMaskImg from '../assets/brush_cursor.png';

export const Hero = () => {
  const { setCursorType } = useCursor();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [onLayer, setOnLayer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Right side image panel interactive layer state
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [onImg, setOnImg] = useState(false);
  const imgPanelRef = useRef<HTMLDivElement>(null);

  const handleImgMouseMove = (e: React.MouseEvent) => {
    const rect = imgPanelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setImgPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Anti-gravity physics for name block and badges
  const namePhysics = useAntiGravity<HTMLDivElement>({
    strength: 6000,
    maxOffset: 25,
    maxRotate: 2,
    floatAmpX: 2,
    floatAmpY: 4,
  });

  const badgePhysics = useAntiGravity<HTMLDivElement>({
    strength: 6000,
    maxOffset: 25,
    maxRotate: 3,
    floatAmpX: -3,
    floatAmpY: 4,
  });

  // Get cursor position RELATIVE to the container
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleResumeDownload = () => {
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C9A84C', '#E8DCC8', '#F2EDE6'],
    });

    const resumeContent = `
========================================
KUNU MOULI — RESUME SUMMARY
========================================
Email: moulikunu33@gmail.com
Phone: +91 7997038681
Location: Palasa, Srikakulam, Andhra Pradesh
LinkedIn: https://www.linkedin.com/in/kunumouli/
GitHub: https://github.com/moulikunu

PROFILE:
Web Developer Intern at Infochord Technologies. Building responsive, scalable applications,
integrating RESTful APIs, and developing AI-powered workflows with Google Gemini API.
Drone pilot trainee.

EDUCATION:
- B.Tech CSE: GMR Institute of Technology (2023–2027) | CGPA: 7.8
- Intermediate (MPC): Sri Junior College (2021–2023) | 93%
- Secondary: Sri Chaitanya School (2020–2021) | 99.5%

KEY SKILLS:
- Languages: Python, JavaScript, HTML, CSS
- Web & Backend: React.js, Node.js, Express.js, Tailwind CSS, Bootstrap, REST APIs, JWT
- Databases: MongoDB, MySQL, SQLite, XAMPP
- AI & Tools: Gemini API, PDF.js, Git, GitHub, VS Code

PROJECTS:
1. AI-based Learning Assistant (MERN Stack + Gemini API, JWT, Tailwind)
   - Ingests course PDFs, generates automated quizzes, smart flashcards, context-aware chat.
2. E-Commerce MK-Shopping (React, JavaScript, SQLite, Bootstrap)
   - Dynamic product search, cart state management, and secure session checkout.
3. Student Management System (HTML, CSS, JavaScript, MySQL)
   - Role-based portal for admin, faculty, and students with real-time marks & attendance analytics.

CERTIFICATIONS:
- Web Developer Certification (Infochord)
- Generative AI & Prompt Engineering (Coursera)
- Joy of Computing with Python (NPTEL)
- ServiceNow Micro Certification
- NSS Best Volunteer 2024–25
========================================
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kunu_Mouli_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#0A0909] flex flex-col-reverse md:flex-row items-stretch justify-between overflow-hidden pt-20 md:pt-0"
    >
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full md:w-[48%] lg:w-[46%] flex flex-col justify-center pl-6 md:pl-10 lg:pl-16 pr-4 md:pr-6 py-12 md:py-16 z-10">
        <div className="max-w-xl flex flex-col space-y-6 my-auto">
          {/* Label: COMPUTER SCIENCE STUDENT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
              Computer Science Student
            </p>
          </motion.div>

          {/* ================= NAME & REVEALED IMAGE LENS ON TOP ================= */}
          <motion.div
            ref={namePhysics.ref}
            style={namePhysics.style}
            className="select-none py-1 inline-block max-w-full"
          >
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => {
                setOnLayer(true);
                setCursorType('name');
              }}
              onMouseLeave={() => {
                setOnLayer(false);
                setCursorType('default');
              }}
              onTouchStart={(e) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (!rect || !e.touches[0]) return;
                setOnLayer(true);
                setPos({
                  x: e.touches[0].clientX - rect.left,
                  y: e.touches[0].clientY - rect.top,
                });
              }}
              onTouchMove={(e) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (!rect || !e.touches[0]) return;
                setOnLayer(true);
                setPos({
                  x: e.touches[0].clientX - rect.left,
                  y: e.touches[0].clientY - rect.top,
                });
              }}
              onTouchEnd={() => {
                setOnLayer(false);
              }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '450px',
                height: '675px',
                aspectRatio: '2 / 3',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'none',
              }}
            >
              {/* LAYER 1 — IMAGE (bottom, always present, hidden under name layer) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={withShades}
                  alt="Kunu Mouli"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* LAYER 2 — NAME (top, covers image completely, has circular hole at cursor) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '36px 40px',
                  // THE MAGIC: CSS clip-path cuts a circular hole where cursor is
                  // Outside the circle = name layer visible (covers image)
                  // Inside the circle = name layer cut out (image shows through)
                  WebkitMaskImage: onLayer
                    ? `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, 
                        transparent 0px,
                        transparent 99px,
                        black 100px)`
                    : 'none',
                  maskImage: onLayer
                    ? `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px,
                        transparent 0px,
                        transparent 99px,
                        black 100px)`
                    : 'none',
                  backgroundColor: '#0A0909', // matches page bg — fills around name text
                  transition: 'none', // NO transition — instant follow
                }}
              >
                {/* Name text inside the top layer */}
                <p
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(46px, 6vw, 76px)',
                    fontWeight: 800,
                    lineHeight: 1.02,
                    letterSpacing: '-0.02em',
                    color: '#F2EDE6',
                    margin: 0,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Kunu<br />
                  Mouli
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio Line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-mono text-sm md:text-[15px] text-[#5C5650] max-w-xl leading-relaxed"
          >
            Building scalable web apps · AI integration · MERN Stack · Drone pilot trainee
          </motion.p>

          {/* Resume Description Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-3 pt-1"
          >
            <p className="font-mono text-sm md:text-[15px] text-[#E8DCC8] max-w-lg leading-[1.7]">
              Web Developer Intern at Infochord Technologies. I build responsive, scalable applications and integrate RESTful APIs. Currently pursuing B.Tech CSE at GMR Institute — CGPA 7.8.
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs md:text-[13px] font-mono text-[#5C5650]">
              <a
                href="mailto:moulikunu33@gmail.com"
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="hover:text-[#C9A84C] transition-colors"
              >
                moulikunu33@gmail.com
              </a>
              <span>·</span>
              <a
                href="tel:7997038681"
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="hover:text-[#C9A84C] transition-colors"
              >
                7997038681
              </a>
              <span>·</span>
              <span>Palasa, Andhra Pradesh</span>
            </div>
          </motion.div>

          {/* CTA Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3.5 pt-4"
          >
            {/* View My Work */}
            <a
              href="#projects"
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="px-6 py-3 rounded-full bg-[#C9A84C] hover:bg-[#d9b85c] text-black font-heading font-medium text-sm transition-all duration-300 shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] flex items-center gap-2"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* Download Resume */}
            <button
              type="button"
              onClick={handleResumeDownload}
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="px-6 py-3 rounded-full border border-[#E8DCC8] hover:border-[#C9A84C] text-[#E8DCC8] hover:text-[#C9A84C] font-mono text-sm transition-all duration-300 hover:bg-[#C9A84C]/10 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            {/* GitHub Circle Icon Button (40px) */}
            <a
              href="https://github.com/moulikunu"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="w-10 h-10 rounded-full border border-[#1E1B18] bg-[#111010]/80 text-[#5C5650] hover:text-[#C9A84C] hover:border-[#C9A84C] flex items-center justify-center transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn Circle Icon Button (40px) */}
            <a
              href="https://linkedin.com/in/kunumouli/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorType('button')}
              onMouseLeave={() => setCursorType('default')}
              className="w-10 h-10 rounded-full border border-[#1E1B18] bg-[#111010]/80 text-[#5C5650] hover:text-[#C9A84C] hover:border-[#C9A84C] flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator at Bottom */}
        <div className="pt-8 flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#5C5650]">
            scroll to reveal
          </span>
          <div className="w-6 h-[1px] bg-[#C9A84C]/50" />
        </div>
      </div>

      {/* ================= VERTICAL DIVIDER LINE ================= */}
      <div className="hidden lg:flex items-center justify-center pt-20">
        <div className="w-[1.5px] h-[60vh] bg-[#C9A84C] opacity-30 rounded-full" />
      </div>

      {/* ================= RIGHT SIDE (Portrait Panel) ================= */}
      <div
        className="w-full md:w-[52%] lg:w-[54%] min-h-[70vh] md:min-h-screen relative overflow-hidden bg-[#0A0909] flex flex-col items-center justify-start pt-16 md:pt-20 pb-10 px-2 md:px-6"
      >
        {/* Full Body Image Container with 0.9s ease-out animation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="relative w-full flex items-center justify-center"
        >
          {/* Head & Upper Silhouette Backdrop Light */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(300px, 36vw, 500px)',
              height: 'clamp(300px, 36vw, 500px)',
              background:
                'radial-gradient(circle, rgba(242, 237, 230, 0.28) 0%, rgba(201, 168, 76, 0.20) 40%, rgba(201, 168, 76, 0.05) 70%, transparent 85%)',
              filter: 'blur(45px)',
              zIndex: 1,
            }}
          />

          {/* Full-Body Studio Backdrop Light */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: '48%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(400px, 48vw, 700px)',
              height: 'clamp(680px, 90vh, 1050px)',
              background:
                'radial-gradient(ellipse 65% 85% at 50% 50%, rgba(242, 237, 230, 0.24) 0%, rgba(201, 168, 76, 0.18) 42%, rgba(201, 168, 76, 0.05) 72%, transparent 85%)',
              filter: 'blur(55px)',
              zIndex: 1,
            }}
          />

          {/* Upper Body & Torso Core Glow */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(260px, 32vw, 460px)',
              height: 'clamp(320px, 40vw, 540px)',
              background:
                'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(255, 248, 235, 0.22) 0%, rgba(201, 168, 76, 0.14) 50%, transparent 75%)',
              filter: 'blur(35px)',
              zIndex: 1,
            }}
          />

          {/* Lower Body & Legs / Shoes Silhouette Glow */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: '78%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(260px, 32vw, 440px)',
              height: 'clamp(320px, 40vh, 500px)',
              background:
                'radial-gradient(ellipse 60% 75% at 50% 50%, rgba(242, 237, 230, 0.20) 0%, rgba(201, 168, 76, 0.15) 45%, transparent 75%)',
              filter: 'blur(35px)',
              zIndex: 1,
            }}
          />

          {/* ================= INTERACTIVE DUAL-LAYER IMAGE CONTAINER WITH NEON BORDER ================= */}
          <div
            className="relative"
            style={{
              position: 'relative',
              width: 'min(440px, 92vw)',
              aspectRatio: '9 / 16',
              maxWidth: '100%',
              flexShrink: 0,
              zIndex: 10,
              boxShadow: '0 20px 50px rgba(0,0,0,0.95)',
            }}
          >
            {/* INNER PHOTO LAYER */}
            <div
              ref={imgPanelRef}
              onMouseMove={handleImgMouseMove}
              onMouseEnter={() => {
                setOnImg(true);
                setCursorType('photo');
              }}
              onMouseLeave={() => {
                setOnImg(false);
                setCursorType('default');
              }}
              style={{
                position: 'absolute',
                inset: '6px',
                borderRadius: '44px',
                overflow: 'hidden',
                cursor: 'none',
                zIndex: 1,
              }}
            >
              {/* LAYER 1 — classic.png (permanent base, always fully visible) */}
              <img
                src={classic}
                alt="Kunu Mouli — Classic Suede"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  zIndex: 1,
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />

              {/* LAYER 2 — blacksuit.png (revealed in brush-stroke shape when onImg is true, completely covers Layer 1) */}
              {onImg && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    backgroundColor: '#0A0909',
                    WebkitMaskImage: `url(${brushMaskImg})`,
                    maskImage: `url(${brushMaskImg})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '400px 362px',
                    maskSize: '400px 362px',
                    WebkitMaskPosition: `${imgPos.x - 200}px ${imgPos.y - 181}px`,
                    maskPosition: `${imgPos.x - 200}px ${imgPos.y - 181}px`,
                    transition: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    src={blackSuit}
                    alt="Kunu Mouli — Black Suit"
                    style={{
                      position: 'absolute',
                      top: '-21px',
                      left: 0,
                      width: '100%',
                      height: 'calc(100% + 21px)',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              )}
            </div>

            {/* ANIMATED NEON GLOWING BORDER */}
            <NeonBorder
              color="#CC9149"
              rounded={24}
              thickness={6}
              borderSize={50}
              glow={100}
              movement="continuous"
              speed={16}
            />
          </div>

          {/* Floating Pill Badge (Bottom-Left of Image Panel) */}
          <motion.div
            ref={badgePhysics.ref}
            style={badgePhysics.style}
            className="absolute bottom-6 left-4 md:left-8 z-30 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#0A0909]/80 backdrop-blur-md flex items-center gap-2.5 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8DCC8] animate-pulse" />
            <span className="font-mono text-[11px] text-[#E8DCC8] tracking-tight whitespace-nowrap">
              Available for opportunities
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
