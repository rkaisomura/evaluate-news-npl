const dotenv = require('dotenv');
dotenv.config();

const projectData = {};

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const app = express();
app.use(express.static('dist'));
console.log(__dirname);

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const keyApi = process.env.API_KEY;
console.log(`API Key is ${keyApi}`);


//POST entrypoint
const sentiment = async (req, res) => {
    const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?key=${keyApi}&text&model=general&lang=en&url=${req.body.url}';
    const fetchResponse = await fetch(apiUrl);
    try {
        const data = fetchResponse.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

app.post('/sentiment', function(req, res){
    sentiment(req, res);
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})
