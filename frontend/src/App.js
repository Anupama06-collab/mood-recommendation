import React, { useState } from "react";

function App() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState([]);

  const fetchRecs = async () => {
    const res = await fetch(`https://your-backend-url.onrender.com/recommendations?mood=${mood}`);
    const data = await res.json();
    setRecs(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Mood-Based Recommender</h1>
      <select onChange={(e) => setMood(e.target.value)} value={mood}>
        <option value="">-- Select Mood --</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="bored">Bored</option>
        <option value="excited">Excited</option>
      </select>
      <button onClick={fetchRecs} disabled={!mood}>Get Recommendations</button>

      <ul>
        {recs.map((rec, i) => (
          <li key={i}>
            <strong>{rec.title}</strong> ({rec.type}) - {rec.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
