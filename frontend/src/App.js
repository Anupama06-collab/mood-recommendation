/*import { useState } from "react";
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

export default App;*/



import React, { useState } from "react";
import axios from "axios";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (selectedMood) => {
    setMood(selectedMood);
    try {
      const res = await axios.get(
        `https://mood-recommendation-1.onrender.com/recommendations?mood=${selectedMood}`
      );
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🎭 Mood-Based Recommender
      </h1>

      {/* Mood Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => fetchRecommendations("happy")}
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
            mood === "happy"
              ? "bg-yellow-400 text-white"
              : "bg-yellow-200 hover:bg-yellow-300"
          }`}
        >
          😀 Happy
        </button>

        <button
          onClick={() => fetchRecommendations("sad")}
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
            mood === "sad"
              ? "bg-blue-500 text-white"
              : "bg-blue-200 hover:bg-blue-300"
          }`}
        >
          😢 Sad
        </button>

        <button
          onClick={() => fetchRecommendations("excited")}
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
            mood === "excited"
              ? "bg-purple-500 text-white"
              : "bg-purple-200 hover:bg-purple-300"
          }`}
        >
          🤩 Excited
        </button>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-bold text-gray-800">{rec.title}</h2>
              <p className="text-sm text-gray-500 uppercase">{rec.type}</p>
              <p className="mt-2 text-gray-700">
                {rec.description || "No description available."}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            {mood
              ? "No recommendations found 😕"
              : "Choose a mood to get recommendations 🎬📚"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
