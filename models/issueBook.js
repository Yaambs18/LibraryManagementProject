const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueBookSchema = new Schema({
    bookInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    studentInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    issueDate: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * 60 *1000
    }
});

module.exports = mongoose.model('IssueBook', issueBookSchema);