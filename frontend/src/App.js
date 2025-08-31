import axios from "axios";
import { useState } from "react";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(
        `https://mood-recommendation-1.onrender.com/recommendations?mood=${mood}`
      );
      setRecommendations(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  return (
    <div>
      <h1>Mood Recommender</h1>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Enter mood (happy, sad, excited)"
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((item, idx) => (
            <li key={idx}>{item.title}</li>
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
