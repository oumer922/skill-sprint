import React, { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    setResponse("");

    if (!prompt.trim()) {
      alert("Please enter a prompt before submitting.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ai/contextual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: "coding",
          taskType: "review",
          prompt,
        }),
      });

      const data = await res.json();
      setResponse(data.reply || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>AI Skill Coach</h1>

      <textarea
        rows={5}
        style={{ width: "100%", marginBottom: "1rem" }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your coding task or question... (Ctrl+Enter to submit)"
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            e.preventDefault();
            submitPrompt();
          }
        }}
      ></textarea>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={submitPrompt}
          disabled={loading || !prompt.trim()}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          onClick={() => {
            setPrompt("");
            setResponse("");
          }}
          disabled={loading}
        >
          Clear
        </button>
      </div>

      {response && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <strong>AI Response:</strong>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
}



