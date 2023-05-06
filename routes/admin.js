const express = require('express');

const adminController = require('../controllers/admin');

const bookController = require('../controllers/book');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/login', adminController.login);

router.post('/addBook', authenticatemiddleware.authenticate, bookController.addBook );

router.get('/books', authenticatemiddleware.authenticate, bookController.getBooks);

router.delete('/book/:bookId', authenticatemiddleware.authenticate, bookController.deleteBook);

router.post('/issueBook/:bookId/:studentId', authenticatemiddleware.authenticate, adminController.issueBookToStudent);

router.get('/issuedBooks', authenticatemiddleware.authenticate, adminController.studentIssuedBooks);

router.delete('/issuedBook/:issuedId/:bookId', authenticatemiddleware.authenticate, adminController.returnBook);

module.exports = router;