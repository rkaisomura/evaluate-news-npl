//API key
const dotenv = require('dotenv');
dotenv.config();
const keyApi = process.env.API_KEY;
console.log(`API Key is ${keyApi}`);

//Empty JS object
projectData = {};

var path = require('path');
//Require express to run server and routes
const express = require('express');
//Start up an instance of app
const app = express();
app.use(express.static('dist'));
console.log(__dirname);

// Cors for cross origin allowance
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors());

//Middleware
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const mockAPIResponse = require('./mockAPI.js');

const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?';
let urlInput = "";

// Designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

//POST route
app.post('/sentiment', insertPost);
async function insertPost(req,resp){
    console.log(urlInput);
    urlInput = req.body.url;
    
    console.log(urlInput);

    const urlAPI = `${apiURL}key=${keyApi}&url=${urlInput}&lang=en`;
    const fetchResponse = await fetch(urlAPI);
    console.log(fetchResponse);
   
    const sentimentData = await fetchResponse.json();
    console.log(sentimentData);

    projectData = {
        score: sentimentData.score_tag,
        agreement: sentimentData.agreement,
        subjectivity: sentimentData.subjectivity,
        irony: sentimentData.irony,
        confidence: sentimentData.confidence
    }
    console.log(projectData);
    resp.send(projectData);
}

app.get ('/sentiment', function (req, resp) {
    resp.send(projectData);
})