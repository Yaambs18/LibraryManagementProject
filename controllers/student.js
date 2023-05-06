const bcrypt = require('bcrypt');

const Student = require('../models/students');
const IssueBook = require('../models/issueBook');

const isStringInvalid = require('./admin').isStringInvalid;
const generateToken = require('./admin').generateToken;

const addStudent = async (req, res ) => {
    try{
        console.log(req.body);
        const { name, email, password } = req.body;
        if(isStringInvalid(email) || isStringInvalid(password) || isStringInvalid(name)){
            return res.status(400).json({err : 'Bad Parameters: Something is missing'});
        }
        const passHash = await bcrypt.hash(password, 10);
        const student = new Student({
            name: name,
            email: email.toLowerCase(),
            password: passHash
        });
        await student.save();
        return res.status(201).json({ success: true, message: 'Successfully created a new student profile !!!'});

    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

const loginStudent = async (req, res) => {
    try{
        const { email, password } = req.body;
        const student = await Student.findOne({ 'email': email.toLowerCase() });
        if(student){
            const isPassMatched = await bcrypt.compare(password, student.password);
            if(isPassMatched){
                const jwtToken = await generateToken(student._id, student.name, false);
                res.json({success: true, token: jwtToken, message: 'User Login Successful'});
            }
            else{
                res.status(401).json({success: false, message: "Password is Incorrect. Please try again !!!"});
            }
        }
        else{
            res.status(404).json({message: "User doesn't exist. Please Sign Up !!"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
    
}

const studentIssuedBooks = async (req, res) => {
    try{
        const student = req.user;
        const issuedBooks = await IssueBook.find({'studentInfo': student }).populate("bookInfo");
        return res.json({ success: true, issuedBooks });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

module.exports = {
    addStudent,
    loginStudent,
    studentIssuedBooks
}