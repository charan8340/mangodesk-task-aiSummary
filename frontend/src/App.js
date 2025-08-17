import { useState } from "react";

function App() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [recipients, setRecipients] = useState("");

  // ✅ Use env var in prod, fallback to localhost in dev
  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const generateSummary = async () => { 
    const res = await fetch(`${API_URL}generate-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, instruction }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  const sendEmail = async () => {
    const res = await fetch(`${API_URL}send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary, recipients: recipients.split(",") }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Meeting Summarizer</h2>

      <textarea
        placeholder="Paste transcript here"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={6}
        style={{ width: "100%" }}
      />

      <input
        placeholder="Enter instruction (e.g. summarize in bullet points)"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <button onClick={generateSummary}>Generate Summary</button>

      {summary && (
        <>
          <h3>Generated Summary</h3>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={6}
            style={{ width: "100%" }}
          />

          <input
            placeholder="Enter recipient emails (comma separated)"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />

          <button onClick={sendEmail}>Send Email</button>
        </>
      )}
    </div>
  );
}

export default App;
