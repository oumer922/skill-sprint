"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const handleSubmit = async () => {
    setQuiz("");

    const res = await fetch("http://localhost:3001/api/context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "quiz-user",
        skill: "quiz-maker",
        prompt: `Create a 5-question quiz on: ${topic}`,
      }),
    });

    const data = await res.json();
    setQuiz(data.output);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold">Quiz Maker</h1>
      <p className="text-muted-foreground mb-4">
        Enter a topic to generate a quiz.
      </p>

      <Input
        placeholder="E.g. JavaScript basics"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Button onClick={handleSubmit} className="mt-4">
        Generate Quiz
      </Button>

      {quiz && (
        <Card className="mt-6">
          <CardContent className="whitespace-pre-wrap p-4">
            {quiz}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
