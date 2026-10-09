import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAntiGravity } from '../hooks/useAntiGravity';
import { useCursor } from '../hooks/useCursor';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact = () => {
  const { setCursorType } = useCursor();
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const headingPhysics = useAntiGravity<HTMLDivElement>({
    strength: 5500,
    maxOffset: 25,
    maxRotate: 2,
    floatAmpX: 2,
    floatAmpY: 4,
  });

  const linkedinPhysics = useAntiGravity<HTMLAnchorElement>({
    strength: 8500,
    maxOffset: 40,
    maxRotate: 4,
    floatAmpX: -4,
    floatAmpY: 6,
  });

  const githubPhysics = useAntiGravity<HTMLAnchorElement>({
    strength: 9500,
    maxOffset: 45,
    maxRotate: -4,
    floatAmpX: 5,
    floatAmpY: -5,
  });

  const emailPhysics = useAntiGravity<HTMLAnchorElement>({
    strength: 8000,
    maxOffset: 35,
    maxRotate: 3,
    floatAmpX: -3,
    floatAmpY: -6,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('moulikunu33@gmail.com');
    setCopied(true);
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#C9A84C', '#E8DCC8', '#F2EDE6'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSent(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C9A84C', '#E8DCC8', '#F2EDE6'],
    });
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-16 bg-[#0A0909] overflow-hidden border-t border-[#1E1B18]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Centered Content */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto relative z-10 py-10">
        {/* Giant Centered Heading */}
        <motion.div
          ref={headingPhysics.ref}
          style={headingPhysics.style}
          className="select-none mb-8"
        >
          <h2 className="font-heading font-extrabold text-[clamp(60px,11vw,140px)] leading-[0.92] tracking-tight">
            <span className="block text-[#F2EDE6]">Let's</span>
            <span className="block stroke-text-accent">Connect.</span>
          </h2>
        </motion.div>

        {/* Copyable Email Underlined in --accent */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleCopyEmail}
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="group inline-flex items-center gap-2 font-mono text-xl md:text-3xl text-[#C9A84C] underline underline-offset-8 decoration-[#C9A84C]/40 hover:decoration-[#C9A84C] transition-all duration-300"
            title="Click to copy email"
          >
            <span>moulikunu33@gmail.com</span>
            {copied ? (
              <Check className="w-6 h-6 text-[#C9A84C] animate-bounce" />
            ) : (
              <Copy className="w-5 h-5 text-[#C9A84C]/60 group-hover:text-[#C9A84C] transition-colors" />
            )}
          </button>
          {copied && (
            <p className="font-mono text-xs text-[#C9A84C] mt-2">
              Email copied to clipboard!
            </p>
          )}
        </div>

        {/* Row of 44px Circle Icon Buttons (LinkedIn & GitHub) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.a
            ref={linkedinPhysics.ref}
            style={linkedinPhysics.style}
            href="https://www.linkedin.com/in/kunumouli/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="w-11 h-11 rounded-full border border-[#1E1B18] bg-[#111010] text-[#5C5650] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] flex items-center justify-center transition-all duration-200"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </motion.a>

          <motion.a
            ref={githubPhysics.ref}
            style={githubPhysics.style}
            href="https://github.com/moulikunu"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="w-11 h-11 rounded-full border border-[#1E1B18] bg-[#111010] text-[#5C5650] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] flex items-center justify-center transition-all duration-200"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </motion.a>

          <motion.a
            ref={emailPhysics.ref}
            style={emailPhysics.style}
            href="mailto:moulikunu33@gmail.com"
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="w-11 h-11 rounded-full border border-[#1E1B18] bg-[#111010] text-[#5C5650] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] flex items-center justify-center transition-all duration-200"
            aria-label="Direct Email"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Location Row in DM Mono --muted */}
        <div className="flex items-center justify-center gap-2 font-mono text-sm text-[#5C5650] mb-8">
          <MapPin className="w-4 h-4 text-[#C9A84C]" />
          <span>Palasa, Srikakulam, Andhra Pradesh</span>
        </div>

        {/* Quick Transmission Dispatch Form */}
        <div className="w-full max-w-lg bg-[#111010]/90 border border-[#1E1B18] rounded-2xl p-6 shadow-xl backdrop-blur-md text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#F2EDE6] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              Direct Message
            </span>
            <span className="font-mono text-[10px] text-[#5C5650]">Quick Dispatch</span>
          </div>

          {formSent ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-mono text-sm text-[#C9A84C] font-semibold">Message Transmitted!</p>
              <p className="font-mono text-xs text-[#E8DCC8]">
                Thank you for reaching out. Kunu Mouli will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0909] border border-[#1E1B18] text-xs font-mono text-[#F2EDE6] placeholder-[#5C5650] focus:border-[#C9A84C] focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0909] border border-[#1E1B18] text-xs font-mono text-[#F2EDE6] placeholder-[#5C5650] focus:border-[#C9A84C] focus:outline-none transition-colors"
                />
              </div>

              <textarea
                placeholder="Project inquiry, collaboration, or opportunity details..."
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0909] border border-[#1E1B18] text-xs font-mono text-[#F2EDE6] placeholder-[#5C5650] focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
              />

              <button
                type="submit"
                onMouseEnter={() => setCursorType('button')}
                onMouseLeave={() => setCursorType('default')}
                className="w-full py-2.5 rounded-xl bg-[#C9A84C] hover:bg-[#d9b85c] text-xs font-heading font-semibold text-black transition-all duration-200 shadow-[0_0_20px_rgba(201,168,76,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer in DM Mono 11px --muted */}
      <footer className="w-full max-w-7xl mx-auto pt-10 border-t border-[#1E1B18] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#5C5650] relative z-10">
        <p>© 2025 Kunu Mouli</p>
        <p className="flex items-center gap-1.5">
          <span>Built with React + Vite</span>
          <span className="text-[#C9A84C]">✦</span>
          <span>Zero-Gravity Motion Physics</span>
        </p>
      </footer>
    </section>
  );
};
