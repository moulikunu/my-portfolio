import { useRef, useEffect, useState, useMemo } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

export interface AntiGravityOptions {
  strength?: number;       // Repulsion strength (default: 9000)
  softening?: number;      // Distance softening factor (default: 60)
  maxOffset?: number;      // Maximum push displacement in px (default: 75)
  maxRotate?: number;      // Maximum push rotation in deg (default: 4)
  radius?: number;         // Maximum influence radius in px (default: 400)
  floatAmpX?: number;      // Ambient float amplitude X (default: 4)
  floatAmpY?: number;      // Ambient float amplitude Y (default: 10)
  floatAmpRotate?: number; // Ambient float rotation in deg (default: 2)
  baseRotate?: number;     // Initial resting rotation angle (default: 0)
  disabled?: boolean;      // Disable physics
}

export interface AntiGravityResult<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  style: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    rotate: MotionValue<number>;
  };
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  isRepelled: boolean;
}

export function useAntiGravity<T extends HTMLElement = HTMLDivElement>(
  options: AntiGravityOptions = {}
): AntiGravityResult<T> {
  const {
    strength = 9000,
    softening = 60,
    maxOffset = 75,
    maxRotate = 4,
    radius = 420,
    floatAmpX = 4,
    floatAmpY = 10,
    floatAmpRotate = 2,
    baseRotate = 0,
    disabled = false,
  } = options;

  const ref = useRef<T | null>(null);
  const [isRepelled, setIsRepelled] = useState(false);

  // Target motion values
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetRotate = useMotionValue(baseRotate);

  // Framer Motion spring physics config: stiffness: 85, damping: 13, mass: 1.3
  const springConfig = { stiffness: 85, damping: 13, mass: 1.3 };
  const springX = useSpring(targetX, springConfig);
  const springY = useSpring(targetY, springConfig);
  const springRotate = useSpring(targetRotate, springConfig);

  // Randomized phase offsets so no two elements bob in sync
  const phaseRef = useRef({
    phase: Math.random() * Math.PI * 2,
    speedX: 0.5 + Math.random() * 0.4,
    speedY: 0.7 + Math.random() * 0.5,
    speedR: 0.5 + Math.random() * 0.3,
  });

  useEffect(() => {
    // Detect mobile / touch screens (< 768px) and reduced motion preference
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion || disabled) {
      targetX.set(0);
      targetY.set(0);
      targetRotate.set(baseRotate);
      return;
    }

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;
    let animationFrameId: number;

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const { phase, speedX, speedY, speedR } = phaseRef.current;
    const startTime = performance.now();

    const updatePhysics = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;

      // 1. Continuous Idle Drift (translateY ±10px and rotate ±2deg on infinite sine loop)
      const ambientX = Math.sin(elapsed * speedX + phase) * floatAmpX;
      const ambientY = Math.sin(elapsed * speedY + phase) * floatAmpY;
      const ambientR = baseRotate + Math.sin(elapsed * speedR + phase) * floatAmpRotate;

      // 2. Mouse Anti-Gravity Repulsion Field: force = 9000 / (distance² + 60)
      let pushX = 0;
      let pushY = 0;
      let pushR = 0;
      let currentlyRepelling = false;

      if (isMouseActive && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        const dx = elementCenterX - mouseX;
        const dy = elementCenterY - mouseY;
        const distance = Math.hypot(dx, dy);

        if (distance < radius && distance > 0.1) {
          currentlyRepelling = true;

          // Force formula: force = 9000 / (distance² + 60)
          const rawForce = strength / (distance * distance + softening);
          const forceMagnitude = Math.min(rawForce * 18, maxOffset);

          const unitX = dx / distance;
          const unitY = dy / distance;

          pushX = unitX * forceMagnitude;
          pushY = unitY * forceMagnitude;

          const tiltFactor = Math.max(-1, Math.min(1, dx / (rect.width * 0.5 || 60)));
          pushR = tiltFactor * maxRotate;
        }
      }

      setIsRepelled(currentlyRepelling);

      targetX.set(ambientX + pushX);
      targetY.set(ambientY + pushY);
      targetRotate.set(ambientR + pushR);

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    strength,
    softening,
    maxOffset,
    maxRotate,
    radius,
    floatAmpX,
    floatAmpY,
    floatAmpRotate,
    baseRotate,
    disabled,
    targetX,
    targetY,
    targetRotate,
  ]);

  const style = useMemo(
    () => ({
      x: springX,
      y: springY,
      rotate: springRotate,
    }),
    [springX, springY, springRotate]
  );

  return {
    ref,
    style,
    x: springX,
    y: springY,
    rotate: springRotate,
    isRepelled,
  };
}
