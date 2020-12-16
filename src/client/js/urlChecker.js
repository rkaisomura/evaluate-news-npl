function checkForUrl(inputText) {
    const url = inputText.match (/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/); //using regular expression in order to validate the URL
    if(url == null){
        alert("Please enter a valid URL");
        return false;
    } else{
        return true;
    }
}

export { checkForUrl }
