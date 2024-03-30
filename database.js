const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection failed:', error);
        process.exit(1);
    }
};

module.exports = {
    connectToDatabase,
}
