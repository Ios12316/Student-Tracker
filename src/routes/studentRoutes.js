const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authenticationmiddleware');
const {getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, checkedStudents} = require('../controllers/studentController');
router.get('/', authenticationMiddleware, getAllStudents).get('/get/:id', authenticationMiddleware, getStudentById).post('/post-student', createStudent).put('/update/:id', authenticationMiddleware, updateStudent).delete('/delete/:id', authenticationMiddleware, deleteStudent).post('/login', checkedStudents);
module.exports = router;