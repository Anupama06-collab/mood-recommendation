/*import React, { useState } from "react";

function App() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState([]);

  const fetchRecs = async () => {
    const res = await fetch(`https://mood-recommendation.onrender.com/recommendations?mood=${mood}`);
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

export default App;*/


import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace this with your Render backend URL
  const BACKEND_URL = "https://mood-recommendation.onrender.com";

  const fetchRecommendations = async (selectedMood) => {
    setMood(selectedMood);
    setLoading(true);

    try {
      const res = await axios.get(
        `${BACKEND_URL}/recommendations?mood=${selectedMood}`+mood
      );
      console.log(res.data);
      setRecommendations(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Mood-Based Recommendations</h1>

      <div className="buttons">
        <button onClick={() => fetchRecommendations("happy")}>😊 Happy</button>
        <button onClick={() => fetchRecommendations("sad")}>😢 Sad</button>
        <button onClick={() => fetchRecommendations("excited")}>🤩 Excited</button>
      </div>

      <h2>{mood ? `Recommendations for "${mood}"` : "Select a mood"}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations available</p>
      ) : (
        <ul>
          {recommendations.map((rec) => (
            <li key={rec._id}>
              {rec.title} ({rec.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
