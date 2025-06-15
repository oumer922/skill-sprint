"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CodeReviewer() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    const res = await fetch("http://localhost:3001/api/context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        user: "code-reviewer",
        skill: "review",
      }),
    });

    const data = await res.json();
    setResponse(data.output || "⚠️ No response");
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Code Reviewer</h1>
      <Textarea
        value={prompt}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPrompt(e.target.value)}
        placeholder="Paste your code or write a prompt..."
        className="min-h-[120px]"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Reviewing..." : "Submit"}
      </Button>

      {response && (
        <Card>
          <CardContent className="p-4 whitespace-pre-wrap">
            {response}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
