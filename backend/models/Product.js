const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  universe: {
    type: String,
    required: true,
    enum: ['Pokémon', 'Sanrio', 'Anime', 'Cute Animals', 'Trending', 'New Arrivals']
  },
  src: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  isSpecialOffer: {
    type: Boolean,
    default: false
  },
  discountPercentage: {
    type: Number,
    default: null
  },
  badge: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  floatingDecos: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
