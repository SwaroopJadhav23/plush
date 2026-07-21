const mongoose = require('mongoose');

const sectionImageSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    index: true
  },
  key: {
    type: String,
    required: true,
    index: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  extra: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

// Ensure unique section + key combinations
sectionImageSchema.index({ sectionName: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('SectionImage', sectionImageSchema);
