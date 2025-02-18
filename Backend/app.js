require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Flashcard Schema
const flashcardSchema = new mongoose.Schema({
    question: String,
    answer: String,
    level: { type: Number, default: 1 },
    nextReviewDate: { type: Date, default: Date.now }
});
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Routes
// Add a flashcard
app.post('/flashcards', async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFlashcard = new Flashcard({ question, answer });
        await newFlashcard.save();
        res.status(201).json(newFlashcard);
    } catch (error) {
        res.status(500).json({ error: 'Error adding flashcard' });
    }
});

// Get all flashcards
app.get('/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching flashcards' });
    }
});

// Update flashcard (Leitner System logic)
app.put('/flashcards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { correct } = req.body;
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) return res.status(404).json({ error: 'Flashcard not found' });

        if (correct) {
            flashcard.level += 1; // Move to the next level
            flashcard.nextReviewDate = new Date(Date.now() + flashcard.level * 24 * 60 * 60 * 1000);
        } else {
            flashcard.level = 1; // Reset to level 1
            flashcard.nextReviewDate = new Date();
        }
        await flashcard.save();
        res.json(flashcard);
    } catch (error) {
        res.status(500).json({ error: 'Error updating flashcard' });
    }
});

// Delete flashcard
app.delete('/flashcards/:id', async (req, res) => {
    try {
        await Flashcard.findByIdAndDelete(req.params.id);
        res.json({ message: 'Flashcard deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting flashcard' });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
