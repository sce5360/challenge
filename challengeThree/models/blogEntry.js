const mongoose = require('mongoose');

let blogEntrySchema = mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BlogEntry', blogEntrySchema);
