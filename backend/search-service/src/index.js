const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3003;

app.use(cors());

const BOOK_SERVICE_URL = 'http://localhost:3001';

app.get('/', async (req, res) => {
  try {
    const { q, genre } = req.query;
    
    // Fetch all books based on genre if provided, otherwise all books
    const response = await axios.get(`${BOOK_SERVICE_URL}`, {
      params: { genre }
    });
    
    let books = response.data;

    // Filter by text search across title and author
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      books = books.filter(book => 
        searchRegex.test(book.title) || searchRegex.test(book.author)
      );
    }

    res.json(books);
  } catch (error) {
    console.error('Search Service Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

app.listen(PORT, () => {
  console.log(`Search Service running on port ${PORT}`);
});
