const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('student');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('student');
        if(!course) return res.status(404).json({message: 'Course not found'});
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.createCourse = async (req, res)=>{
    try{
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
exports.deleteCourse = async (req, res)=>{
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if(!deletedCourse) return res.status(404).json({message: 'Course not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 

