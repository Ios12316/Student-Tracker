const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        const connection = await mongoose.connect(process.env.MONGODBURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
}   

module.exports = connectDB;
