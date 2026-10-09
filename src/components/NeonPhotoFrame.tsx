"use client";

import React, { useRef, useState, useEffect } from "react";
import { NeonBorder, type NeonBorderProps } from "./NeonBorder";

export interface NeonPhotoFrameProps extends NeonBorderProps {
  /** Image source URL / imported asset */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Optional child elements to render inside the frame instead of or on top of <img> */
  children?: React.ReactNode;
  /** Additional container CSS class names */
  className?: string;
  /** Additional container inline styles */
  style?: React.CSSProperties;
}

/**
 * NeonPhotoFrame Component
 *
 * A 9:16 portrait photo frame with an animated glowing neon border.
 * Features:
 * - 9:16 aspect ratio with responsive sizing
 * - Glow freely spills outside the frame (overflow is not hidden on the outer wrapper)
 * - Corner radius automatically matches border curve: (rounded / 100) * (min(width, height) / 2)
 * - Photo sits inside with exact border thickness inset and overflow: hidden
 * - Respects prefers-reduced-motion
 */
export const NeonPhotoFrame: React.FC<NeonPhotoFrameProps> = ({
  src,
  alt = "Framed photo",
  children,
  color = "#CC9149",
  rounded = 24,
  thickness = 6,
  borderSize = 50,
  glow = 100,
  movement = "continuous",
  speed = 16,
  className = "",
  style = {},
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 360,
    height: 640,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Measure dimensions to accurately calculate the matching border-radius
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({
            width: Math.round(width),
            height: Math.round(height),
          });
        }
      }
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  // Compute matching inner photo border radius
  // NeonBorder calculates radius as (rounded / 100) * (min(width, height) / 2)
  const minDim = Math.min(dimensions.width, dimensions.height);
  const outerRadius = (Math.max(0, Math.min(100, rounded)) / 100) * (minDim / 2);
  const innerRadius = Math.max(0, outerRadius - thickness / 2);

  // When prefers-reduced-motion is active, pass speed=0 so border remains static
  const effectiveSpeed = prefersReducedMotion ? 0 : speed;

  return (
    <div
      ref={frameRef}
      className={`relative select-none ${className}`}
      style={{
        position: "relative",
        aspectRatio: "9 / 16",
        width: "min(90vw, 360px)",
        // Crucial: No overflow: hidden on outer wrapper so neon glow can spill freely
        ...style,
      }}
    >
      {/* Photo Layer (z-index 1, inset equal to thickness, clipped corners) */}
      <div
        style={{
          position: "absolute",
          inset: `${thickness}px`,
          borderRadius: `${innerRadius}px`,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: "#111010",
        }}
      >
        {children ? (
          children
        ) : src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: `${innerRadius}px`,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#161514",
              color: "#8C827A",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            Photo Placeholder
          </div>
        )}
      </div>

      {/* Animated Neon Glowing Border Layer (z-index 2, pointer-events none) */}
      <NeonBorder
        color={color}
        rounded={rounded}
        thickness={thickness}
        borderSize={borderSize}
        glow={glow}
        movement={movement}
        speed={effectiveSpeed}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default NeonPhotoFrame;
