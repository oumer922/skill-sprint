import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { logPrompt } from "@skill-sprint/db";
import type { AiContextInput } from "@skill-sprint/shared-types";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

app.post("/api/context", async (req: Request, res: Response) => {
  const input = req.body as AiContextInput;

  if (!input.prompt || !input.user || !input.skill) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: input.prompt }] }],
      }),
    });

    const data = (await geminiRes.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Gemini gave no response.";

    await logPrompt(input, output);
    res.json({ output });
  } catch (err: any) {
    console.error("Gemini error:", err);
    res.status(500).json({
      error: "Failed to get response from Gemini.",
      detail: err.message,
    });
  }
});

app.listen(3001, () =>
  console.log("🚀 MCP Server with Gemini running at http://localhost:3001")
);
