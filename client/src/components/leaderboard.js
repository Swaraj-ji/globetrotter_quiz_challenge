import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();

      if (data.success) {
        setLeaderboardData(data.leaderboard.slice(0, 3)); // Get only the top three users
      } else {
        setError('Failed to fetch leaderboard data.');
      }
    } catch (err) {
      setError('Error fetching leaderboard data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-lg text-gray-500 text-center mt-10">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">🏆 Top 3 Players</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border border-gray-300">Rank</th>
              <th className="py-2 px-4 border border-gray-300">Username</th>
              <th className="py-2 px-4 border border-gray-300">✅ Correct</th>
              <th className="py-2 px-4 border border-gray-300">❌ Incorrect</th>
              <th className="py-2 px-4 border border-gray-300">📊 Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((user, index) => (
                <tr key={user.username} className="border border-gray-300 hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-300 font-bold text-xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {index + 1}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 font-semibold">{user.username}</td>
                  <td className="py-2 px-4 border border-gray-300">{user.correctAnswers}</td>
                  <td className="py-2 px-4 border border-gray-300">{user.incorrectAnswers}</td>
                  <td className="py-2 px-4 border border-gray-300">{user.successRate}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-gray-600">No leaderboard data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
