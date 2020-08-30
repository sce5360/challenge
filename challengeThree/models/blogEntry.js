const mongoose = require('mongoose');

let blogEntrySchema = mongoose.Schema({
    timestamp: Date,
    title: String,
    body: String,
    author: String
});

module.exports = mongoose.model('BlogEntry', blogEntrySchema);