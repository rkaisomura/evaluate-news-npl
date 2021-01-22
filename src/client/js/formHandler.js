async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let urlUser = document.getElementById('homepage').value;
    if (Client.checkForUrl(urlUser)){
        const resp = await fetch('http://localhost:8080/sentiment', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type':'text/plain',
            },
            body: urlUser,
        })
        .then(resp => {
            const postRes = resp.text();
            return postRes;
        })
        .then((resp) => {
            updateUI(resp);
        });
    } else{
        alert ("Please enter a valid URL");
    }
};

function updateUI(data){
    document.getElementById('score').innerHTML = "Polarity: " + data.score;
    document.getElementById('agreement').innerHTML = "Agreement: " + data.agreement;
    document.getElementById('subjectivity').innerHTML = "Subjectivity: " + data.subjectivity;
    document.getElementById('irony').innerHTML = "Irony: " + data.irony;
    document.getElementById('confidence').innerHTML = "Confidence: " + data.confidence;
}

export { handleSubmit }
