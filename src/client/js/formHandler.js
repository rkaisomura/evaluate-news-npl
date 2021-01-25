import { response } from "express";

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let urlUser = document.getElementById('homepage').value;
    if (Client.checkForUrl(urlUser)){
        postData('http://localhost:8080/sentiment', {url: urlUser})
        .then(function(newData) {
            updateUI();
        });
    } else{
        alert ("Please enter a valid URL");
    }
};

const postData = async (url, data = {}) => {
    const resp = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await resp.json();
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
};

const updateUI = async() =>{
    url = "/sentiment";
    const req = await fetch (url);
    try {
        const info = await req.json();
        document.getElementById('score').innerHTML = "Polarity: " + info.score;
        document.getElementById('agreement').innerHTML = "Agreement: " + info.agreement;
        document.getElementById('subjectivity').innerHTML = "Subjectivity: " + info.subjectivity;
        document.getElementById('irony').innerHTML = "Irony: " + info.irony;
        document.getElementById('confidence').innerHTML = "Confidence: " + info.confidence;
    }
    catch (error) {
        console.log("Error", error);
    }
}

export { handleSubmit }
export { postData }
export { updateUI}