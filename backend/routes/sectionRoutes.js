const express = require('express');
const router = express.Router();
const SectionImage = require('../models/SectionImage');
const { upload, convertToWebp } = require('../utils/upload');

// Fetch all section configs
router.get('/', async (req, res) => {
  try {
    const sections = await SectionImage.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch configs for a single section
router.get('/:sectionName', async (req, res) => {
  try {
    const sections = await SectionImage.find({ sectionName: req.params.sectionName });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upsert (add/update) a section image slot
router.post('/', upload.single('image'), convertToWebp, async (req, res) => {
  try {
    const { sectionName, key, label, extra } = req.body;
    
    if (!sectionName || !key) {
      return res.status(400).json({ message: 'sectionName and key are required' });
    }

    let imageUrl = req.body.imageUrl || '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Parse extra fields if sent as JSON string
    let parsedExtra = {};
    if (extra) {
      try {
        parsedExtra = typeof extra === 'string' ? JSON.parse(extra) : extra;
      } catch (e) {
        parsedExtra = { rawValue: extra };
      }
    }

    const updateData = {
      label: label || ''
    };
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }
    if (Object.keys(parsedExtra).length > 0) {
      updateData.extra = parsedExtra;
    }

    const sectionAsset = await SectionImage.findOneAndUpdate(
      { sectionName, key },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json(sectionAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a section image slot configuration (falls back to default)
router.delete('/:sectionName/:key', async (req, res) => {
  try {
    const { sectionName, key } = req.params;
    const result = await SectionImage.deleteOne({ sectionName, key });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    res.json({ message: 'Section image configuration reset to default successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
