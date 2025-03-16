import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import HomePage from './components/homepage';
import QuizApp from './components/game';
import ProfilePage from './components/profile';
import Leaderboard from './components/leaderboard';
import ChallengePage from './components/challenge';
import ChallengeInvitePage from './components/challengeInvite';

const App = () => {
  const [username, setUsername] = useState(null);
  const [userStats, setUserStats] = useState({ correct: 0, incorrect: 0, totalGames: 0 });

  // Function to update username from local storage
  const updateUsernameFromStorage = () => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      const { value, expiry } = JSON.parse(storedUser);
      if (Date.now() < expiry) {
        setUsername(value);
      } else {
        localStorage.removeItem("username");
      }
    }
  };

  useEffect(() => {
    updateUsernameFromStorage();
    // Listen for changes in local storage
    window.addEventListener("storage", updateUsernameFromStorage);
    
    return () => {
      window.removeEventListener("storage", updateUsernameFromStorage);
    };
  }, []);

  return (
    <div className='app bg-slate-200 min-h-screen items-center justify-center'>
      <NavBar username={username} />  
      <Routes>
        <Route path="/" element={!username ? <HomePage onStartGame={setUsername} /> : <QuizApp username={username} />} />
        <Route path="/profile" element={<ProfilePage stats={userStats} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/challenge/:inviteCode" element={<ChallengeInvitePage />} />
      </Routes>
    </div>
  );
};

export default App;
