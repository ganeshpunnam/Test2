const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust this path as needed for your Product model

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Make sure your Product model is correctly set up
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add more routes for adding, updating, and deleting products

module.exports = router;
