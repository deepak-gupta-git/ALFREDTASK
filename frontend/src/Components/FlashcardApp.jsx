import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const API_URL = 'http://localhost:5000/flashcards';

const FlashcardApp = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const res = await axios.get(API_URL);
        const dueFlashcards = res.data.filter(card => new Date(card.nextReviewDate) <= new Date());
        setFlashcards(dueFlashcards);
        if (dueFlashcards.length > 0) setCurrentCard(dueFlashcards[0]);
    };

    const handleAnswer = async (correct) => {
        if (!currentCard) return;
        await axios.put(`${API_URL}/${currentCard._id}`, { correct });
        fetchFlashcards();
        setShowAnswer(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Leitner Flashcards</h1>
            {currentCard ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
                    <p className="text-lg font-semibold">{currentCard.question}</p>
                    {showAnswer && <p className="text-md text-gray-700 mt-4">{currentCard.answer}</p>}
                    <button 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    <div className="mt-4">
                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => handleAnswer(true)}>
                            Got it right
                        </button>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleAnswer(false)}>
                            Got it wrong
                        </button>
                    </div>
                </div>
            ) : (
                <p>No flashcards due for review.</p>
            )}
        </div>
    );
};

export default FlashcardApp;
