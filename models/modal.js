const mongoose = require('mongoose');

// Define the schema
const RegisteruserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false // Assuming it's not always verified by default
    },
    verificationToken: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    cartItems: {
        type: Array,
        required: false
    }
});

RegisteruserSchema.index({ verificationToken: 1 });

const Registeruser = mongoose.model('Registeruser', RegisteruserSchema);

// Export the model
module.exports = Registeruser;
