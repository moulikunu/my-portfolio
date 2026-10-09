import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  opacity: number;
}

export const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Warm Gold (--accent: #C9A84C) and Cream Off-White (--accent2: #E8DCC8)
    const colorPalette = [
      { r: 201, g: 168, b: 76 },  // --accent
      { r: 232, g: 220, b: 200 }, // --accent2
    ];

    // 55 tiny particles (2–3px dots)
    const particleCount = 55;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const opacity = 0.10 + Math.random() * 0.15; // 10%–25% opacity
      const radius = 2 + Math.random() * 1;       // 2–3px

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius,
        baseColor: `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}`,
        opacity,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle gravitational field connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 80) {
            const lineOpacity = (1 - dist / 80) * 0.05;
            ctx.strokeStyle = `rgba(201, 168, 76, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Weakly repelled from cursor (strength: 1800)
        if (isMouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < 240 && dist > 0.1) {
            const force = 1800 / (dist * dist + 50);
            const pushMagnitude = Math.min(force * 1.3, 3.5);
            const unitX = dx / dist;
            const unitY = dy / dist;

            p.vx += unitX * pushMagnitude * 0.1;
            p.vy += unitY * pushMagnitude * 0.1;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        if (Math.abs(p.vx) < 0.04) p.vx += (Math.random() - 0.5) * 0.04;
        if (Math.abs(p.vy) < 0.04) p.vy += (Math.random() - 0.5) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap at edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.fillStyle = `${p.baseColor}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};
