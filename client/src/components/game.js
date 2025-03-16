import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const QuizApp = ({ username }) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [currentDestination, setCurrentDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    fetchUserStats();
    fetchRandomDestination();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${username}`);
      const data = await response.json();
      if (data.success) {
        setScore({
          correct: data.user.stats.correctAnswers,
          incorrect: data.user.stats.incorrectAnswers
        });
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const fetchRandomDestination = async () => {
    try {
      const response = await fetch(`${API_URL}/destinations/random`);
      const data = await response.json();
      if (data && data.destination && data.options) {
        setCurrentDestination(data.destination);
        setOptions(data.options);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        console.error("Invalid API response format", data);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const checkAnswer = async (answer) => {
    try {
      const response = await fetch(`${API_URL}/game/checkAnswer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, destinationId: currentDestination?._id, answer })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error checking answer, response status:", response.status, "Response:", errorText);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setIsCorrect(data.isCorrect);
        setSelectedAnswer(answer);
        Swal.fire({
          title: data.isCorrect ? '✅ Correct!' : '❌ Incorrect!',
          text: data.isCorrect ? currentDestination.funFacts[0] : options.find(opt => opt.name === currentDestination.name)?.funFacts[0] || 'No fun fact available for this destination.',
          icon: data.isCorrect ? 'success' : 'error',
          confirmButtonText: 'OK'
        });
        
        const updatedScore = {
          correct: data.isCorrect ? score.correct + 1 : score.correct,
          incorrect: !data.isCorrect ? score.incorrect + 1 : score.incorrect
        };
        setScore(updatedScore);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };


  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    checkAnswer(answer);
  };

  return (
      <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-400 to-red-100 p-6 rounded-lg shadow-lg text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Globetrotter Quiz</h1>
        <p className="text-lg font-semibold">Score: ✅ {score.correct} | ❌ {score.incorrect}</p>
        {currentDestination ? (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <div className="text-lg">
              {currentDestination.clues.length > 0 ? (
                currentDestination.clues.map((clue, index) => (
                  <p key={index}>🧩 Clue {index + 1} :  {clue}</p>
                ))
              ) : (
                <p>No clues available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Loading question...</p>
        )}
        <div className="space-y-3">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-2 rounded-lg text-lg font-semibold transition duration-300 ${
                  selectedAnswer
                    ? isCorrect === null
                      ? "bg-gray-200"
                      : option.name === currentDestination?.name
                      ? "bg-green-500 text-white"
                      : option === selectedAnswer
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option.name}
              </button>
            ))
          ) : (
            <p className="text-lg text-gray-500">Loading options...</p>
          )}
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          onClick={fetchRandomDestination}
        >
          Next Quiz
        </button>
      </div>
  );
};

export default QuizApp;
