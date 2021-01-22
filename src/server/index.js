const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const app = express();
app.use(express.static('dist'));
//console.log(__dirname);

const cors = require('cors');
const {default: fetch} = require('node-fetch');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text());

const keyApi = process.env.API_KEY;
console.log(`API Key is ${keyApi}`);

const apiURL = 'https://api.meaningcloud.com/sentiment-2.1?key=${keyApi}&text&model=general&lang=en&url=';
let urlInput = [];

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Listening on port 8080!');
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

//POST route
app.post('/sentiment', insertPost);
async function insertPost(req,resp){
    newEntry = req.body;
    urlInput = req.body.url;
    console.log(urlInput);

    const fetchResponse = await fetch(apiURL+urlInput)
    .then((fetchResponse) => fetchResponse.json())
    .then(data => {
        resp.send(data)
        .catch((error) => {
            console.log("Error: ", error);
        });
    })
}