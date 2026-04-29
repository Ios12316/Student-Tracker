const express = require('express');
const router = express.Router();
const {getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent} = require('../controllers/studentController');
router.get('/', getAllStudents).get('/:id', getStudentById).post('/', createStudent).put('/:id', updateStudent).delete('/:id', deleteStudent);
module.exports = router;