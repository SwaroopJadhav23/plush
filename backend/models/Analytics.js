const mongoose = require('mongoose');

const pageVisitSchema = new mongoose.Schema({
  path: {
    type: String,
    default: '/'
  },
  ip: {
    type: String,
    default: 'anonymous'
  },
  userAgent: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const productClickSchema = new mongoose.Schema({
  productSlug: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    default: ''
  },
  ip: {
    type: String,
    default: 'anonymous'
  },
  userAgent: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PageVisit = mongoose.model('PageVisit', pageVisitSchema);
const ProductClick = mongoose.model('ProductClick', productClickSchema);

module.exports = {
  PageVisit,
  ProductClick
};
