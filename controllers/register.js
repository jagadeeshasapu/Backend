const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Registeruser = require('../models/modal');
const { sendVerificationEmail } = require('../mail');

const registerUser = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { email, password, firstname, lastname } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
    }


    // Check if the user already exists
    const existingUser = await Registeruser.findOne({ email });
    
    if (existingUser) {
      return res.status(200).json({ status: 'Failed', message: 'Email is already registered' });
    }


    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email
    console.log('Sending verification email to:', email);
    await sendVerificationEmail(email, otp);
    console.log('Verification email sent');

    // Determine profile image URL
    // const uploadedFile = req.file;
    // const profileImage = uploadedFile ? `http://localhost:5000/uploads/${uploadedFile.filename}` : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

    // Create new user instance
    const newUser = new Registeruser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      verificationToken: otp,
      verified: false,
    });

    // Save new user to the database
    await newUser.save();

    return res.status(200).json({ status: 'Success', message: 'Successfully Registered!!' });
  } catch (error) {
    console.error('Error occurred during registration:', error);
    return res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = {
  registerUser,
};
