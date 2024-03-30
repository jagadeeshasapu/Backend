const express = require('express');
const { connectToDatabase } = require('./database.js');
const setupRoutes = require('./routes/router.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyToken } = require('./middleware/verify-token.js');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
//const uploadMiddleware = require('./middleware/uploadmidle');
require('dotenv').config();
//const { Registeruser } = require('./models/modal.js');
const { RegisteruserSchema } = require('./models/modal.js');


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

// Ensure the 'uploads' directory exists

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // specify the destination folder
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Use verifyToken middleware for protected routes
app.use('/getData', verifyToken);

// Include your routes
app.use('/', setupRoutes);

// Set maximum listeners
app.setMaxListeners(15);

// Connect to the database
connectToDatabase();

// Awaiting MongoDB connection outside middleware
(async () => {
  await mongoose.connection.readyState; // Wait for the MongoDB connection to be ready
  app.listen(5000, () => {
    console.log('Server is running...');
  });
})();
