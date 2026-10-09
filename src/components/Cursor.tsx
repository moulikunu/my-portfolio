import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { cursorType, customLabel, mousePos, isInside, isTouch } = useCursor();

  // Zero lag exact mouse position for Layer 1 (Dot)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring delayed mouse position for Layer 2 (Ring) — stiffness: 150, damping: 18
  const springX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18 });

  useEffect(() => {
    if (isInside) {
      mouseX.set(mousePos.x);
      mouseY.set(mousePos.y);
    }
  }, [mousePos, isInside, mouseX, mouseY]);

  // Mobile / touch fallback: disable custom cursor on touch devices or when outside window
  if (isTouch || !isInside) return null;

  // On photo frames and interactive reveal masks, hide cursor so the photo reveals cleanly without a center yellow dot
  if (cursorType === 'photo' || cursorType === 'name') return null;

  const isLink = cursorType === 'link' || cursorType === 'nav';
  const isButton = cursorType === 'button';
  const isProject = cursorType === 'project';
  const isInteractive = isLink || isButton || isProject || cursorType === 'skill';

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      {/* ================= LAYER 2 — Ring (Spring delayed, morphs on hover) ================= */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none select-none flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 10001,
        }}
        animate={{
          width: isButton ? 68 : isLink ? 28 : isProject ? 64 : 44,
          height: isButton ? 38 : isLink ? 28 : isProject ? 64 : 44,
          borderRadius: isButton ? '9999px' : '50%',
          borderColor: isInteractive ? 'rgba(201, 168, 76, 0.75)' : 'rgba(201, 168, 76, 0.45)',
          backgroundColor: isLink
            ? 'rgba(201, 168, 76, 0.20)'
            : isButton
            ? 'rgba(201, 168, 76, 0.12)'
            : isProject
            ? 'rgba(201, 168, 76, 0.10)'
            : 'rgba(201, 168, 76, 0.0)',
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: '1.5px solid inherit',
            borderColor: 'inherit',
            backgroundColor: 'inherit',
          }}
        />

        {/* Project View Tooltip */}
        {isProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#C9A84C] font-mono text-[9px] font-bold tracking-widest uppercase pointer-events-none select-none z-10"
          >
            {customLabel || 'VIEW'} ↗
          </motion.span>
        )}
      </motion.div>

      {/* ================= LAYER 1 — Dot (Zero lag, 12px x 12px, scale 3x + difference on interactive) ================= */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none select-none rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 10002,
          width: 12,
          height: 12,
          backgroundColor: '#C9A84C',
        }}
        animate={{
          scale: isInteractive ? 3 : 1,
          mixBlendMode: isInteractive ? 'difference' : 'normal',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};




