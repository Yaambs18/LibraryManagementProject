const express = require('express');

const studentController = require('../controllers/student');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', studentController.addStudent);

router.post('/login', studentController.loginStudent);

router.get('/books', authenticatemiddleware.authenticate, studentController.studentIssuedBooks);

module.exports = router;