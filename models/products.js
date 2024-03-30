const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true // Assuming it's not always verified by default
    },
    
});
const Products = mongoose.model('Product', productSchema);

module.exports = Products;