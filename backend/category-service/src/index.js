const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3004;

app.use(cors());

const BOOK_SERVICE_URL = 'http://localhost:3001';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}`);
    const allBooks = response.data;
    
    // Group books by category
    const categorized = {
      'Best Sellers': allBooks.filter(b => b.category === 'Best Sellers'),
      'New Arrivals': allBooks.filter(b => b.category === 'New Arrivals'),
      "Editor's Picks": allBooks.filter(b => b.category === "Editor's Picks")
    };
    
    res.json(categorized);
  } catch (error) {
    console.error('Category Service Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.listen(PORT, () => {
  console.log(`Category Service running on port ${PORT}`);
});
