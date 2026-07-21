const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload, convertToWebp } = require('../utils/upload');

// Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch a single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (with optional image upload)
router.post('/', upload.single('image'), convertToWebp, async (req, res) => {
  try {
    // Generate new numeric id
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    let imageUrl = req.body.src || '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const {
      name,
      slug,
      universe,
      price,
      originalPrice,
      isSpecialOffer,
      discountPercentage,
      badge,
      description,
      floatingDecos
    } = req.body;

    // Convert types appropriately
    const parsedDecos = Array.isArray(floatingDecos) 
      ? floatingDecos 
      : (floatingDecos ? floatingDecos.split(',').map(d => d.trim()) : []);

    const newProduct = new Product({
      id: newId,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      universe,
      src: imageUrl,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      isSpecialOffer: isSpecialOffer === 'true' || isSpecialOffer === true,
      discountPercentage: discountPercentage ? Number(discountPercentage) : null,
      badge: badge || '',
      description,
      floatingDecos: parsedDecos
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product
router.put('/:id', upload.single('image'), convertToWebp, async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrl = product.src;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.src) {
      imageUrl = req.body.src;
    }

    const {
      name,
      slug,
      universe,
      price,
      originalPrice,
      isSpecialOffer,
      discountPercentage,
      badge,
      description,
      floatingDecos
    } = req.body;

    if (name) product.name = name;
    if (slug) product.slug = slug;
    if (universe) product.universe = universe;
    if (imageUrl) product.src = imageUrl;
    if (price !== undefined) product.price = Number(price);
    product.originalPrice = originalPrice ? Number(originalPrice) : null;
    product.isSpecialOffer = isSpecialOffer === 'true' || isSpecialOffer === true;
    product.discountPercentage = discountPercentage ? Number(discountPercentage) : null;
    if (badge !== undefined) product.badge = badge;
    if (description) product.description = description;
    
    if (floatingDecos !== undefined) {
      product.floatingDecos = Array.isArray(floatingDecos)
        ? floatingDecos
        : (floatingDecos ? floatingDecos.split(',').map(d => d.trim()) : []);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ id: Number(req.params.id) });
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
