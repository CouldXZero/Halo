import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroArtViewer } from './components/HeroArtViewer';
import { GalleryGrid } from './components/GalleryGrid';
import { ArtDirectorSuite } from './components/ArtDirectorSuite';
import { PromptMatrixBuilder } from './components/PromptMatrixBuilder';
import { INITIAL_CONCEPT_ARTS } from './data/conceptArts';
import { ConceptArt, ArtDirectorParams } from './types';
import { Shield, Sparkles, Terminal, Crosshair, Radio, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cinematic' | 'gallery' | 'artDirector' | 'promptMatrix'>('cinematic');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hudVisible, setHudVisible] = useState(true);
  const [selectedArt, setSelectedArt] = useState<ConceptArt>(INITIAL_CONCEPT_ARTS[0]);

  const [artParams, setArtParams] = useState<ArtDirectorParams>({
    lighting: 'Crepuscular Twilight',
    weather: 'Dust Motes & Plasma Sparks',
    pose: 'Dynamic Low-Angle Hero Stance',
    armorWear: 'Heavy Battle Damage & Scratches',
    environment: 'Ringworld Forerunner Monoliths',
    cameraLens: '35mm Anamorphic Lens, f/1.8',
    guidanceScale: 8.0,
    particleDensity: 'high',
    visorGlowColor: 'gold',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Subtle Sci-Fi Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        hudVisible={hudVisible}
        setHudVisible={setHudVisible}
      />

      {/* Body Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Quick Hero Teaser Banner when on non-cinematic tabs */}
        {activeTab !== 'cinematic' && (
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <img
                src={selectedArt.imagePath}
                alt={selectedArt.title}
                referrerPolicy="no-referrer"
                className="w-16 h-10 object-cover rounded-lg border border-emerald-500/30"
              />
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">ACTIVE THEATER KEY ART</span>
                <h3 className="text-xs font-bold text-slate-200">{selectedArt.title}</h3>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('cinematic')}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>RETURN TO CINEMATIC THEATER</span>
            </button>
          </div>
        )}

        {/* Cinematic Viewport Tab */}
        {activeTab === 'cinematic' && (
          <section className="space-y-6">
            <HeroArtViewer
              conceptArt={selectedArt}
              hudVisible={hudVisible}
              soundEnabled={soundEnabled}
              artParams={artParams}
            />

            {/* Quick Gallery Carousel Selector */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  SELECT CINEMATIC SHOT
                </span>
                <span className="text-[10px] text-slate-400">4 HIGH-RESOLUTION 8K KEY ARTS GENERATED</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {INITIAL_CONCEPT_ARTS.map((art) => {
                  const isSelected = selectedArt.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArt(art)}
                      className={`relative aspect-[16/9] rounded-xl overflow-hidden border transition duration-200 text-left group ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                          : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={art.imagePath}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-slate-200 truncate block">
                        {art.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <GalleryGrid
            conceptArts={INITIAL_CONCEPT_ARTS}
            selectedArt={selectedArt}
            onSelectArt={(art) => {
              setSelectedArt(art);
              setActiveTab('cinematic');
            }}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Art Director Tab */}
        {activeTab === 'artDirector' && (
          <ArtDirectorSuite
            artParams={artParams}
            setArtParams={setArtParams}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Prompt Studio Tab */}
        {activeTab === 'promptMatrix' && (
          <PromptMatrixBuilder
            artParams={artParams}
            soundEnabled={soundEnabled}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-16 py-8 bg-slate-950 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span>PROJECT: RINGWORLD // MA37 SPARTAN-117 CONCEPT STUDIO</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>RENDER ENGINE: GEMINI 8K ULTRA HD</span>
            <span>•</span>
            <span>SYSTEM STATUS: ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
