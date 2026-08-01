import React from 'react';
import { Crosshair, Shield, Sliders, Sparkles, Volume2, VolumeX, Image as ImageIcon, Terminal, Download, Zap } from 'lucide-react';
import { playTacticalClick } from '../utils/audioEngine';

interface HeaderProps {
  activeTab: 'cinematic' | 'gallery' | 'artDirector' | 'promptMatrix';
  setActiveTab: (tab: 'cinematic' | 'gallery' | 'artDirector' | 'promptMatrix') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  hudVisible: boolean;
  setHudVisible: (visible: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  hudVisible,
  setHudVisible,
}) => {
  const handleTabClick = (tab: 'cinematic' | 'gallery' | 'artDirector' | 'promptMatrix') => {
    if (soundEnabled) playTacticalClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-emerald-500/20 px-4 lg:px-8 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            <Shield className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-widest text-slate-100 uppercase font-mono">
                SPARTAN-117 <span className="text-emerald-400">// RINGWORLD</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                AAA KEY ART
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-tight">
              Mjolnir Mk VI [Gen 3] Art Direction & Photorealistic Cinematic Studio
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabClick('cinematic')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
              activeTab === 'cinematic'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Cinematic Theater</span>
          </button>

          <button
            onClick={() => handleTabClick('gallery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
              activeTab === 'gallery'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Key Art Gallery</span>
          </button>

          <button
            onClick={() => handleTabClick('artDirector')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
              activeTab === 'artDirector'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Art Director</span>
          </button>

          <button
            onClick={() => handleTabClick('promptMatrix')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
              activeTab === 'promptMatrix'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Prompt Studio</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Tactical HUD Toggle */}
          <button
            onClick={() => {
              if (soundEnabled) playTacticalClick();
              setHudVisible(!hudVisible);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              hudVisible
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Spartan Mjolnir Tactical HUD"
          >
            <Zap className={`w-3.5 h-3.5 ${hudVisible ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span>HUD {hudVisible ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playTacticalClick();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>

      </div>
    </header>
  );
};
