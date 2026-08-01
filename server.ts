import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client on server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API endpoint for Art Director AI Feedback & Lore Generation
  app.post("/api/art-director", async (req, res) => {
    try {
      const { userQuery, currentParams } = req.body;

      const systemInstruction = `You are a Senior Art Director at a legendary AAA video game studio, specialized in hard sci-fi military aesthetics, power armor design, and grand ringworld environments inspired by Halo, Destiny 2, and Star Wars Battlefront.
Your task is to provide expert critique, visual prompt recommendations, and lore-rich concept notes for the key art of MA37 SPARTAN-117.

Speak with dramatic, authoritative, creative art director tone. Focus on lighting (crepuscular rays, volumetric fog, rim lighting), texture wear (scratches, heat discoloration, carbon scoring), composition (rule of thirds, low-angle hero framing), and environmental storytelling (floating Forerunner monoliths, Covenant warship slipspace ruptures).

Always return clean structured JSON with:
{
  "critique": "Professional art director feedback on the current setup",
  "recommendedPrompt": "Fully engineered 8K photorealistic prompt string",
  "negativePrompt": "Terms to exclude (e.g., cartoon, low resolution, plastic armor)",
  "lightingPreset": "Suggested lighting condition (e.g., Crepuscular Dawn, Plasma Storm, Orbital Eclipse)",
  "cameraSettings": "e.g., 35mm Anamorphic Lens, f/1.8, 1/2000s shutter, cinematic grain",
  "conceptLore": "Short epic lore snippet describing Spartan-117 in this exact battlefield scene"
}`;

      const prompt = `Current Art Direction Configuration:
- Lighting: ${currentParams?.lighting || 'Twilight Sunbeams'}
- Atmosphere: ${currentParams?.weather || 'Dust Motes & Sparks'}
- Pose: ${currentParams?.pose || 'Dynamic Combat Stance with MA37 Rifle'}
- Armor Wear: ${currentParams?.armorWear || 'Heavy Battle Damage'}
- Environment: ${currentParams?.environment || 'Ringworld Forerunner Monoliths'}
- Guidance Scale: ${currentParams?.guidanceScale || 8}

User request / question to Art Director: ${userQuery || 'Analyze this shot and optimize it for a 4K/8K AAA marketing hero asset.'}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Error in /api/art-director:", error);
      res.status(500).json({
        error: "Failed to generate Art Director feedback",
        details: error.message,
      });
    }
  });

  // API endpoint for prompt generator matrix
  app.post("/api/generate-prompt-matrix", async (req, res) => {
    try {
      const { lighting, atmosphere, pose, armorWear, environment, cameraLens } = req.body;

      const prompt = `Generate 3 specialized prompt variants for a photorealistic 8K AAA Sci-Fi game key art based on:
Subject: MA37 SPARTAN-117 in olive green Mjolnir armor with glowing reflective gold visor.
Parameters:
- Lighting: ${lighting}
- Atmosphere: ${atmosphere}
- Combat Stance: ${pose}
- Armor Wear: ${armorWear}
- Environment: ${environment}
- Lens: ${cameraLens}

Return JSON format:
{
  "variants": [
    {
      "name": "Cinematic Hero Shot",
      "prompt": "Full string...",
      "negativePrompt": "Negative prompt...",
      "guidanceScale": 8,
      "style": "Ultra-detailed AAA Key Art"
    },
    {
      "name": "Action Skirmish Closeup",
      "prompt": "Full string...",
      "negativePrompt": "Negative prompt...",
      "guidanceScale": 8.5,
      "style": "FPS First-Person Combat POV"
    },
    {
      "name": "Panoramic Ringworld Vista",
      "prompt": "Full string...",
      "negativePrompt": "Negative prompt...",
      "guidanceScale": 7.5,
      "style": "Environment Concept Art"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Error in /api/generate-prompt-matrix:", error);
      res.status(500).json({ error: "Failed to generate prompt matrix", details: error.message });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
