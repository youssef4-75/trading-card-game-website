function defaulthandleResponse(response){
    if (response.status === 401) {
        return response.json().then((data) => {
            alert(data.message); 
            window.location.href = "login.html"; 
        });
    }
    if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.message || 'Failed to fetch user inventory');
        });
    }
    return response.json();
}

function sendRequest(
    route,
    message,
    method,
    error_message,
    handleResponseData,
    handleResponse = (response) => response.json() // Default JSON handler
) {
    const url = getURL(route);

    const options = {
        method: method.toUpperCase(), // Ensure method is in uppercase (e.g., GET, POST)
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Add body for non-GET requests
    if (method.toUpperCase() !== 'GET' && message) {
        options.body = JSON.stringify(message);
    }

    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                // Handle HTTP errors (non-2xx status codes)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return handleResponse(response); // Default: parse JSON
        })
        .then(handleResponseData) // Process response data
        .catch((error) => {
            console.error(error_message, error.message);
            alert(error.message); // Alert user of error
        });
}



function getURL(route){
    return `https://trading-card-game-server.onrender.com/` + route;
}