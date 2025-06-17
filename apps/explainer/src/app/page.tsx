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
  // Prevent submission if the input is empty or whitespace
  if (!prompt.trim()) return;

  // Set loading state to true to indicate that a request is in progress
  setLoading(true);

  // Clear any existing response from the UI
  setResponse("");

  try {
    // Send a POST request to the backend API with the prompt and metadata
    const res = await fetch("http://localhost:3001/api/context", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify({
        prompt,           // The user input to process
        user: "code-reviewer", // Arbitrary user identifier
        skill: "review",       // Type of processing or skill context
      }),
    });

    // Check if the response is OK (status 200–299)
    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    // Parse the JSON response
    const data = await res.json();

    // Set the result from the server (fallback if empty)
    setResponse(data.output || "⚠️ No response");

  } catch (error: any) {
    // Handle network or parsing errors
    console.error("Submission error:", error);
    setResponse(`❌ Error: ${error.message || "Something went wrong"}`);
  } finally {
    // Always reset the loading state
    setLoading(false);
  }
};


  return (
    <main className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Explainer</h1>
      <Textarea
        value={prompt}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPrompt(e.target.value)}
        placeholder="Enter a concept you'd like explained."
        className="min-h-[120px]"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Explaining..." : "Submit"}
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
