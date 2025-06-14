import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    setResponse("");

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
        placeholder="Enter your coding task or question..."
      />
      <button onClick={submitPrompt} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {response && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <strong>AI Response:</strong>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
}
