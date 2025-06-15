"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LanguageHelperPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    setResponse("");

    const res = await fetch("http://localhost:3001/api/context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        user: "language-helper",
        skill: "language",
      }),
    });

    const data = await res.json();
    setResponse(data.output);
  }

  return (
    <main className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Language Helper</h1>

      <Textarea
        placeholder="Enter text to correct grammar, rewrite, or translate..."
        className="w-full max-w-xl"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button onClick={handleSubmit}>Submit</Button>

      {response && (
        <Card className="w-full max-w-xl mt-4">
          <CardContent className="p-4 whitespace-pre-wrap">
            {response}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
