"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    setFeedback("");

    const res = await fetch("http://localhost:3001/api/context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "writer",
        skill: "writing-coach",
        prompt: `Give constructive feedback on this writing draft:\n\n${draft}`,
      }),
    });

    const data = await res.json();
    setFeedback(data.output);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold">Writing Coach</h1>
      <p className="text-muted-foreground mb-4">
        Paste your writing draft to get constructive feedback.
      </p>

      <Textarea
        rows={8}
        placeholder="Paste your text here..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />

      <Button onClick={handleSubmit} className="mt-4">
        Get Feedback
      </Button>

      {feedback && (
        <Card className="mt-6">
          <CardContent className="whitespace-pre-wrap p-4">
            {feedback}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
