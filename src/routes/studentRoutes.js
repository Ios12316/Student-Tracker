const express = require('express');
const router = express.Router();
const {getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent} = require('../controllers/studentController');
router.get('/', getAllStudents).get('/get/:id', getStudentById).post('/post-student', createStudent).put('/update/:id', updateStudent).delete('/delete/:id', deleteStudent); 
module.exports = router;
