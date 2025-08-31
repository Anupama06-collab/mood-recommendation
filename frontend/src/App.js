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

  // Backgrounds based on mood
  const moodBackgrounds = {
    happy: "bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500",
    sad: "bg-gradient-to-b from-blue-200 via-blue-300 to-blue-500",
    excited: "bg-gradient-to-b from-purple-200 via-purple-300 to-purple-600",
    default: "bg-gradient-to-b from-gray-100 to-gray-300",
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-700 ${
        moodBackgrounds[mood] || moodBackgrounds.default
      }`}
    >
      {/* Navbar */}
      <header className="bg-black/30 backdrop-blur-md text-white shadow-lg py-4 px-6 flex justify-center items-center">
        <h1 className="text-2xl font-bold">🎭 MoodMate</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 bg-white/70 px-4 py-2 rounded-xl shadow">
          Select your mood
        </h2>

        {/* Mood Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => fetchRecommendations("happy")}
            className={`px-6 py-3 rounded-full font-bold shadow-md transition ${
              mood === "happy"
                ? "bg-yellow-500 text-white"
                : "bg-yellow-200 hover:bg-yellow-300"
            }`}
          >
            😀 Happy
          </button>

          <button
            onClick={() => fetchRecommendations("sad")}
            className={`px-6 py-3 rounded-full font-bold shadow-md transition ${
              mood === "sad"
                ? "bg-blue-600 text-white"
                : "bg-blue-200 hover:bg-blue-300"
            }`}
          >
            😢 Sad
          </button>

          <button
            onClick={() => fetchRecommendations("excited")}
            className={`px-6 py-3 rounded-full font-bold shadow-md transition ${
              mood === "excited"
                ? "bg-purple-600 text-white"
                : "bg-purple-200 hover:bg-purple-300"
            }`}
          >
            🤩 Excited
          </button>
        </div>

        {/* Recommendations */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <div
                key={rec._id}
                className="bg-white/80 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-4xl mb-3">
                  {rec.type === "movie" ? "🎬" : "📖"}
                </div>

                <h2 className="text-lg font-bold text-gray-800">
                  {rec.title}
                </h2>
                <p className="text-sm text-gray-500 uppercase">{rec.type}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  {rec.description || "No description available."}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white font-semibold text-lg drop-shadow">
              {mood
                ? "No recommendations found 😕"
                : "Choose a mood to get recommendations 🎬📚"}
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white text-center py-3 text-sm">
           Made with ❤️ 
      </footer>
    </div>
  );
}

export default App;
