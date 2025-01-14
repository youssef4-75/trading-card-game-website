// response => {
//     if (response.status === 401) {
//         return response.json().then((data) => {
//             alert(data.message); // Show alert: 'Token is missing'
//             window.location.href = "login.html"; // Redirect to login page
//         });
//     }
//     if (!response.ok) {
//         return response.json().then(data => {
//             throw new Error(data.message || 'Failed to fetch user inventory');
//         });
//     }
//     return response.json();


function defaulthandleResponse(response){
    if (response.status === 401) {
        return response.json().then((data) => {
            alert(data.message); // Show alert: 'Token is missing'
            window.location.href = "login.html"; // Redirect to login page
        });
    }
    if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.message || 'Failed to fetch user inventory');
        });
    }
    return response.json();
}

function sendRequest(route, message, method, error_message, handleResponseData, handleResponse = defaulthandleResponse){
    const url = getURL(route);
    const up_message = {
        method: method, // GET, POST, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(method != 'GET') up_message.body = JSON.stringify(message)

    fetch(url, up_message)
    .then(handleResponse)
    .then(handleResponseData)
    .catch(error => {
        console.error(error_message, error.message);
        alert(error.message); // Show an error message to the user
    });
}

function getURL(route){
    return `http://${serverAddress}:${port}/` + route;
}