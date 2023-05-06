const Book = require('../models/books');

const addBook = async (req, res) => {
    try{
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const { bookName, author, quantity, category } = req.body;
        const book = new Book({
            name: bookName,
            author: author,
            quantity: Number(quantity),
            category: category
        });
        const result = await book.save();
        return res.status(201).json({success: true, result});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

const getBooks = async (req, res) => {
    try{
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const books = await Book.find();
        return res.json({ success: true, books });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

const deleteBook = async (req, res) => {
    try{
        const bookId = req.params.bookId;
        const isAdmin = req.isAdmin;
        if(!isAdmin){
            return res.status(403).json({message: "You are not admin User" })
        }
        const books = await Book.findByIdAndDelete(bookId);
        console.log(books)
        return res.json({ success: true, message: "Book removed from the library" });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({success: false, error: err}); 
    }
}

module.exports = {
    addBook,
    getBooks,
    deleteBook
}