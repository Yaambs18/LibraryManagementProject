const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const IssueBook = require('../models/issueBook');
const Student = require('../models/students');
const Book = require('../models/books');

function isStringInvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const generateToken = async function (id, username, isAdmin){
    return jwt.sign({userId: id, name: username, isAdmin: isAdmin }, process.env.TOKEN_SECRET);
}

const login = async (req, res) => {
    try{
        const {email, password}  = req.body;
        if(isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({err : 'Bad Parameters: Something is missing'});
        }
        const user = await Admin.findOne({ 'email': email.toLowerCase() });
        if(user){
            console.log(user._id);
            const jwtToken = await generateToken(user._id, user.name, true);
            bcrypt.compare(password, user.password, (error, result) => {
                if(error){
                    console.log(error);
                    res.sendStatus(500).json(error);
                }
                if(result){
                    res.json({success: true, token: jwtToken, message: 'User Login Successful'});
                }
                else{
                    res.status(401).json({success: false, message: "Password is Incorrect. Please try again !!!"});
                }
            });
        }
        else{
            res.status(404).json({message: "User doesn't exist. Please Sign Up !!"});
        }

    }
    catch(err) {
        console.log(err);
        res.sendStatus(500).json({success: false, error: err}); 
    }
}

const issueBookToStudent = async (req, res) => {
    try{
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const { studentId, bookId } = req.params;
        const studentInfo = await Student.findById(studentId);
        const bookInfo = await Book.findById(bookId);
        console.log(studentInfo, bookInfo);
        if(!studentInfo || !bookInfo){
            return res.status(404).json({ success: false, message: "Invalid Student or Book Id"});
        }
        if(bookInfo.quantity<1){
            return res.status(404).json({ success: false, message: "Book Out of Stock"});
        }
        const issueBook = new IssueBook({studentInfo: studentInfo, bookInfo: bookInfo});
        const result = await issueBook.save();
        bookInfo.quantity -= 1;
        const updatedBook = await bookInfo.save();
        return res.json({ success: true, result });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

const studentIssuedBooks = async (req, res) => {
    try{
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const issuedBooks = await IssueBook.find().populate(["bookInfo", "studentInfo"]);
        return res.json({ success: true, issuedBooks });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

const returnBook = async (req, res) => {
    try{
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const { issuedId, bookId } = req.params;
        const returnedBook = await IssueBook.findByIdAndDelete(issuedId);
        if(returnedBook){
            const book = await Book.findById(bookId);
            book.quantity += 1;
            await book.save();
        }
        return res.status(200).json({ success: true, message: "Book returned successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

module.exports = {
    login,
    generateToken,
    isStringInvalid,
    issueBookToStudent,
    studentIssuedBooks,
    returnBook
}