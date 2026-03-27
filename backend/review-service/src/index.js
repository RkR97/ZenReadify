const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');

// const Review = require('./models/Review');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// ============================================================
// MOCK DATA — MongoDB connection commented out below
// ============================================================
// mongoose.connect('mongodb://localhost:27017/zenreadify')
//   .then(() => console.log('Review Service connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

let mockReviews = [
  {
    _id: 'r1',
    bookId: '1',
    user: 'Alice Johnson',
    rating: 5,
    comment: 'An absolute masterpiece! Fitzgerald captures the decadence and emptiness of the 1920s beautifully.',
    createdAt: new Date('2024-01-15')
  },
  {
    _id: 'r2',
    bookId: '1',
    user: 'Michael Brown',
    rating: 4,
    comment: 'A classic that earns its reputation. Rich prose and symbolic depth throughout.',
    createdAt: new Date('2024-02-01')
  },
  {
    _id: 'r3',
    bookId: '2',
    user: 'Sara Evans',
    rating: 5,
    comment: 'Dune is one of the greatest science fiction novels ever written. A deeply complex world with rich lore.',
    createdAt: new Date('2024-01-20')
  },
  {
    _id: 'r4',
    bookId: '3',
    user: 'David Kim',
    rating: 4,
    comment: 'Twisty and gripping. Could not put it down! The ending blew my mind.',
    createdAt: new Date('2024-03-05')
  },
  {
    _id: 'r5',
    bookId: '5',
    user: 'Priya Sharma',
    rating: 5,
    comment: 'Completely changed how I approach building habits. Highly practical and easy to follow.',
    createdAt: new Date('2024-03-10')
  }
];

// ============================================================
// Routes (commented-out MongoDB queries replaced with mock data)
// ============================================================

// GET reviews for a book
app.get('/:bookId', (req, res) => {
  // Mongoose version:
  // const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });

  const reviews = mockReviews
    .filter(r => r.bookId === req.params.bookId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(reviews);
});

// POST add a review for a book
app.post('/:bookId', (req, res) => {
  // Mongoose version:
  // const newReview = new Review({ bookId, user, rating, comment });
  // const savedReview = await newReview.save();

  const newReview = {
    _id: 'r' + (mockReviews.length + 1),
    bookId: req.params.bookId,
    user: req.body.user,
    rating: req.body.rating,
    comment: req.body.comment,
    createdAt: new Date()
  };
  mockReviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Review Service running on port ${PORT} (mock data mode)`);
});
