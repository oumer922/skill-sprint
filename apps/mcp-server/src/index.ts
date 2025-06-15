import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CohereClient } from "cohere-ai";
import { logPrompt } from "@skill-sprint/db";
import type { AiContextInput } from "@skill-sprint/shared-types";

dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/context", async (req, res) => {
  const input = req.body as AiContextInput;

  if (!input.prompt || !input.user || !input.skill) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await cohere.chat({
  model: "command-r", // or "command-r-plus"
  message: input.prompt,
  temperature: 0.7,
  maxTokens: 300, // ✅ fixed key name
});


    const output = response.text?.trim() || "⚠️ No response from Cohere.";

    await logPrompt(input, output);
    res.json({ output });
  } catch (err: any) {
    console.error("Cohere error:", err);
    res.status(500).json({
      error: "Failed to get response from Cohere.",
      detail: err.message,
    });
  }
});

app.listen(3001, () =>
  console.log("🚀 MCP Server with Cohere running at http://localhost:3001")
);
