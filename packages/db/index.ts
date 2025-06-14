import type { AiContextInput } from "@skill-sprint/shared-types";

export async function logPrompt(input: AiContextInput, output: string): Promise<void> {
  console.log("Logged prompt:", input.prompt, "Output:", output);
  // In real usage, you’d insert into your database here
}
