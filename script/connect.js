function defaulthandleResponse(response) {
    if (response.status === 401) {
        return response.json().then((data) => {
            alert(data.message);
            window.location.href = "login.html";
        });
    }
    if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.message || 'Failed to do requested action, ask youssef to give you more information about the problem');
        });
    }
    return response.json();
}

function sendRequest(
    route,
    message,
    method,
    error_message,
    handleData,
    handleResponse = defaulthandleResponse
) {
    const url = getURL(route);

    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Add body for non-GET requests
    if (method.toUpperCase() !== 'GET' && message) {
        options.body = JSON.stringify(message);
    }

    fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch((error) => {
            console.error(error_message, error.message);
            alert(error.message);
        });
}



function getURL(route) {
    return `https://trading-card-game-server.onrender.com/` + route;
}