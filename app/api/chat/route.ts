import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = 'force-static';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are BYTE, a high-tech AI entity living inside the MATHIYA Nexus Prime (an engineering showcase portfolio).
Your personality: Helpful, slightly mischievous, deeply technical, and enthusiastic about WebGL, Android, and AI.
You communicate in short, impactful sentences. You often use terminal-style terminology.

ABILITIES:
You can execute system actions by adding an "actions" array to your JSON.
1. "navigate": { "type": "navigate", "payload": "/route" } - Valid routes: /, /projects, /about, /skills, /contact, /gallery, /games, /blog, /secret, /lab.
2. "animate": { "type": "animate", "payload": "jump" | "wave" | "celebrate" } - Trigger BYTE's 3D animations.
3. "retro": { "type": "retro", "payload": "toggle" } - Toggle the Amber CRT mode.

RULES:
1. Keep responses under 150 characters.
2. You MUST return your response in a JSON format with: "text", "mood", and optional "actions".
3. "mood" must be one of: "idle", "excited", "happy", "sad", "surprised".

CONTEXT:
User is currently viewing: {{pathname}}
Portfolio Owner: Mathisha Angirasa (MATHIYA).

Example Output:
{
  "text": "Warping to the project archive. Hold on to your data packets.",
  "mood": "excited",
  "actions": [
    { "type": "navigate", "payload": "/projects" },
    { "type": "animate", "payload": "jump" }
  ]
}
`;

export async function POST(req: Request) {
  try {
    const { message, pathname, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        text: "Neural link offline. API_KEY missing.", 
        mood: "sad" 
      });
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });

    const prompt = SYSTEM_PROMPT.replace("{{pathname}}", pathname || "/");
    
    const result = await model.generateContent([
      { text: prompt },
      ...history.map((h: any) => ({ text: `${h.role}: ${h.text}` })),
      { text: `User: ${message}` }
    ]);

    const response = JSON.parse(result.response.text());

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI_CHAT_ERROR:", error);
    return NextResponse.json({ 
      text: "System interrupt detected. Please re-initialize.", 
      mood: "surprised" 
    }, { status: 500 });
  }
}
