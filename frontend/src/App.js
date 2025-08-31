import { useState } from "react";
import axios from "axios";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    if (!mood) {
      alert("Please enter a mood!");
      return;
    }

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
    <div className="App">
      <h1>Mood Recommender</h1>
      <input
        type="text"
        placeholder="Enter mood (happy, sad, excited)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={handleSearch}>Get Recommendations</button>

      <div>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((rec) => (
              <li key={rec._id}>
                {rec.title} ({rec.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
}

export default App;
