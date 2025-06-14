// packages/mcp-adapter/index.ts
import type { AiContextInput } from "@skill-sprint/shared-types";

export function formatPrompt(input: AiContextInput): string {
  return `${input.user} wants to learn ${input.skill}. Prompt: ${input.prompt}`;
}
