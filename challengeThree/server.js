const express = require('express');
var mongoose = require('mongoose');
const BlogEntry = require('./models/blogEntry');
const port = 8080;

mongoose.connect('mongodb://localhost/blogEntries', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, `connection error:`));
db.once('open', () => console.log('Connected to Database'));


const app = express()
app.use(express.json({ "type": "application/json" }))


// Retrieve blog entry by id
app.get('/entry/:id', async (req, res) => {
    try {
        let result = await BlogEntry.findById(req.params.id).exec()
        return res.status(200).send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Error getting blog entry')
    }
})

// Retrieve list of blog entries
app.get('/entryList/:page', async (req, res, next) => {
    try {
        let blogEntriesPerPage = 3
        let page = req.params.page

        let result = await BlogEntry.find({})
            .sort({ timestamp: -1 })
            .skip((blogEntriesPerPage * page) - blogEntriesPerPage)
            .limit(blogEntriesPerPage)
        return res.status(200).send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Error getting recent entries')
    }
})

// Stores new blog entry
app.post('/entry', async (req, res) => {
    let newEntry = new BlogEntry({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        timestamp: Date.now()
    });
    try {
        // unique id assigned within mongoose
        let result = await newEntry.save()
        return res.status(200).send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Error saving blog entry')
    }
})

app.listen(port)
console.log('Listening on port ' + port);
