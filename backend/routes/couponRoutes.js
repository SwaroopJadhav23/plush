const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update coupon
router.post('/', async (req, res) => {
  try {
    const { code, discountType, discountValue, minPurchase, isActive, expiryDate } = req.body;
    
    if (!code || !discountType || discountValue === undefined) {
      return res.status(400).json({ message: 'Code, discountType, and discountValue are required' });
    }

    const formattedCode = code.toUpperCase().trim();

    const couponData = {
      code: formattedCode,
      discountType,
      discountValue: Number(discountValue),
      minPurchase: minPurchase ? Number(minPurchase) : 0,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true,
      expiryDate: expiryDate ? new Date(expiryDate) : null
    };

    const coupon = await Coupon.findOneAndUpdate(
      { code: formattedCode },
      { $set: couponData },
      { new: true, upsert: true }
    );

    res.json(coupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete coupon
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Validate coupon code for checkout
router.post('/validate', async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    if (!code) {
      return res.status(400).json({ valid: false, message: 'Coupon code is required' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });
    
    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Invalid coupon code' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'Coupon is inactive' });
    }

    // Check expiry
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    }

    // Check minimum purchase amount
    const parsedTotal = Number(totalAmount || 0);
    if (parsedTotal < coupon.minPurchase) {
      return res.status(400).json({ 
        valid: false, 
        message: `Minimum purchase of ₹${coupon.minPurchase} is required to use this coupon` 
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((coupon.discountValue / 100) * parsedTotal);
    } else {
      discountAmount = coupon.discountValue;
    }

    // Cap discount amount at the total purchase price
    discountAmount = Math.min(discountAmount, parsedTotal);

    res.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      finalAmount: parsedTotal - discountAmount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
