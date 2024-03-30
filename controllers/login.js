const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registeruser = require('../models/modal');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'Failed', message: 'All Fields must be filled' });
    }

    const user = await Registeruser.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect email' });
    }   

    if (!user.verified) {
      return res.status(401).json({ message: 'User is not verified. Please check your email for verification.' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '20m' });

 
    res.status(200).json({ message: 'Login successful', token, "user_data":user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};
const updateUserCart = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data checking...",id,data);

    if (!id) {
      return res.status(400).json({ status: 'Failed', message: 'Id is missing' });
    }

    const user = await Registeruser.findOneAndUpdate( {_id : id} ,{ $set: {cartItems: data}});

    if (!user) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect email' });
    }   
 
    res.status(200).json({ message: 'Cart updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data checking...",id,data);

    if (!id) {
      return res.status(400).json({ status: 'Failed', message: 'Id is missing' });
    }

    const user = await Registeruser.findById( {_id : id});

    if (!user) {
      return res.status(400).json({ status: 'Failed', message: 'Incorrect email' });
    }   
 
    res.status(200).json({ message: 'Cart updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Failed', message: 'Please try after sometime!!' });
  }
};


module.exports = {
  loginUser,
  updateUserCart,
  getUserDetails
};










  