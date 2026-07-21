const mongoose = require('mongoose');

const SecuritySchema = new mongoose.Schema({
  pin: {
    type: String,
    default: '1234'
  },
  username: {
    type: String,
    default: 'admin'
  },
  password: {
    type: String,
    default: 'admin123'
  }
}, { timestamps: true });

module.exports = mongoose.model('Security', SecuritySchema);
