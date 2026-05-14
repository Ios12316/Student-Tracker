const { v4: uuidv4 } = require('uuid');
const Student = require('../models/Student');
const {studentValidator, checkedStudentsValidator} = require('../validator/studentValidator');
const bcrypt = require('bcryptjs')
const generateToken = require('../Utis/generateToken')

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
        const {firstName, lastName, email, password, age, isEnrolled} = req.body;
        const {error} = studentValidator.validate({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            age:age,
            isEnrolled:isEnrolled,
        })
        const studentId = uuidv4();
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const newStudent = await Student.create({
            firstName,
            lastName,
            email,
            password,
            age,
            studentId,
            isEnrolled,
        });
        const token = await generateToken(newStudent._id)
        res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true, secure:process.env.NODE_ENV === 'production', sameSite:'lax'});
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
exports.checkedStudents = async (req, res) => {
    try {
        const {email, password} = req.body;
        const{error} = checkedStudentsValidator.validate({email, password})
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        const checkedStudents = await Student.findOne({email})
        if (!checkedStudents) return res.status(404).json({message:"Student not found"})
            const checkedPassword = await bcrypt.compare(password, checkedStudents.password)
        if(!checkedPassword) return res.status(401).json({message:"Invalid credentials"})
            const token = await generateToken(checkedStudents._id)
        res.cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly:true, secure:process.env.NODE_ENV === 'production', sameSite:'lax'});
            return res.status(200).json({message:"Sucessfully Login", data:checkedStudents})


    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
