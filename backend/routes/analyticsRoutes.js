const express = require('express');
const router = express.Router();
const { PageVisit, ProductClick } = require('../models/Analytics');
const Product = require('../models/Product');

// Log a page visit
router.post('/visit', async (req, res) => {
  try {
    const { path, userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
    
    const visit = new PageVisit({
      path: path || '/',
      ip,
      userAgent: userAgent || ''
    });

    await visit.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Log a product click
router.post('/click', async (req, res) => {
  try {
    const { productSlug, productName, userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
    
    if (!productSlug) {
      return res.status(400).json({ error: 'productSlug is required' });
    }

    const click = new ProductClick({
      productSlug,
      productName: productName || '',
      ip,
      userAgent: userAgent || ''
    });

    await click.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch analytics dashboard metrics
router.get('/', async (req, res) => {
  try {
    // 1. Total Visits
    const totalVisits = await PageVisit.countDocuments();
    
    // 2. Unique Visitors (by IP)
    const uniqueIPs = await PageVisit.distinct('ip');
    const uniqueVisitors = uniqueIPs.length;

    // 3. Product click analytics aggregation
    const productClicks = await ProductClick.aggregate([
      {
        $group: {
          _id: '$productSlug',
          clicksCount: { $sum: 1 },
          productName: { $first: '$productName' }
        }
      },
      { $sort: { clicksCount: -1 } }
    ]);

    // 4. Total clicks
    const totalClicks = await ProductClick.countDocuments();

    // 5. Recent visits list (limit to last 20)
    const recentVisits = await PageVisit.find().sort({ timestamp: -1 }).limit(20);

    // 6. Recent product click activities
    const recentClicks = await ProductClick.find().sort({ timestamp: -1 }).limit(20);

    res.json({
      totalVisits,
      uniqueVisitors,
      totalClicks,
      productClicks,
      recentVisits,
      recentClicks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
