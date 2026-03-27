const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  category: { type: String, enum: ['Best Seller', 'New Arrival', "Editor's Pick", 'Standard'], default: 'Standard' },
  description: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
