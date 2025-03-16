import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChallengeInvitePage = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { inviteCode } = useParams();
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallengeDetails(inviteCode);
  }, [inviteCode]);

  const fetchChallengeDetails = async (inviteCode) => {
    try {
      const response = await fetch(`${API_URL}/challenges/${inviteCode}`);
      const data = await response.json();
      if (data.success) {
        setChallengeData(data.challenge);
      } else {
        setError(data.message || "Failed to fetch challenge data.");
      }
    } catch (err) {
      setError("Error fetching challenge data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-lg text-gray-500 text-center mt-10">Loading challenge data...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500 text-center mt-10">{error}</p>;
  }

  const passRate = challengeData.destinationsGuessed > 0
    ? ((challengeData.correctAnswers / challengeData.destinationsGuessed) * 100).toFixed(2)
    : 0;

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-400 to-red-100 text-white p-10 rounded-xl shadow-xl text-center mt-10">
      <h1 className="text-4xl font-extrabold mb-8">Challenge Details</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg text-gray-900 flex flex-col items-center">
        <p className="text-2xl font-semibold mb-4">👤 Username: <span className="text-blue-600">{challengeData.creatorName}</span></p>
        <p className="text-2xl font-semibold mb-4">🎯 Score: ✅ <span className="text-green-600">{challengeData.correctAnswers}</span> | ❌ <span className="text-red-600">{challengeData.incorrectAnswers}</span></p>
        <p className="text-2xl font-semibold mb-4">📊 Pass Rate: <span className="text-purple-600">{passRate}%</span></p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Start Game
      </button>
    </div>
  );
};

export default ChallengeInvitePage;
