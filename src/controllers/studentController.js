const { v4: uuidv4 } = require('uuid');
const Student = require('../models/Student');
const studentValidator = require('../validator/studentValidator');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ enrolledAt: -1 });
        if(students.length === 0) {
            return res.status(404).json({message:"Students not found"});
        }
        res.status(200).json({message:"success", data: students, count: students.length});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({message:"success", data: student});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createStudent = async (req, res) => {
    try {
        const {firstName, lastName, email, age, isEnrolled, enrolledAt} = req.body;
        const {error} = studentValidator.validate({
            firstName:firstName,
            lastName:lastName,
            email:email,
            age:age,
            isEnrolled:isEnrolled,
            enrolledAt:enrolledAt
        })
        const studentId = uuidv4();
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const newStudent = await Student.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            age:age,
            studentId:studentId,
            isEnrolled:isEnrolled,
            enrolledAt:enrolledAt
        });
        res.status(201).json({message:"success", data:newStudent});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
