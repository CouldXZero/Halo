import React, { useState } from 'react';
import { ArtDirectorParams } from '../types';
import { Terminal, Copy, Check, Shield, HelpCircle, Sparkles, Sliders } from 'lucide-react';
import { playTacticalClick } from '../utils/audioEngine';

interface PromptMatrixBuilderProps {
  artParams: ArtDirectorParams;
  soundEnabled: boolean;
}

export const PromptMatrixBuilder: React.FC<PromptMatrixBuilderProps> = ({
  artParams,
  soundEnabled,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const masterPrompt = `Fotorrealista, cinematográfico, 8K, hyperdetallado, un imponente soldado espacial MA37 SPARTAN-117 con armadura Mjolnir verde oliva desgastada, visera dorada reflectante. El soldado está en una pose de combate dinámico (${artParams.pose}), empuñando un rifle de asalto futurista con mira holográfica. Al fondo, un paisaje alienígena con un mundo anillo (Halo) elevándose sobre nubes brillantes, con estructuras flotantes Forerunner. Iluminación ${artParams.lighting} con rayos de sol y destellos de lente. Texturas ultra detalladas (${artParams.armorWear}), atmósfera de ${artParams.weather}, chispas y partículas de polvo en el aire. Cámara con ${artParams.cameraLens}. Estilo de cinemática de juego AAA, similar a Halo Infinite. Alta resolución, increíblemente detallado, nivel de arte conceptual.`;

  const masterNegativePrompt = `dibujo animado, estilo cómic, baja resolución, borroso, distorsionado, cuerpo deforme, plastificado, baja calidad, marca de agua, baja poligonización, manos deformes, colores planos, sobre-saturado`;

  const handleCopy = (text: string, id: string) => {
    if (soundEnabled) playTacticalClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Studio Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-black text-slate-100 uppercase tracking-wide">
            PROMPT SPECIFICATION & EXPORT STUDIO
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Ready-to-use parameter strings formatted for Google AI Studio, Midjourney, and Stable Diffusion. Includes guidance scale bounds, negative prompt exclusions, and lighting modifiers.
        </p>
      </div>

      {/* Master Parameter Prompt Card */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              MASTER PHOTOREALISTIC AAA PROMPT
            </h3>
            <span className="text-[11px] text-slate-400">Target Model: Gemini Image / Imagen 3 / Midjourney v6</span>
          </div>

          <button
            onClick={() => handleCopy(masterPrompt, 'master')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
              copiedId === 'master'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
            }`}
          >
            {copiedId === 'master' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedId === 'master' ? 'COPIED TO CLIPBOARD' : 'COPY MASTER PROMPT'}</span>
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono select-all">
          "{masterPrompt}"
        </div>

        {/* Negative Prompt */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase">NEGATIVE PROMPT EXCLUSIONS:</span>
            <button
              onClick={() => handleCopy(masterNegativePrompt, 'negative')}
              className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
            >
              {copiedId === 'negative' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedId === 'negative' ? 'COPIED' : 'COPY NEGATIVES'}</span>
            </button>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 select-all">
            "{masterNegativePrompt}"
          </div>
        </div>
      </div>

      {/* Guidance Scale & Parameter Optimization Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4" /> GUIDANCE SCALE (CFG) TUNING GUIDE
          </h4>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-emerald-400">Values 7.0 - 9.0:</strong> Optimal balance between photorealistic fidelity and creative lighting dynamics.
            </li>
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-amber-400">Values &gt; 10.0:</strong> Stronger prompt enforcement, may produce higher contrast metal textures and sharper HUD edges.
            </li>
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-cyan-400">Values &lt; 6.5:</strong> Dreamier atmospheric volumetric haze, softer particle glow.
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> ART DIRECTOR PRO-TIPS
          </h4>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-slate-200">Refine Armor Wear:</strong> Mention "carbon scoring along shoulder pauldrons" for realistic heat damage.
            </li>
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-slate-200">Refine Visor:</strong> Use "polarized gold reflective visor with tactical HUD elements".
            </li>
            <li className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <strong className="text-slate-200">Cinematic Lighting:</strong> Specify "crepuscular sunset rays breaking over Forerunner megaliths".
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
