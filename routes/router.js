const express = require('express');
const { loginUser, updateUserCart, getUserDetails } = require('../controllers/login');
const { registerUser } = require('../controllers/register');
const { verifyOTP } = require('../controllers/verifyemail');
const { verifyToken } = require('../middleware/verify-token');
const { products } = require('../controllers/product');
const { updateProfile } = require('../controllers/update-profile');
const uploadMiddleware = require('../middleware/uploadmiddle');
const { forgotPassword, updatePassword} = require('../controllers/verifyemail')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/verifyToken', verifyToken);
router.get('/product', products);
router.put('/product/:id', updateUserCart);
router.get('/user/:id', getUserDetails);
router.post('/forgot-password', forgotPassword);
router.post('/update-password', updatePassword);
router.post('/update-profile', updateProfile);



router.post('/updateProfile', uploadMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      let updatedUser = { ...req.body };
  
      if (req.file) {
        const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        updatedUser = { ...updatedUser, profileImage: photoUrl };
  
        // You can save the updated user information to MongoDB here
        // For example, if you have a function called updateUserProfile, you can call it here
        // await updateUserProfile(userId, updatedUser);
      }
  
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




module.exports = router;
