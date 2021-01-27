const dotenv = require('dotenv');
dotenv.config();
const keyApi = process.env.API_KEY;
console.log(`API Key is ${keyApi}`);

projectData = {};

var path = require('path');
const express = require('express');
const app = express();
app.use(express.static('dist'));
console.log(__dirname);

const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const mockAPIResponse = require('./mockAPI.js');

//const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?key=${keyApi}&text&model=general&lang=en&url=';
const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?';
let urlInput = "";

// designates what port the app will listen to for incoming requests
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
    console.log("---------------->");
    console.log(projectData);
    console.log("----------------<");
    resp.send(projectData);
}

app.get ('/sentiment', function (req, resp) {
    resp.send(projectData);
})