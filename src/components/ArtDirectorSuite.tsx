import React, { useState } from 'react';
import { ArtDirectorParams, ArtDirectorCritique, PromptVariant } from '../types';
import { LIGHTING_PRESETS, ATMOSPHERE_PRESETS, POSE_PRESETS } from '../data/conceptArts';
import { Sparkles, Sliders, Terminal, Shield, Check, Copy, RefreshCw, Send, MessageSquare, Flame, Zap, Camera, Sun, Wind } from 'lucide-react';
import { playTacticalClick, playVisorPowerUp } from '../utils/audioEngine';

interface ArtDirectorSuiteProps {
  artParams: ArtDirectorParams;
  setArtParams: React.Dispatch<React.SetStateAction<ArtDirectorParams>>;
  soundEnabled: boolean;
  onApplyPromptToHero?: (prompt: string) => void;
}

export const ArtDirectorSuite: React.FC<ArtDirectorSuiteProps> = ({
  artParams,
  setArtParams,
  soundEnabled,
  onApplyPromptToHero,
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [loadingCritique, setLoadingCritique] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<ArtDirectorCritique | null>(null);
  const [matrixVariants, setMatrixVariants] = useState<PromptVariant[]>([]);
  const [loadingMatrix, setLoadingMatrix] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Call server-side Gemini endpoint for Art Director critique
  const handleRequestCritique = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (soundEnabled) playVisorPowerUp();

    setLoadingCritique(true);
    try {
      const res = await fetch('/api/art-director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery,
          currentParams: artParams,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCritiqueResult(data);
      } else {
        console.error('Art director error:', data);
      }
    } catch (err) {
      console.error('Failed to call art director API:', err);
    } finally {
      setLoadingCritique(false);
    }
  };

  // Generate 3 prompt variants
  const handleGenerateMatrix = async () => {
    if (soundEnabled) playTacticalClick();
    setLoadingMatrix(true);

    try {
      const res = await fetch('/api/generate-prompt-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artParams),
      });

      const data = await res.json();
      if (data?.variants) {
        setMatrixVariants(data.variants);
      }
    } catch (err) {
      console.error('Matrix generation error:', err);
    } finally {
      setLoadingMatrix(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    if (soundEnabled) playTacticalClick();
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded border border-amber-500/40 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              AAA SENIOR ART DIRECTOR SUITE
            </span>
            <span className="text-xs text-slate-400">GEMINI 3.6 FLASH INTEGRATED</span>
          </div>
          <h2 className="text-xl font-black text-slate-100 uppercase tracking-wide">
            ART DIRECTION WORKBENCH & PROMPT TUNER
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Tune guidance scale, atmospheric fog, crepuscular rays, armor battle wear, and camera lens dynamics. Ask our Senior Art Director AI for cinematic critique and customized 8K prompt strings.
          </p>
        </div>

        <button
          onClick={handleGenerateMatrix}
          disabled={loadingMatrix}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs tracking-wider transition shadow-lg shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loadingMatrix ? 'animate-spin' : ''}`} />
          <span>{loadingMatrix ? 'BUILDING MATRIX...' : 'GENERATE PROMPT MATRIX'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameter Controls */}
        <div className="lg:col-span-1 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            PARAMETER SLIDERS & CONTROLS
          </h3>

          {/* Guidance Scale (CFG) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Guidance Scale (CFG):
              </label>
              <span className="text-amber-400 font-bold">{artParams.guidanceScale}</span>
            </div>
            <input
              type="range"
              min="5"
              max="12"
              step="0.5"
              value={artParams.guidanceScale}
              onChange={(e) => setArtParams({ ...artParams, guidanceScale: parseFloat(e.target.value) })}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Recommended for diffusion models: 7.0 - 9.0 (optimal prompt adherence vs creativity)
            </p>
          </div>

          {/* Lighting Condition */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Lighting Condition:
            </label>
            <select
              value={artParams.lighting}
              onChange={(e) => setArtParams({ ...artParams, lighting: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              {LIGHTING_PRESETS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="Dusk Sunset Rays">Dusk Sunset Solar Flares</option>
              <option value="Volumetric High Sun">Volumetric High Noon Sky</option>
            </select>
          </div>

          {/* Atmospheric Weather */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" /> Atmosphere & Dust Particles:
            </label>
            <select
              value={artParams.weather}
              onChange={(e) => setArtParams({ ...artParams, weather: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              {ATMOSPHERE_PRESETS.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
              <option value="Heavy Smoke & Plasma Fire">Heavy Smoke & Plasma Fire</option>
            </select>
          </div>

          {/* Camera Lens */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-emerald-400" /> Camera Lens & Depth:
            </label>
            <select
              value={artParams.cameraLens}
              onChange={(e) => setArtParams({ ...artParams, cameraLens: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="35mm Anamorphic Lens, f/1.8">35mm Anamorphic Lens (f/1.8 Bokeh)</option>
              <option value="85mm Portrait Lens, Ultra Sharp">85mm Portrait Lens (Armor Detail Focus)</option>
              <option value="16mm Ultra-Wide Angle Lens">16mm Ultra-Wide Angle (Panoramic Vista)</option>
              <option value="Macro Detail Lens">Macro Close-Up Lens (Micro Scratch Focus)</option>
            </select>
          </div>

          {/* Armor Wear Level */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Armor Battle Damage:
            </label>
            <select
              value={artParams.armorWear}
              onChange={(e) => setArtParams({ ...artParams, armorWear: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
            >
              <option value="Heavy Battle Damage & Scratches">Heavy Battle Damage & Carbon Scoring</option>
              <option value="Pristine Factory Finish">Pristine Mk VI Armor Polish</option>
              <option value="Plasma Burn Scars & Scorched Metal">Plasma Burn Scars & Scorched Titanium</option>
            </select>
          </div>

          {/* Particle Density */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold text-xs flex items-center justify-between">
              <span>Particle FX Density:</span>
              <span className="text-emerald-400 uppercase">{artParams.particleDensity}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['low', 'medium', 'high', 'ultra'] as const).map((density) => (
                <button
                  key={density}
                  type="button"
                  onClick={() => setArtParams({ ...artParams, particleDensity: density })}
                  className={`py-1.5 text-[10px] font-bold uppercase rounded border transition ${
                    artParams.particleDensity === density
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (2 Cols): AI Art Director Consultation & Generated Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ask Art Director Assistant */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              CONSULT SENIOR ART DIRECTOR (AI ASSISTANT)
            </h3>

            <form onSubmit={handleRequestCritique} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g., How can I make the visor reflections look more cinematic in plasma storm light?"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loadingCritique}
                  className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs flex items-center gap-2 transition shrink-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loadingCritique ? 'ANALYZING...' : 'GET CRITIQUE'}</span>
                </button>
              </div>
            </form>

            {/* Critique Result Card */}
            {critiqueResult && (
              <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> SENIOR ART DIRECTOR CRITIQUE
                  </span>
                  <span className="text-[10px] text-slate-400">STATUS: APPROVED FOR PRODUCTION</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{critiqueResult.critique}"
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400">RECOMMENDED PROMPT STRING:</span>
                    <button
                      onClick={() => handleCopy(critiqueResult.recommendedPrompt, 'critique_prompt')}
                      className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                    >
                      {copiedText === 'critique_prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'critique_prompt' ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    "{critiqueResult.recommendedPrompt}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-1">RECOMMENDED NEGATIVES:</span>
                    <span className="text-slate-400 text-[11px]">{critiqueResult.negativePrompt}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">CAMERA / LENS REC:</span>
                    <span className="text-slate-400 text-[11px]">{critiqueResult.cameraSettings}</span>
                  </div>
                </div>

                {critiqueResult.conceptLore && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400 font-bold block mb-1 text-cyan-400">BATTLEFIELD CONCEPT LORE:</span>
                    <p className="text-slate-300 text-[11px] italic">{critiqueResult.conceptLore}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Prompt Matrix Variants Output */}
          {matrixVariants.length > 0 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                GENERATED PROMPT VARIANTS MATRIX
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {matrixVariants.map((variant, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 uppercase">{variant.name}</span>
                      <span className="text-[10px] text-slate-400">CFG: {variant.guidanceScale} | Style: {variant.style}</span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800 select-all">
                      "{variant.prompt}"
                    </p>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleCopy(variant.prompt, `matrix_${idx}`)}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        {copiedText === `matrix_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copiedText === `matrix_${idx}` ? 'COPIED' : 'COPY PROMPT'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
