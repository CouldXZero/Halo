import { ConceptArt } from '../types';

import heroArtImg from '../assets/images/spartan_hero_art_1785550062152.jpg';
import combatCloseImg from '../assets/images/spartan_combat_close_1785550074872.jpg';
import ringworldImg from '../assets/images/ringworld_landscape_1785550087245.jpg';
import plasmaStormImg from '../assets/images/spartan_plasma_storm_1785550098902.jpg';

export const INITIAL_CONCEPT_ARTS: ConceptArt[] = [
  {
    id: 'spartan-hero-117',
    title: 'MA37 SPARTAN-117: HEROIC DEPLOYMENT',
    subtitle: 'Mjolnir Mark VI (Gen 3) Battle-Worn Olive Green & Forerunner Megaliths',
    imagePath: heroArtImg,
    prompt: 'Fotorrealista, cinematográfico, 8K, hyperdetallado, un imponente soldado espacial MA37 SPARTAN-117 con armadura Mjolnir verde oliva desgastada, visera dorada reflectante. El soldado está en una pose de combate dinámico, empuñando un rifle de asalto futurista con mira holográfica. Al fondo, un paisaje alienígena con un mundo anillo (Halo) elevándose sobre nubes brillantes, con estructuras flotantes Forerunner. Iluminación crepuscular dramática con rayos de sol y destellos de lente. Texturas ultra detalladas, desgaste por batalla, chispas y partículas de polvo en el aire. Estilo de cinemática de juego AAA, similar a Halo Infinite. Alta resolución, increíblemente detallado, nivel de arte conceptual.',
    negativePrompt: 'dibujo animado, estilo cómic, baja resolución, borroso, distorsionado, cuerpo deforme, plastificado, baja calidad, marca de agua',
    category: 'Key Art',
    resolution: '8K Ultra HD',
    guidanceScale: 8.0,
    aspect: '16:9',
    armorDetails: 'Mjolnir Mark VI Gen 3 with micro-scratches, carbon scoring along shoulder pauldrons, gold polarized reflective visor with tactical HUD highlights.',
    environmentLore: 'Sector 04 Ringworld Horizon, featuring levitating Forerunner stone monoliths emitting soft teal containment beams over a sea of twilight clouds.',
    tags: ['Spartan-117', 'MA37 Assault Rifle', 'Mjolnir Armor', 'Ringworld', 'Forerunner', '8K Key Art']
  },
  {
    id: 'spartan-combat-close',
    title: 'FIRST-PERSON COMBAT ENGAGEMENT',
    subtitle: 'Close-Up Tactical Targeting & Visor Reflection',
    imagePath: combatCloseImg,
    prompt: 'Photorealistic close-up of MA37 SPARTAN-117 soldier in battle-damaged olive green Mjolnir power armor, gold reflective visor reflecting an explosion, aiming futuristic assault rifle with holographic display, intense battle atmosphere, floating plasma sparks, atmospheric smoke, hyperrealistic metal texture, AAA sci-fi FPS cinematic screenshot 8K',
    negativePrompt: 'blurry visor, deformed rifle, cartoonish textures, flat lighting, 3D low poly, muted colors',
    category: 'Close-up Combat',
    resolution: '8K Ultra HD',
    guidanceScale: 8.5,
    aspect: '16:9',
    armorDetails: 'Deep gouges and heat discoloration from plasma impacts. Holographic ammo counter reading 32/32 live rounds on the MA37 scope.',
    environmentLore: 'Close combat perimeter near a Forerunner power relay. Volumetric smoke and airborne embers from distant Covenant plasma mortar strikes.',
    tags: ['Close Combat', 'Visor Reflection', 'Holographic Scope', 'Plasma Embers', 'Damage Detail']
  },
  {
    id: 'ringworld-landscape',
    title: 'FORERUNNER RINGWORLD PANORAMA',
    subtitle: 'Endless Structural Arch curving into the Sky',
    imagePath: ringworldImg,
    prompt: 'Panoramic photorealistic concept art of a mega structure Halo Ringworld curving endlessly into the sky, towering megalithic alien Forerunner stone structures floating above sea of glowing clouds, distant Covenant warship explosions in vibrant twilight sky, cinematic lens flare, 8K wallpaper',
    negativePrompt: 'low resolution, blurry background, flat clouds, simple architecture, missing ring curve',
    category: 'Environment',
    resolution: '16K Master',
    guidanceScale: 7.5,
    aspect: '16:9',
    armorDetails: 'Scale perspective showing the colossal breadth of the artificial ecosystem and structural integrity of the ring superstructure.',
    environmentLore: 'Atmospheric terraforming zone on Installation 07. The curving landmass extends over 10,000 km into the upper zenith.',
    tags: ['Vista', 'Ringworld', 'Forerunner Monolith', 'Twilight', 'Nebula', 'Mega Structure']
  },
  {
    id: 'spartan-plasma-storm',
    title: 'COVENANT WARZONE SKIRMISH',
    subtitle: 'Plasma Discharge & Kinetic Firefight',
    imagePath: plasmaStormImg,
    prompt: 'Cinematic action concept art of MA37 SPARTAN-117 firing futuristic assault rifle in intense plasma storm on alien ringworld, brilliant blue and purple energy blasts, battle-worn olive green armor, glowing gold visor, dynamic combat pose, cinematic motion blur, 8K resolution AAA shooter screenshot',
    negativePrompt: 'static pose, low contrast, oversaturated noise, deformed weapon, unnatural limbs',
    category: 'Action Skirmish',
    resolution: '8K Ultra HD',
    guidanceScale: 8.0,
    aspect: '16:9',
    armorDetails: 'High-velocity muzzle flash illuminating the chest plate. Reactive kinetic shields flickering with cyan energy field dampening.',
    environmentLore: 'Nighttime plasma storm over the Forerunner spire valley. Covenant Spirit dropships depositing Elite Ultra shock troops in distance.',
    tags: ['Skirmish', 'Plasma Storm', 'Muzzle Flash', 'Covenant Firefight', 'Dynamic Pose']
  }
];

