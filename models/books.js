const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);