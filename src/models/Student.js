const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 100
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    isEnrolled: {
        type: Boolean,
        default: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Student', studentSchema);


