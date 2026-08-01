import React, { useState, useEffect, useRef } from 'react';
import { ConceptArt, ArtDirectorParams } from '../types';
import { Crosshair, Eye, Filter, Info, Maximize2, Sparkles, Copy, Check, Download, Layers, Radio, Shield, Zap } from 'lucide-react';
import { playTacticalClick, playVisorPowerUp, playPlasmaDischarge } from '../utils/audioEngine';

interface HeroArtViewerProps {
  conceptArt: ConceptArt;
  hudVisible: boolean;
  soundEnabled: boolean;
  artParams: ArtDirectorParams;
  onSelectArt?: (art: ConceptArt) => void;
}

export const HeroArtViewer: React.FC<HeroArtViewerProps> = ({
  conceptArt,
  hudVisible,
  soundEnabled,
  artParams,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'normal' | 'cinematic' | 'plasma' | 'thermal' | 'hdr'>('cinematic');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
    }> = [];

    const particleCount = artParams.particleDensity === 'ultra' ? 90 : artParams.particleDensity === 'high' ? 60 : 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4 + 0.2,
        speedY: (Math.random() - 0.5) * 0.3 - 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : Math.random() > 0.5 ? 'rgba(16, 185, 129, ' : 'rgba(59, 130, 246, ',
      });
    }

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [artParams.particleDensity]);

  const handleCopyPrompt = () => {
    if (soundEnabled) playTacticalClick();
    navigator.clipboard.writeText(conceptArt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hotspots = [
    {
      id: 'armor',
      top: '38%',
      left: '46%',
      title: 'Mjolnir Mark VI Armor Wear',
      desc: 'Battle-scratched olive green plating with thermal blast erosion and reinforced titanium alloy matrix.'
    },
    {
      id: 'visor',
      top: '25%',
      left: '49%',
      title: 'Polarized Gold Visor',
      desc: 'Reflective gold-plated HUD visor with polarized solar filters showing Forerunner ring structure geometry.'
    },
    {
      id: 'rifle',
      top: '52%',
      left: '60%',
      title: 'MA37 Assault Rifle & Scope',
      desc: 'Heavy 7.62x51mm kinetic assault rifle with live integrated holographic ammo counter & targeting reticle.'
    },
    {
      id: 'monolith',
      top: '28%',
      left: '78%',
      title: 'Floating Forerunner Monolith',
      desc: 'Ancient metallic Megalith hovering above cloud cover, emitting hard-light containment energy.'
    }
  ];

  // Filter styles
  const getFilterStyle = () => {
    switch (activeFilter) {
      case 'cinematic':
        return 'contrast-110 brightness-105 saturate-110 sepia-[0.08]';
      case 'plasma':
        return 'contrast-125 saturate-150 hue-rotate-[15deg] brightness-105';
      case 'thermal':
        return 'contrast-150 invert-[0.1] saturate-200 hue-rotate-[160deg]';
      case 'hdr':
        return 'contrast-120 saturate-125 brightness-110 drop-shadow-2xl';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Top Bar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            LIVE VIEWPORT
          </span>
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wide">
            {conceptArt.title}
          </h2>
        </div>

        {/* Filter Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Tone Map:
          </span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['cinematic', 'hdr', 'plasma', 'thermal', 'normal'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  if (soundEnabled) playTacticalClick();
                  setActiveFilter(mode);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono rounded uppercase transition ${
                  activeFilter === mode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className={`relative w-full min-h-[460px] lg:min-h-[580px] bg-slate-950 flex items-center justify-center overflow-hidden transition-all duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}>
        {/* Background Key Art Image */}
        <img
          src={conceptArt.imagePath}
          alt={conceptArt.title}
          referrerPolicy="no-referrer"
          onClick={() => {
            if (soundEnabled) playVisorPowerUp();
            setIsZoomed(!isZoomed);
          }}
          className={`w-full h-full object-cover transition-all duration-500 ${getFilterStyle()}`}
        />

        {/* Dynamic Lens Flare / Sunbeam Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-amber-500/5 to-emerald-500/10 mix-blend-screen" />

        {/* Particles Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10"
        />

        {/* Tactical SPARTAN Visor HUD Overlay */}
        {hudVisible && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-10 font-mono text-emerald-400 select-none">
            {/* Corner HUD Framing */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-500/60" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-500/60" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-500/60" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-500/60" />

            {/* Top HUD Line */}
            <div className="flex items-center justify-between">
              <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-emerald-500/40 text-xs flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Shield className="w-4 h-4 text-emerald-400" /> SHIELDS: 100%
                </span>
                <div className="w-24 h-2 bg-slate-800 rounded overflow-hidden">
                  <div className="w-full h-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded border border-emerald-500/40 text-xs flex items-center gap-4">
                <span className="text-amber-400 font-bold">SPARTAN-117</span>
                <span className="text-slate-400">MA37 ICWS</span>
                <span className="text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  32 / 32 LIVE
                </span>
              </div>
            </div>

            {/* Center Crosshair & Target Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
              <div className="relative w-24 h-24 border border-emerald-500/40 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-16 h-16 border border-dashed border-emerald-400/60 rounded-full" />
                <Crosshair className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="mt-2 text-[10px] bg-slate-950/90 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40 font-mono">
                TARGET: FORERUNNER STRUCTURE [LOCKED]
              </span>
            </div>

            {/* Bottom HUD Bar */}
            <div className="flex items-end justify-between">
              {/* Radar Motion Tracker */}
              <div className="relative w-28 h-28 bg-slate-950/85 backdrop-blur-md rounded-full border border-emerald-500/50 p-2 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
                <div className="absolute inset-2 rounded-full border border-emerald-500/30" />
                <div className="absolute w-full h-[1px] bg-emerald-500/30" />
                <div className="absolute h-full w-[1px] bg-emerald-500/30" />
                {/* Center Spartan Dot */}
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                {/* Friendly / Hostile Dots */}
                <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span className="absolute bottom-1 text-[8px] font-bold text-emerald-400">MOTION TRACKER</span>
              </div>

              {/* Coordinates and System Specs */}
              <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded border border-emerald-500/40 text-[11px] space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">GRID LOC:</span>
                  <span className="text-slate-200 font-bold">INSTALLATION 07 // SEC-4</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">GUIDANCE SCALE:</span>
                  <span className="text-amber-400 font-bold">{conceptArt.guidanceScale} / 10</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">RES FORMAT:</span>
                  <span className="text-emerald-400 font-bold">{conceptArt.resolution}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotspot Pins */}
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            style={{ top: spot.top, left: spot.left }}
            className="absolute z-30"
          >
            <button
              onClick={() => {
                if (soundEnabled) playPlasmaDischarge();
                setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
              }}
              className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/80 border-2 border-amber-300 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.6)] hover:scale-125 transition duration-200"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <Info className="w-3.5 h-3.5 text-slate-950 font-black" />
            </button>

            {/* Hotspot Card */}
            {activeHotspot === spot.id && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 p-3 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-xl shadow-2xl z-40 text-left font-mono">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">{spot.title}</h4>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-slate-400 hover:text-white text-[10px]"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{spot.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Metadata & Prompt Bar */}
      <div className="p-6 bg-slate-900/90 border-t border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-slate-800 text-amber-400 rounded text-xs font-mono font-bold border border-amber-500/30">
                PROMPT SPECIFICATION (PARAMETRIZED)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Resolution: {conceptArt.resolution} ({conceptArt.aspect})
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed select-all">
              "{conceptArt.prompt}"
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition shadow-lg ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'PROMPT COPIED!' : 'COPY PROMPT'}</span>
            </button>

            <a
              href={conceptArt.imagePath}
              download={`${conceptArt.id}-spartan-8k-key-art.jpg`}
              onClick={() => soundEnabled && playTacticalClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-mono font-bold transition border border-slate-700"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>EXPORT 8K</span>
            </a>
          </div>
        </div>

        {/* Armor & Environment Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60 font-mono text-xs">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block font-bold text-[11px] mb-1 text-emerald-400">
              🛡️ MJOLNIR ARMOR SPECIFICATION
            </span>
            <p className="text-slate-300">{conceptArt.armorDetails}</p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block font-bold text-[11px] mb-1 text-amber-400">
              🌌 RINGWORLD BATTLEFIELD ENVIRONMENT
            </span>
            <p className="text-slate-300">{conceptArt.environmentLore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
