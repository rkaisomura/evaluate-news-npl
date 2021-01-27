import { text } from "body-parser";

//Function to POST
const postData = async (url, data = {}) => {
    const resp = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data) //Stringify the data
    });
    try {
        const newData = await resp.json(); //Jsonify the response
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
};

async function handleSubmit(event) {
    event.preventDefault()
    //Check what text was put into the form field
    let urlUser = document.getElementById('homepage').value;
    //If the URL is valid, send URL to server side through Post endpoint
    if (Client.checkForUrl(urlUser)){
        postData('http://localhost:8080/sentiment', {url: urlUser})
        .then(function(newData) {
            updateUI();
        });
    } else{
        alert ("Please enter a valid URL");
    }
};

//Update the UI with the results
const updateUI = async() =>{
    const url = "http://localhost:8080/sentiment";
    const req = await fetch (url);
    try {
        const info = await req.json();
        document.getElementById('score').innerHTML = "Polarity: " + checkPolarity(info.score);
        document.getElementById('agreement').innerHTML = "Agreement: " + checkAgreement(info.agreement);
        document.getElementById('subjectivity').innerHTML = "Subjectivity: " + checkSubjectivity(info.subjectivity);
        document.getElementById('irony').innerHTML = "Irony: " + checkIrony(info.irony);
        document.getElementById('confidence').innerHTML = "Confidence: " + info.confidence;
    }
    catch (error) {
        console.log("Error", error);
    }
}

//Check the polarity found in the element
function checkPolarity(score){
    let polarity;
    switch (score){
        case "P+":
            polarity = "strong positive (indicates the polarity found in the element it refers to).";
            break;
        case "P":
            polarity = "positive (indicates the polarity found in the element it refers to).";
            break;
        case "NEU":
            polarity = "neutral (indicates the polarity found in the element it refers to).";
            break;
        case "N":
            polarity = "negative (indicates the polarity found in the element it refers to).";
            break;
        case "N+":
            polarity = "strong negative (indicates the polarity found in the element it refers to).";
            break;
        case "NONE":
            polarity = "without sentiment (indicates the polarity was not found in the element it refers to).";
            break;
    }
    return polarity;
}

//Check the agreement
function checkAgreement(agreement){
    let agree;
    switch (agreement){
        case "AGREEMENT":
            agree = "agreement (the different elements have the same polarity)";
            break;
        case "DISAGREEMENT":
            agree = "disagreement (there is disagreement between the different elements' polarity)";
            break;
    }
    return agree;
}

//Check the subjectivity
function checkSubjectivity(subjectivity){
    let subject;
    switch (subjectivity){
        case "OBJECTIVE":
            subject = "ojective (the text does not have any subjectivity marks)";
            break;
        case "SUBJECTIVE":
            subject = "subjective (the text has subjective marks)";
            break;
    }
    return subject;
}

//Check the irony
function checkIrony(irony){
    let iron;
    switch (irony){
        case "NONIRONIC":
            iron = "nonironic (the text does not have ironic marks)";
            break;
        case "IRONIC":
            iron = "ironic (the text has inoric marks)";
            break;
    }
    return iron;
}

export { handleSubmit }
export { postData }
export { updateUI }
export { checkPolarity }
export { checkAgreement }
export { checkSubjectivity }
export { checkIrony }