export const LIGHTING_PRESETS = [
  { id: 'twilight', name: 'Crepuscular Twilight', desc: 'Dramatic gold/purple rays breaking through cloud cover with anamorphic lens flares' },
  { id: 'plasma_storm', name: 'Plasma Storm Night', desc: 'Electric cyan & cobalt energy bursts illuminating dark metallic surfaces' },
  { id: 'orbital_dawn', name: 'Orbital Ring Dawn', desc: 'High-contrast solar flare rising along the inner curving ring horizon' },
  { id: 'alien_eclipse', name: 'Nebular Eclipse', desc: 'Deep violet background nebula casting mysterious rim-lighting on Mjolnir plates' }
];

export const ATMOSPHERE_PRESETS = [
  { id: 'sparks_dust', name: 'Dust Motes & Plasma Sparks', desc: 'Floating airborne particles reflecting tactical helmet lights and laser scopes' },
  { id: 'sandstorm', name: 'Titanium Dust Storm', desc: 'Volumetric particulate fog obscuring distant Forerunner structures' },
  { id: 'rain_ember', name: 'Acid Rain & Carbon Embers', desc: 'Raindrops sizzle on heated armor plates with glowing embers drifting up' }
];

export const POSE_PRESETS = [
  { id: 'dynamic_combat', name: 'Dynamic Low-Angle Hero', desc: 'Spartan-117 braced with rifle aimed slightly off-center for maximum tactical impact' },
  { id: 'reloading_cover', name: 'High-Octane Firefight', desc: 'Tactical stride through exploding terrain, rifle ready with live holographic HUD' },
  { id: 'standing_watch', name: 'Sentry Megalith Watch', desc: 'Imposing front-facing stance overlooking the vast ringworld expanse' }
];
