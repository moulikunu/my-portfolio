import React, { useState } from "react";
import { NeonPhotoFrame } from "./NeonPhotoFrame";
import classicImg from "../assets/classic.png";
import shadesImg from "../assets/with_shades.png";
import { Sparkles, Sliders, Play, Pause } from "lucide-react";

export const NeonDemoSection: React.FC = () => {
  // Interactive frame controls
  const [activeColor, setActiveColor] = useState("#CC9149");
  const [activeRounded, setActiveRounded] = useState(24);
  const [activeThickness, setActiveThickness] = useState(6);
  const [activeBorderSize, setActiveBorderSize] = useState(50);
  const [activeGlow, setActiveGlow] = useState(100);
  const [activeMovement, setActiveMovement] = useState<"continuous" | "step">("continuous");
  const [activeSpeed, setActiveSpeed] = useState(16);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="neon-demo"
      className="relative w-full py-24 px-4 md:px-8 bg-[#0a0a0a] text-[#F2EDE6] overflow-visible border-t border-[#1F1D1A]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CC9149]/30 bg-[#CC9149]/10 text-[#CC9149] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Component Demo</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-[#F2EDE6]">
            Neon Photo Frames (9:16)
          </h2>
          <p className="text-[#8C827A] max-w-xl text-sm md:text-base font-mono">
            Pure SVG glowing animated borders with dynamic corner curvature matching,
            unclipped outer neon spill, and zero external runtime dependencies.
          </p>
        </div>

        {/* Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-start justify-items-center w-full max-w-5xl">
          {/* Frame 1: Default Spec (#CC9149 Continuous) */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-[#CC9149] font-medium">
                Frame 1 — Default Gold / Continuous
              </span>
              <p className="text-[11px] text-[#8C827A] font-mono">
                color: #CC9149 • speed: 16s • glow: 100
              </p>
            </div>

            <div className="p-4 flex items-center justify-center">
              <NeonPhotoFrame
                src={classicImg}
                alt="Portrait with Gold Neon Frame"
                color="#CC9149"
                rounded={24}
                thickness={6}
                borderSize={50}
                glow={100}
                movement="continuous"
                speed={16}
                style={{ width: "min(85vw, 290px)" }}
              />
            </div>
          </div>

          {/* Frame 2: Cyan Spec (#00F0FF Step Movement) */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-medium">
                Frame 2 — Cyber Cyan / Step Mode
              </span>
              <p className="text-[11px] text-[#8C827A] font-mono">
                color: #00F0FF • movement: step • speed: 14s
              </p>
            </div>

            <div className="p-4 flex items-center justify-center">
              <NeonPhotoFrame
                src={shadesImg}
                alt="Portrait with Cyan Neon Frame"
                color="#00F0FF"
                rounded={24}
                thickness={6}
                borderSize={50}
                glow={110}
                movement="step"
                speed={14}
                style={{ width: "min(85vw, 290px)" }}
              />
            </div>
          </div>

          {/* Frame 3: Interactive Live Playground */}
          <div className="flex flex-col items-center space-y-4 md:col-span-2 lg:col-span-1 w-full max-w-[320px]">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-[#E8DCC8] font-medium flex items-center justify-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#CC9149]" />
                Live Control Tester
              </span>
              <p className="text-[11px] text-[#8C827A] font-mono">
                Tweak parameters in real-time
              </p>
            </div>

            <div className="p-2 flex items-center justify-center">
              <NeonPhotoFrame
                src={classicImg}
                alt="Interactive Neon Photo Frame"
                color={activeColor}
                rounded={activeRounded}
                thickness={activeThickness}
                borderSize={activeBorderSize}
                glow={activeGlow}
                movement={activeMovement}
                speed={isPaused ? 0 : activeSpeed}
                style={{ width: "min(85vw, 260px)" }}
              />
            </div>

            {/* Quick Live Controls */}
            <div className="w-full bg-[#141312] border border-[#262320] rounded-xl p-3.5 space-y-2.5 text-xs font-mono">
              {/* Color Presets */}
              <div className="flex items-center justify-between">
                <span className="text-[#8C827A]">Color:</span>
                <div className="flex gap-1.5 items-center">
                  {[
                    { label: "Gold", hex: "#CC9149" },
                    { label: "Cyan", hex: "#00F0FF" },
                    { label: "Magenta", hex: "#FF007F" },
                    { label: "Emerald", hex: "#10B981" },
                  ].map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setActiveColor(preset.hex)}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        activeColor === preset.hex ? "scale-125 ring-2 ring-white" : "opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: preset.hex }}
                      title={preset.label}
                    />
                  ))}
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => setActiveColor(e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                    title="Custom Color"
                  />
                </div>
              </div>

              {/* Movement mode */}
              <div className="flex items-center justify-between">
                <span className="text-[#8C827A]">Movement:</span>
                <div className="flex gap-1 bg-[#1A1918] p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveMovement("continuous")}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      activeMovement === "continuous"
                        ? "bg-[#CC9149] text-black font-semibold"
                        : "text-[#8C827A] hover:text-white"
                    }`}
                  >
                    continuous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMovement("step")}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      activeMovement === "step"
                        ? "bg-[#CC9149] text-black font-semibold"
                        : "text-[#8C827A] hover:text-white"
                    }`}
                  >
                    step
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C827A]">Glow Intensity: {activeGlow}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={activeGlow}
                  onChange={(e) => setActiveGlow(Number(e.target.value))}
                  className="w-full accent-[#CC9149] h-1 bg-[#262320] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C827A]">Corner Roundness: {activeRounded}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={activeRounded}
                  onChange={(e) => setActiveRounded(Number(e.target.value))}
                  className="w-full accent-[#CC9149] h-1 bg-[#262320] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C827A]">Border Thickness: {activeThickness}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={activeThickness}
                  onChange={(e) => setActiveThickness(Number(e.target.value))}
                  className="w-full accent-[#CC9149] h-1 bg-[#262320] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C827A]">Beam Size (Length): {activeBorderSize}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={activeBorderSize}
                  onChange={(e) => setActiveBorderSize(Number(e.target.value))}
                  className="w-full accent-[#CC9149] h-1 bg-[#262320] rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C827A]">Speed (Duration): {activeSpeed}s</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={activeSpeed}
                  onChange={(e) => setActiveSpeed(Number(e.target.value))}
                  className="w-full accent-[#CC9149] h-1 bg-[#262320] rounded-lg cursor-pointer"
                />
              </div>

              {/* Pause / Play */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#201E1C] hover:bg-[#2A2724] text-[#E8DCC8] text-[11px] transition-colors"
                >
                  {isPaused ? <Play className="w-3 h-3 text-[#10B981]" /> : <Pause className="w-3 h-3 text-[#CC9149]" />}
                  <span>{isPaused ? "Resume Animation" : "Pause (Static)"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeonDemoSection;
