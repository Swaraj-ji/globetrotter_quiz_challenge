# Globetrotter Quiz Challenge - Frontend

## 🚀 Overview

The **Globetrotter Quiz Challenge** is an interactive full-stack game where users guess destinations based on cryptic clues. This frontend application is built using **React.js** and integrates with a backend API to manage user authentication, quiz logic, challenges, leaderboards, and user profiles.

## 📂 Project Structure

Below is the structure of the frontend project and a description of each file and folder:

### **Root Files**

- **`App.js`** → The main entry point for the React application that defines routes and manages the global state (username, user stats, etc.).
- **`index.js`** → Renders the `App.js` component into the root element of the HTML document.
- **`package.json`** → Manages project dependencies, scripts, and configurations.
- **`.env`** → Contains environment variables (e.g., API keys for external services).

### **📁 src/**

Contains the main source code of the application.

#### **📁 components/**

This folder contains reusable UI components.

- **`navbar.js`** → A navigation bar displaying links to Profile, Leaderboard, and Challenge pages. Dynamically updates with the username.
- **`leaderboard.js`** → Fetches and displays the top users based on their scores.
- **`profile.js`** → Displays user details such as username, score, and pass rate, fetching data from the backend.
- **`homepage.js`** → The landing page where users enter their username and start the game.
- **`game.js`** → The core quiz logic where users select answers, see feedback, and track scores.
- **`challenge.js`** → Allows users to create challenges, generate a shareable invite, and challenge friends.
- **`challengeInvite.js`** → Handles invited users and displays challenge details before they start the game.

#### **📁 assets/**

Stores static files such as images, icons, and stylesheets.

#### **📁 utils/**

- **`api.js`** → Contains helper functions for making API requests to the backend.
- **`constants.js`** → Stores reusable constants such as API endpoints.

### **🔗 API Integration**

The frontend communicates with the backend using the following API endpoints:

| Feature                | Endpoint                         |
| ---------------------- | -------------------------------- |
| Get Random Destination | `/destinations/random`           |
| Submit Answer          | `/game/checkAnswer`              |
| Fetch User Profile     | `/users/:username`               |
| Fetch Leaderboard      | `/leaderboard`                   |
| Create Challenge       | `/challenges/create`             |
| Accept Challenge       | `/challenges/:inviteCode/accept` |

### **🎯 Features**

✅ **Dynamic Quiz**: Users answer location-based questions.
✅ **Leaderboard**: Displays top performers.
✅ **Challenges**: Users can challenge friends and compare scores.
✅ **Profile Page**: Tracks user statistics.
✅ **WhatsApp Sharing**: Users can share challenges with friends.
✅ **Persistent Login**: Username stored in local storage.

### **⚡ Installation & Setup**

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/globetrotter_quiz_challenge.git
   cd globetrotter_quiz_challenge
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm start
   ```
4. **Visit in browser:**
   ```
  https://globetrotter-quiz-challenge.onrender.com/
   ```

### **📌 Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_IMGBB_API_KEY=your_imgbb_api_key
```

### **📜 License**

This project is open-source and available under the MIT License.

---

✨ **Happy Coding!** 🚀



# Globetrotter Backend

Globetrotter is a full-stack travel guessing game. This backend application is built with Node.js, Express, and MongoDB (using Mongoose) to handle user management, game logic, challenge invites, and leaderboards.

## Features

- **User Management**
  - Register new users
  - Retrieve user profiles
  - Update user scores and maintain game history

- **Destination Management**
  - Retrieve a random destination along with multiple-choice options
  - Store and validate destination details including clues, fun facts, and trivia

- **Game Logic**
  - Check user answers and update game statistics
  - Provide real-time feedback on answer correctness

- **Challenge/Invite Feature**
  - Create challenge invitations with a unique invite code
  - Allow users to accept challenges and view invite details

- **Leaderboard**
  - Fetch and display a leaderboard based on user performance (success rate, correct answers)

- **Error Handling**
  - Global error handling middleware for consistent API responses

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Utilities:** UUID (for generating invite codes), dotenv (for managing environment variables)

## Folder Structure

```
globetrotter-backend/
├── config/
│   └── db.js                  // Database connection setup using Mongoose and dotenv.
├── controllers/
│   ├── challengeController.js // Handles challenge creation, retrieval, and acceptance.
│   ├── destinationController.js // Retrieves a random destination with options.
│   ├── gameController.js      // Checks game answers and updates user statistics.
│   ├── leaderboardController.js // Fetches and sorts user data to generate the leaderboard.
│   └── userController.js      // Manages user registration, profile retrieval, and score updates.
├── middleware/
│   └── errorHandler.js        // Global error handling middleware.
├── models/
│   ├── Challenge.js           // Mongoose schema/model for challenges.
│   ├── Destination.js         // Mongoose schema/model for destinations.
│   └── User.js                // Mongoose schema/model for users (includes stats and game history).
├── routes/
│   ├── challengeRoutes.js     // API routes for challenge endpoints.
│   ├── destinationRoutes.js   // API routes for destination endpoints.
│   ├── gameRoutes.js          // API routes for game operations (e.g., answer checking).
│   ├── leaderboardRoutes.js   // API route for fetching leaderboard data.
│   └── userRoutes.js          // API routes for user operations.
├── .env                       // Environment variables (e.g., MONGO_URI, PORT).
├── package.json               // Project dependencies, scripts, and configurations.
└── server.js                  // Main entry point; sets up Express app, connects to MongoDB, and mounts middleware and routes.
```

## API Endpoints

### Users
- **POST /users/register**  
  Registers a new user.
- **GET /users/:username**  
  Retrieves a user profile.
- **PUT /users/:username/score**  
  Updates user score and game history.

### Destinations
- **GET /destinations/random**  
  Returns a random destination with multiple-choice options.

### Game
- **POST /game/check-answer**  
  Checks if the provided answer is correct and updates user stats.

### Challenges
- **POST /challenges/create**  
  Creates a new challenge invitation.
- **GET /challenges/:inviteCode**  
  Retrieves challenge details by invite code.
- **POST /challenges/:inviteCode/accept**  
  Allows a user to accept a challenge invitation.

### Leaderboard
- **GET /leaderboard**  
  Returns a sorted leaderboard of users based on their performance.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd globetrotter-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory** and add the following:
   ```
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   NODE_ENV=development
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact [swarajsrivastava14@gmail.com](mailto:swarajsrivastava14@gmail.com).
```


