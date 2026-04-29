const express = require('express');
const router = express.Router();
const {getAllCourses, getCourseById, createCourse, deleteCourse} = require('../controllers/courseController');
router.get('/', getAllCourses).get('/:id', getCourseById).post('/', createCourse).delete('/:id', deleteCourse);
module.exports = router;
