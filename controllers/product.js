const Products = require('../models/products');
const express = require('express');

const products = async (req, res) => {
    try {
      // Fetch all products from the database
      const allProducts = await Products.find();
      const productsWithPhotos = allProducts.map(product => ({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image // Assuming you have a field named 'image' in your product schema
      }));

      res.json(productsWithPhotos);

    } catch (error) {
      console.error(error);
      res.status(500)
        .json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    products
  };