import React, { useState } from 'react';
import { ConceptArt } from '../types';
import { Check, Copy, ExternalLink, Maximize2, Shield, Sparkles, Tag, Eye } from 'lucide-react';
import { playTacticalClick } from '../utils/audioEngine';

interface GalleryGridProps {
  conceptArts: ConceptArt[];
  selectedArt: ConceptArt;
  onSelectArt: (art: ConceptArt) => void;
  soundEnabled: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  conceptArts,
  selectedArt,
  onSelectArt,
  soundEnabled,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Key Art', 'Close-up Combat', 'Environment', 'Action Skirmish'];

  const filteredArts = filterCategory === 'All'
    ? conceptArts
    : conceptArts.filter((item) => item.category === filterCategory);

  const handleCopy = (art: ConceptArt, e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) playTacticalClick();
    navigator.clipboard.writeText(art.prompt);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            AAA CONCEPT ART GALLERY
          </h3>
          <p className="text-xs text-slate-400">
            High-Resolution Key Art, Environment Vistas & Tactical Combat Cinematically Rendered
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (soundEnabled) playTacticalClick();
                setFilterCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                filterCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Concept Art Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArts.map((art) => {
          const isSelected = selectedArt.id === art.id;
          return (
            <div
              key={art.id}
              onClick={() => {
                if (soundEnabled) playTacticalClick();
                onSelectArt(art);
              }}
              className={`group relative bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Image Thumbnail Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={art.imagePath}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30 uppercase">
                    {art.category}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold rounded border border-amber-500/30">
                    {art.resolution}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-bold rounded border border-slate-800">
                    CFG: {art.guidanceScale}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (soundEnabled) playTacticalClick();
                      onSelectArt(art);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:bg-emerald-400 transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>INSPECT THEATER</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide group-hover:text-emerald-400 transition">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {art.subtitle}
                  </p>
                </div>

                {/* Prompt Snippet Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 text-xs line-clamp-2">
                  "{art.prompt}"
                </div>

                {/* Tags and Copy Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {art.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => handleCopy(art, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition border border-slate-700"
                  >
                    {copiedId === art.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{copiedId === art.id ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
