

function sendRequest(serverAddress, port, route, message, method, handleResponseData, isString=-1){
    const url = `http://${serverAddress}:${port}/${route}`;
    if(isString === -1){
        throw "you need to identify your return type";
    }
    message.retType = isString;
    fetch(url, {
        method: method, // GET, POST, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if(isString) response.text();
        else response.json();
        console.log(response);
    })
    .then(data => handleResponseData('Success:', data))
    .catch(error => console.error('Error:', error));
}

function getURL(route){
    return `http://${serverAddress}:${port}/` + route;
}