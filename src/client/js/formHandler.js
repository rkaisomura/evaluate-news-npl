function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const urlUser = document.getElementById('homepage').value;
    Client.checkForUrl(urlUser);

    console.log("::: Form Submitted :::");
    fetch('http://localhost:8081/sentiment')
    .then(res => res.json())
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message;
    })
}

export { handleSubmit }
