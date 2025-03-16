import React, { useState } from 'react';

const HomePage = ({ onStartGame }) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", JSON.stringify({
          value: username,
          expiry: Date.now() + 30 * 24 * 60 * 60 * 1000
        }));
        onStartGame(username);
      } else {
        console.error("Failed to register user", data);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Welcome to Globetrotter Quiz</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg"
        onClick={handleStartGame}
        disabled={!username.trim() || loading}
      >
        {loading ? "Loading..." : "Play Game"}
      </button>
    </div>
  );
};

export default HomePage;
