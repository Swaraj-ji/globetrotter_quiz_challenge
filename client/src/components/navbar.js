import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaTrophy, FaGamepad } from 'react-icons/fa';

const NavBar = ({ username }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">Globetrotter Quiz</div>
      <div className="space-x-4 flex items-center">
        {username && (
          <Link to="/profile" className="hover:underline font-bold flex items-center gap-1">
            <FaUser /> {username}
          </Link>
        )}
        <Link to="/leaderboard" className="hover:underline flex items-center gap-1">
          <FaTrophy /> Leaderboard
        </Link>
        <Link to="/challenge" className="hover:underline flex items-center gap-1">
          <FaGamepad /> Challenge
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
