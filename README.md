Globetrotter Quiz Challenge - Frontend

🚀 Overview

The Globetrotter Quiz Challenge is an interactive full-stack game where users guess destinations based on cryptic clues. This frontend application is built using React.js and integrates with a backend API to manage user authentication, quiz logic, challenges, leaderboards, and user profiles.

📂 Project Structure

Below is the structure of the frontend project and a description of each file and folder:

Root Files

App.js → The main entry point for the React application that defines routes and manages the global state (username, user stats, etc.).

index.js → Renders the App.js component into the root element of the HTML document.

package.json → Manages project dependencies, scripts, and configurations.

.env → Contains environment variables (e.g., API keys for external services).

📁 src/

Contains the main source code of the application.

📁 components/

This folder contains reusable UI components.

navbar.js → A navigation bar displaying links to Profile, Leaderboard, and Challenge pages. Dynamically updates with the username.

leaderboard.js → Fetches and displays the top users based on their scores.

profile.js → Displays user details such as username, score, and pass rate, fetching data from the backend.

homepage.js → The landing page where users enter their username and start the game.

game.js → The core quiz logic where users select answers, see feedback, and track scores.

challenge.js → Allows users to create challenges, generate a shareable invite, and challenge friends.

challengeInvite.js → Handles invited users and displays challenge details before they start the game.

📁 assets/

Stores static files such as images, icons, and stylesheets.

📁 utils/

api.js → Contains helper functions for making API requests to the backend.

constants.js → Stores reusable constants such as API endpoints.

🔗 API Integration

The frontend communicates with the backend using the following API endpoints:

Feature

Endpoint

Get Random Destination

/destinations/random

Submit Answer

/game/checkAnswer

Fetch User Profile

/users/:username

Fetch Leaderboard

/leaderboard

Create Challenge

/challenges/create

Accept Challenge

/challenges/:inviteCode/accept

🎯 Features

✅ Dynamic Quiz: Users answer location-based questions.
✅ Leaderboard: Displays top performers.
✅ Challenges: Users can challenge friends and compare scores.
✅ Profile Page: Tracks user statistics.
✅ WhatsApp Sharing: Users can share challenges with friends.
✅ Persistent Login: Username stored in local storage.

⚡ Installation & Setup

To set up the project locally, follow these steps:

Clone the repository:

git clone https://github.com/YOUR_GITHUB_USERNAME/globetrotter_quiz_challenge.git
cd globetrotter_quiz_challenge

Install dependencies:

npm install

Run the development server:

npm start

Visit in browser:

http://localhost:3000/

📌 Environment Variables

Create a .env file in the root directory and add the following:

REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_IMGBB_API_KEY=your_imgbb_api_key

📜 License

This project is open-source and available under the MIT License.

✨ Happy Coding! 🚀

