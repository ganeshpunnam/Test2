const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create the Express app
const app = express();

// Enable CORS for the frontend (replace with actual frontend URL if needed)
app.use(cors({
    origin: 'http://localhost:3000', // Update this if your frontend is on a different URL
    methods: ['GET', 'POST'],
}));

app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb+srv://punnamganesh752:Dea3BSfhsmknd5Vx@cluster0.mevjmou.mongodb.net/product-management?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
});

const Product = mongoose.model('Product', productSchema);

// API route to create a product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// API route to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
