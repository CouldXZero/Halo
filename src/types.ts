export interface ConceptArt {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  prompt: string;
  negativePrompt: string;
  category: 'Key Art' | 'Close-up Combat' | 'Environment' | 'Action Skirmish';
  resolution: '8K Ultra HD' | '4K UHD' | '16K Master';
  guidanceScale: number;
  aspect: string;
  armorDetails: string;
  environmentLore: string;
  tags: string[];
}

export interface ArtDirectorParams {
  lighting: string;
  weather: string;
  pose: string;
  armorWear: string;
  environment: string;
  cameraLens: string;
  guidanceScale: number;
  particleDensity: 'low' | 'medium' | 'high' | 'ultra';
  visorGlowColor: 'gold' | 'amber' | 'emerald' | 'cobalt';
}

export interface ArtDirectorCritique {
  critique: string;
  recommendedPrompt: string;
  negativePrompt: string;
  lightingPreset: string;
  cameraSettings: string;
  conceptLore: string;
}

export interface PromptVariant {
  name: string;
  prompt: string;
  negativePrompt: string;
  guidanceScale: number;
  style: string;
}
