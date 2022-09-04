const express = require('express');
const cors = require('cors');
// require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/formApp');
let db = mongoose.connection;

global.__basedir = __dirname;
db.once('open', function () {
    console.log('connected to database');
})
db.on('error', function (err) {
    console.log(err);
})
const app = express();
bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
let feedApi = require('./api/Feeds')
let commentApi = require('./api/Comments')
let analyticsApi = require('./api/Analytics')
let voteApi = require('./api/Votes')


// Feed Api

app.post('/create-feed', async function (req, res) {
    let response = await feedApi.createFeed(req.body)   
    res.json(response)
})

app.get('/get-feed', async function (req, res) {
    let response = await feedApi.getFeed()
    res.json(response)
})

// Vote Api

app.post('/create-vote', async function (req, res) {
    let response = await voteApi.createVote(req.body)
    res.json(response)
})

app.get('/get-vote', async function (req, res) {
    let response = await voteApi.getVote()
    res.json(response)
})


// Comment Api
app.post('/create-comment', async function (req, res) {
    let response = await commentApi.createComment(req.body)
    res.json(response)
})

app.get('/get-comment', async function (req, res) {
    let response = await commentApi.getComment()
    res.json(response)
})


// Analytics  Api
app.get('/get-analytics', async function (req, res) {
    let response = await analyticsApi.getAnalytics()
    res.json(response)
})

app.post('/create-analytics', async function (req, res) {
    let response = await analyticsApi.createAnalytics(req.body)
    res.json(response)
})


app.listen(9090, function () {
    console.log('server started on port 9090...')
});