import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Orbit } from 'lucide-react';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';

interface NavbarProps {
  activeSection: string;
}

export const Navbar = ({ activeSection }: NavbarProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorType } = useCursor();

  const logoPhysics = useAntiGravity<HTMLAnchorElement>({
    strength: 4000,
    maxOffset: 20,
    maxRotate: 4,
    floatAmpX: 2,
    floatAmpY: 3,
  });

  const link1Physics = useAntiGravity<HTMLAnchorElement>({ strength: 5000, maxOffset: 16, maxRotate: 3, floatAmpY: 3 });
  const link2Physics = useAntiGravity<HTMLAnchorElement>({ strength: 5000, maxOffset: 16, maxRotate: 3, floatAmpY: 3 });
  const link3Physics = useAntiGravity<HTMLAnchorElement>({ strength: 5000, maxOffset: 16, maxRotate: 3, floatAmpY: 3 });
  const link4Physics = useAntiGravity<HTMLAnchorElement>({ strength: 5000, maxOffset: 16, maxRotate: 3, floatAmpY: 3 });
  const link5Physics = useAntiGravity<HTMLAnchorElement>({ strength: 5000, maxOffset: 16, maxRotate: 3, floatAmpY: 3 });

  const navLinks = [
    { name: 'About', href: '#about', physics: link1Physics },
    { name: 'Projects', href: '#projects', physics: link2Physics },
    { name: 'Skills', href: '#skills', physics: link3Physics },
    { name: 'Certificates', href: '#certificates', physics: link4Physics },
    { name: 'Contact', href: '#contact', physics: link5Physics },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isScrolled = scrollY > 40;
  const isExpandedLogo = scrollY > 260;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-md border-b border-[#1E1B18]/60 py-3.5 shadow-lg shadow-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Left: KM Syne 800 --accent. Transitions to "Kunu Mouli" on scroll */}
          <motion.a
            ref={logoPhysics.ref}
            style={logoPhysics.style}
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            onMouseEnter={() => setCursorType('nav')}
            onMouseLeave={() => setCursorType('default')}
            className="group flex items-center gap-2 relative z-50 text-decoration-none select-none"
            aria-label="Kunu Mouli Portfolio Home"
          >
            <AnimatePresence mode="wait">
              {isExpandedLogo ? (
                <motion.span
                  key="full-logo"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="font-heading font-extrabold text-xl md:text-2xl text-[#C9A84C] tracking-tight"
                >
                  Kunu Mouli<span className="text-[#E8DCC8]">.</span>
                </motion.span>
              ) : (
                <motion.span
                  key="short-logo"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="font-heading font-extrabold text-2xl md:text-3xl text-[#C9A84C] tracking-tight group-hover:text-[#E8DCC8] transition-colors"
                >
                  KM
                </motion.span>
              )}
            </AnimatePresence>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          </motion.a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  ref={link.physics.ref}
                  style={link.physics.style}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={() => setCursorType('nav')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-[#C9A84C] font-medium' : 'text-[#F2EDE6]/80 hover:text-[#C9A84C]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A84C] rounded-full"
                    />
                  )}
                </motion.a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              onMouseEnter={() => setCursorType('nav')}
              onMouseLeave={() => setCursorType('default')}
              className="px-4 py-1.5 rounded-full border border-[#C9A84C]/50 text-xs font-mono text-[#F2EDE6] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
            >
              Get In Touch
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden relative z-50 p-2 text-[#F2EDE6] hover:text-[#C9A84C] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Fullscreen Overlay (bg-black/95) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center px-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E1B18] bg-[#111010] text-xs font-mono text-[#C9A84C] mb-4">
                <Orbit className="w-4 h-4 animate-spin-slow" />
                <span>ANTI-GRAVITY NAVIGATION</span>
              </div>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-heading text-3xl font-bold text-[#F2EDE6] hover:text-[#C9A84C] transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="w-full pt-6 mt-4 border-t border-[#1E1B18] flex flex-col items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="w-full py-3.5 text-center font-mono text-sm rounded-full bg-[#C9A84C] text-black font-semibold shadow-[0_0_25px_rgba(201,168,76,0.3)]"
                >
                  Let's Connect
                </a>
                <span className="font-mono text-xs text-[#5C5650]">moulikunu33@gmail.com</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
