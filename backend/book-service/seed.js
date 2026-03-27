const mongoose = require('mongoose');

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/zenreadify')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  category: String,
  description: String,
  imageUrl: String
});

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  user: String,
  rating: Number,
  comment: String
});

const Book = mongoose.model('Book', bookSchema);
const Review = mongoose.model('Review', reviewSchema);

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    category: 'Best Seller',
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    category: 'Best Seller',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.',
    imageUrl: 'https://images.unsplash.com/photo-1614285457768-646f65cb854e?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    category: 'New Arrival',
    description: 'A shocking psychological thriller of a woman’s act of violence against her husband.',
    imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    category: "Editor's Pick",
    description: 'A brief history of humankind.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    category: 'Best Seller',
    description: 'An easy and proven way to build good habits and break bad ones.',
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-989d887dda6e?auto=format&fit=crop&q=80&w=600'
  }
];

async function seedDatabase() {
  await Book.deleteMany();
  await Review.deleteMany();
  
  const createdBooks = await Book.insertMany(sampleBooks);
  
  // Create sample reviews
  const sampleReviews = [
    {
      bookId: createdBooks[0]._id,
      user: 'Alice',
      rating: 5,
      comment: 'An absolute classic. Beautifully written.'
    },
    {
      bookId: createdBooks[1]._id,
      user: 'Bob',
      rating: 4,
      comment: 'Amazing world-building, but a bit dense.'
    }
  ];
  
  await Review.insertMany(sampleReviews);
  
  console.log('Database seeded successfully!');
  mongoose.connection.close();
}

seedDatabase();
