const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    instructor:{
        type: String,
        required: true,
        
    },
    credits: {
        type: Number,
        required: true,
        min:1,
        max:6
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'F'],
        default: null
    },
    completedAt:{
        type: Date,
        default: null
    }
})
module.exports = mongoose.model('Course', courseSchema);