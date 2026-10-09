"use client";

import React, { useId, useRef, useState, useEffect } from "react";

export interface NeonBorderProps {
  /** Neon glow color (hex, rgb, hsl). Default: "#CC9149" */
  color?: string;
  /** Corner roundness factor (0 to 100). Default: 24 */
  rounded?: number;
  /** Border stroke thickness in px. Default: 6 */
  thickness?: number;
  /** Glowing segment length as a percentage of perimeter (1 to 100). Default: 50 */
  borderSize?: number;
  /** Glow intensity factor (0 to 200). Default: 100 */
  glow?: number;
  /** Movement mode: "continuous" for smooth travel, "step" for stepped animation. Default: "continuous" */
  movement?: "continuous" | "step";
  /** Animation duration in seconds. 0 disables animation (static). Default: 16 */
  speed?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * NeonBorder Component
 *
 * An animated neon glowing border with customizable colors, glow intensity,
 * corner radius, thickness, and movement speed.
 * Fills 100% of its parent container.
 */
export const NeonBorder: React.FC<NeonBorderProps> = ({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "_");

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 360,
    height: 640,
  });

  useEffect(() => {
    const el = containerRef.current;
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

  const { width, height } = dimensions;

  // Compute radius: (rounded / 100) * (min(width, height) / 2)
  const minDim = Math.min(width, height);
  const rawRadius = (Math.max(0, Math.min(100, rounded)) / 100) * (minDim / 2);
  const halfThick = thickness / 2;

  // Geometry inside stroke center-line
  const rectW = Math.max(0, width - thickness);
  const rectH = Math.max(0, height - thickness);
  // Radius for the stroke center line
  const strokeRadius = Math.max(0, Math.min(rawRadius - halfThick, Math.min(rectW, rectH) / 2));

  // Approximate perimeter of rounded rectangle
  // 2 * (w + h) - 8*r + 2*PI*r = 2*(w + h) + (2*PI - 8)*r
  const perimeter = Math.max(
    1,
    2 * (rectW + rectH) + (2 * Math.PI - 8) * strokeRadius
  );

  // Dash calculations
  const clampedBorderSize = Math.max(1, Math.min(100, borderSize));
  const dashLength = (clampedBorderSize / 100) * perimeter;
  const gapLength = perimeter - dashLength;

  // Glow calculation
  const glowScale = Math.max(0, glow) / 100;
  const dropShadow1 = `0 0 ${4 * glowScale}px ${color}`;
  const dropShadow2 = `0 0 ${12 * glowScale}px ${color}`;
  const dropShadow3 = `0 0 ${28 * glowScale}px ${color}`;
  const dropShadow4 = `0 0 ${48 * glowScale}px ${color}`;

  const isAnimated = speed > 0;
  const animTiming = movement === "step" ? "steps(12, end)" : "linear";
  const animationName = `neon-anim-${safeId}`;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 2,
        ...style,
      }}
    >
      <style>{`
        @keyframes ${animationName} {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -${perimeter}px;
          }
        }
      `}</style>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          display: "block",
        }}
      >
        <defs>
          <linearGradient id={`grad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>

          <filter id={`filter-glow-${safeId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={thickness * 1.5 * glowScale} result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={thickness * 3 * glowScale} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Subtle Dark / Dim Base Track Outline */}
        <rect
          x={halfThick}
          y={halfThick}
          width={rectW}
          height={rectH}
          rx={strokeRadius}
          ry={strokeRadius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeOpacity={0.15}
        />

        {/* 2. Outer Wide Atmospheric Glow Layer */}
        {glowScale > 0 && (
          <rect
            x={halfThick}
            y={halfThick}
            width={rectW}
            height={rectH}
            rx={strokeRadius}
            ry={strokeRadius}
            fill="none"
            stroke={color}
            strokeWidth={thickness * 2.5}
            strokeOpacity={0.4 * glowScale}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
            filter={`url(#filter-glow-${safeId})`}
            style={{
              animation: isAnimated ? `${animationName} ${speed}s ${animTiming} infinite` : "none",
            }}
          />
        )}

        {/* 3. Main Glowing Neon Stroke with CSS drop-shadows */}
        <rect
          x={halfThick}
          y={halfThick}
          width={rectW}
          height={rectH}
          rx={strokeRadius}
          ry={strokeRadius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeLinecap="round"
          style={{
            filter: `${dropShadow1} ${dropShadow2} ${dropShadow3} ${dropShadow4}`,
            animation: isAnimated ? `${animationName} ${speed}s ${animTiming} infinite` : "none",
          }}
        />

        {/* 4. Bright White High-Intensity Core */}
        <rect
          x={halfThick}
          y={halfThick}
          width={rectW}
          height={rectH}
          rx={strokeRadius}
          ry={strokeRadius}
          fill="none"
          stroke="#ffffff"
          strokeWidth={Math.max(1.5, thickness * 0.35)}
          strokeDasharray={`${dashLength * 0.7} ${perimeter - dashLength * 0.7}`}
          strokeLinecap="round"
          style={{
            opacity: 0.9,
            animation: isAnimated ? `${animationName} ${speed}s ${animTiming} infinite` : "none",
          }}
        />
      </svg>
    </div>
  );
};

export default NeonBorder;
