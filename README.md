⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/your-username/leitner-flashcards.git
cd leitner-flashcards

2️⃣ Backend Setup
cd backend
npm install

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Run the Backend Server:
node server.js

3️⃣ Frontend Setup
cd ../frontend
npm install

Run the Frontend:
npm run dev

🚀 Features

-> Add, update, and delete flashcards

->  Review flashcards based on the Leitner System

->  "Show Answer" button to reveal answers

->  "Got it Right" and "Got it Wrong" buttons to update flashcard progress

-> Fetch flashcards based on their next review date (spaced repetition logic)

-> Track learning progress (e.g., "You have 5 flashcards due today")

-> Clean and minimal UI with React + Tailwind CSS

-🛠 Tech Stack

-> Frontend: React, Vite, React Hooks, Axios, Tailwind CSS

-> Backend: Node.js, Express.js, MongoDB, Mongoose

-> Database: MongoDB (Atlas or Local)


🎯 How It Works (Leitner System)

-> New flashcards start in Box 1

-> If answered correctly, they move to the next box

-> If answered incorrectly, they go back to Box 1

-> Higher boxes have longer review intervals

-> The app fetches due flashcards based on nextReviewDate

