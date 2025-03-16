import React, { useState, useEffect } from 'react';
import { FaShareSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const ChallengePage = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const API_URL_FRONTEND = process.env.REACT_APP_URL || "http://localhost:3000";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inviteCode, setInviteCode] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const navigate = useNavigate();
  const IMGBB_API_KEY = "58af9f72e9e2322eb30f77b9849bbfe2";

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      try {
        const { value } = JSON.parse(storedUser);
        fetchUserStats(value);
      } catch (err) {
        console.error("Error parsing username from localStorage:", err);
        setError("Failed to load username.");
        setLoading(false);
      }
    } else {
      setError("No user found in local storage.");
      setLoading(false);
    }
  }, []);

  const fetchUserStats = async (username) => {
    try {
      const response = await fetch(`${API_URL}/users/${username}`);
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      } else {
        setError(data.message || "Failed to fetch user data.");
      }
    } catch (err) {
      setError("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const createChallenge = async () => {
    try {
      const response = await fetch(`${API_URL}/challenges/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userData.username,
          score: {
            correct: userData.stats.correctAnswers,
            incorrect: userData.stats.incorrectAnswers,
            total: userData.stats.totalGames,
            successRate: ((userData.stats.correctAnswers / (userData.stats.totalGames || 1)) * 100).toFixed(2)
          }
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setInviteCode(data.inviteCode);
        generateChallengeImage();
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  const generateChallengeImage = () => {
    setTimeout(() => {
      const element = document.getElementById('challenge-image');
      if (element) {
        html2canvas(element).then(canvas => {
          const imageData = canvas.toDataURL('image/png').split(',')[1];
          uploadToImgBB(imageData);
        });
      }
    }, 500);
  };

  const uploadToImgBB = async (imageData) => {
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ image: imageData })
      });
      const data = await response.json();
      if (data.success) {
        setUploadedImageUrl(data.data.url);
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
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

  const challengeLink = `${API_URL_FRONTEND}/challenge/${inviteCode}`;
  const whatsappShareMessage = `🚀 I'm challenging you to play Globetrotter Quiz! 🌍\n👤 Username: ${userData.username}\n🎯 Score: ✅ ${userData.stats.correctAnswers} | ❌ ${userData.stats.incorrectAnswers}\n📊 Pass Rate: ${passRate}%\nJoin me here: ${challengeLink}`;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareMessage)}`;

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-400 to-red-100 text-white p-10 rounded-xl shadow-xl text-center mt-10">
      <h1 className="text-4xl font-extrabold mb-8">Challenge Your Friends</h1>
      <div id="challenge-image" className="bg-white p-8 rounded-xl shadow-lg text-gray-900 flex flex-col items-center">
        <p className="text-2xl font-semibold mb-4">👤 Username: <span className="text-blue-600">{userData.username}</span></p>
        <p className="text-2xl font-semibold mb-4">🎯 Score: ✅ <span className="text-green-600">{userData.stats.correctAnswers}</span> | ❌ <span className="text-red-600">{userData.stats.incorrectAnswers}</span></p>
        <p className="text-2xl font-semibold mb-4">📊 Pass Rate: <span className="text-purple-600">{passRate}%</span></p>
      </div>
      {inviteCode ? (
        <div className="flex flex-col items-center w-full mt-6 space-y-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
          >
            <FaShareSquare /> Share on WhatsApp
          </a>
          {uploadedImageUrl && (
            <button
              onClick={() => window.open(uploadedImageUrl, '_blank')}
              className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition-all"
            >
              Show Result
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={createChallenge}
          className="w-full mt-6 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Create Challenge
        </button>
      )}
      <button
        onClick={() => navigate('/')}
        className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Back to Game
      </button>
    </div>
  );
};

export default ChallengePage;
