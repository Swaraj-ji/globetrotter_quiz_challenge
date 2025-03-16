import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      const { value } = JSON.parse(storedUser);
      fetchUserProfile(value);
    } else {
      setLoading(false);
      setError("No user found in local storage");
    }
  }, []);

  const fetchUserProfile = async (username) => {
    try {
      const response = await fetch(`${API_URL}/users/${username}`);
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      } else {
        setError(data.message || "Failed to fetch user data");
      }
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-lg text-gray-500 text-center mt-10">Loading user data...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500 text-center mt-10">{error}</p>;
  }

  const passRate = userData.stats.totalGames > 0
    ? ((userData.stats.correctAnswers / userData.stats.totalGames) * 100).toFixed(2)
    : 0;

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-400 to-red-100 text-white p-10 rounded-xl shadow-xl text-center mt-10">
      <h1 className="text-4xl font-extrabold mb-8">User Profile</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg text-gray-900 flex flex-col items-center">
        <p className="text-2xl font-semibold mb-4">👤 Username: <span className="text-blue-600">{userData.username}</span></p>
        <p className="text-2xl font-semibold mb-4">📊 Pass Rate: <span className="text-purple-600">{passRate}%</span></p>
        <p className="text-2xl font-semibold mb-4">🎯 Score:</p>
        <div className="flex gap-6 text-xl">
          <span className="bg-green-100 text-black px-6 py-3 rounded-lg shadow-md">✅ {userData.stats.correctAnswers}</span>
          <span className="bg-red-100 text-black px-6 py-3 rounded-lg shadow-md">❌ {userData.stats.incorrectAnswers}</span>
        </div>
      </div>
      <button className="mt-8 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all" onClick={() => window.location.href = '/'}>
        Back to Game
      </button>
    </div>
  );
};

export default ProfilePage;
