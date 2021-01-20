function checkForUrl(inputText) {
    const url = inputText.match (/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/); //using regular expression in order to validate the URL
    if(url == null){
        return 0;
    } else{
        return 1;
    }
}

export { checkForUrl }
