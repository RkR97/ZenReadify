const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');

// const Book = require('./models/Book');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ============================================================
// MOCK DATA — MongoDB connection commented out below
// ============================================================
// mongoose.connect('mongodb://localhost:27017/zenreadify')
//   .then(() => console.log('Book Service connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

const mockBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    description: 'A story of the fabulous gold-hatted Jay Gatsby and his pursuit of the American Dream in 1920s New York.',
    price: 12.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8432827-L.jpg',
    category: 'Best Sellers',
    publisher: 'Scribner',
    pages: 180,
    isbn: '9780743273565'
  },
  {
    _id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    description: 'Set in the distant future, Dune tells the story of young Paul Atreides, heir to a noble family tasked with ruling the desert planet Arrakis.',
    price: 14.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8332706-L.jpg',
    category: "Editor's Picks",
    publisher: 'Chilton Books',
    pages: 688,
    isbn: '9780441013593'
  },
  {
    _id: '3',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Thriller',
    description: 'On the morning of their fifth wedding anniversary, Amy Dunne disappears. The suspense-filled story unravels who is really to blame.',
    price: 13.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    category: 'Best Sellers',
    publisher: 'Crown Publishing',
    pages: 422,
    isbn: '9780307588371'
  },
  {
    _id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    description: 'A brief history of humankind, exploring how Homo sapiens came to dominate the planet through cognitive, agricultural, and scientific revolutions.',
    price: 16.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    category: "Editor's Picks",
    publisher: 'Harper',
    pages: 443,
    isbn: '9780062316097'
  },
  {
    _id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description: 'A groundbreaking guide to building good habits and breaking bad ones. The most comprehensive framework for improving your life.',
    price: 15.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/10519874-L.jpg',
    category: 'New Arrivals',
    publisher: 'Avery',
    pages: 320,
    isbn: '9780735211292'
  },
  {
    _id: '6',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    description: 'A lone astronaut must save the earth from disaster. An irresistible ride of pure plot and dazzling science.',
    price: 17.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/12712329-L.jpg',
    category: 'New Arrivals',
    publisher: 'Ballantine Books',
    pages: 476,
    isbn: '9780593135204'
  },
  {
    _id: '7',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Thriller',
    description: 'Symbologist Robert Langdon is drawn into a deadly race to uncover a secret that could rock the very foundations of Christianity.',
    price: 11.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8739160-L.jpg',
    category: 'Best Sellers',
    publisher: 'Doubleday',
    pages: 454,
    isbn: '9780385504201'
  },
  {
    _id: '8',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    price: 10.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    category: "Editor's Picks",
    publisher: 'J. B. Lippincott',
    pages: 281,
    isbn: '9780061935466'
  },
  {
    _id: '9',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    genre: 'Self-Help',
    description: 'A guide to spiritual enlightenment. Tolle shows how to free oneself from enslavement to the mind and achieve inner peace.',
    price: 13.49,
    imageUrl: 'https://covers.openlibrary.org/b/id/12445949-L.jpg',
    category: 'New Arrivals',
    publisher: 'New World Library',
    pages: 236,
    isbn: '9781577314806'
  }
];

// ============================================================
// Routes (commented-out MongoDB queries replaced with mock data)
// ============================================================

// GET all books (with optional genre filter)
app.get('/', (req, res) => {
  // Mongoose version:
  // const books = await Book.find(query);

  let result = mockBooks;
  if (req.query.genre) {
    result = mockBooks.filter(b => b.genre === req.query.genre);
  }
  res.json(result);
});

// GET a single book by ID
app.get('/:id', (req, res) => {
  // Mongoose version:
  // const book = await Book.findById(req.params.id);

  const book = mockBooks.find(b => b._id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST add a new book
app.post('/', (req, res) => {
  // Mongoose version:
  // const newBook = new Book(req.body);
  // const savedBook = await newBook.save();

  const newBook = { _id: String(mockBooks.length + 1), ...req.body };
  mockBooks.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Book Service running on port ${PORT} (mock data mode)`);
});
