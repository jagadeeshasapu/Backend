const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const  Registeruser = require('../models/modal');
const { sendVerificationEmail } = require('../mail');
const VerificationToken = require('../models/modal');
const { sendForgotPassword } = require('../mail'); 

const verifyOTP = async (req, res) => {  
  try {
    const { email, otp } = req.body;
    const user = await Registeruser.findOne({ email, verificationToken: otp });

    if (user) {
      // Update user status to verified
      user.verified = true;
      await user.save();

      // Send a success response
      return res.status(200).json({ verified: true, message: "Email verified successfully" });
    } else {
      // Send a failure response if user not found or OTP is incorrect
      return res.status(404).json({ verified: false, message: 'User not found or invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ verified: false, message: 'Internal Server Error' });
  }
};

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Registeruser.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found with the provided email' });
        }

        // Generate new OTP
        const newOTP = generateOTP();

        // Update user's OTP in the database
        user.verificationToken = newOTP;
        await user.save();

        // Send OTP to user's email
        await sendForgotPassword(email, newOTP); // Call sendForgotPassword function

        res.status(200).json({ message: 'New OTP sent to your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  
  const updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await Registeruser.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate salt and hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
module.exports = {
  verifyOTP,
  forgotPassword,
  updatePassword
};