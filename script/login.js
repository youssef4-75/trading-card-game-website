
let isLogin = true;

const toggleAuth = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const registerExtraFields = document.getElementById('register-extra-fields');

function handleResponseData(prefix, data) {
    console.log(prefix, data);
    if (data && data.token) {
        const token = data.token; // Replace with real token from backend
        localStorage.setItem('userToken', token);
        alert("Login successful!");
        window.location.href = "profile.html"; // Redirect to the profile page
    } else {
        alert(prefix + "Error:" + data);
    }
}


toggleAuth.addEventListener('click', function () {
    isLogin = !isLogin;

    if (isLogin) {
        authTitle.textContent = 'Login';
        authSubmit.textContent = 'Login';
        toggleAuth.textContent = "Don't have an account? Register here.";
        registerExtraFields.style.display = 'none';
    } else {
        authTitle.textContent = 'Register';
        authSubmit.textContent = 'Register';
        toggleAuth.textContent = 'Already have an account? Login here.';
        registerExtraFields.style.display = 'block';
    }
});

// Placeholder backend functions
function login(email, password) {

    const message = {
        email,
        password,
        newUser: false
    };

    sendRequest(`authenticate`, message, 'POST', "Error while trying to log", data => {
        handleResponseData('Success:', data)
    }, response => {
        if (!response.ok) {
            // Handle the 401 Unauthorized error here
            return response.json().then(data => {
                throw new Error(data.message || 'Unauthorized');
            });
        }
        return response.json();

    })
}

function register(email, password, username) {

    const message = {
        email,
        password,
        username,
        newUser: true
    };

    sendRequest(`authenticate`, message, 'POST', "Error in registring", data => handleResponseData("Succes", data))
}

document.getElementById('auth-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        login(email, password);
    } else {
        const username = document.getElementById('username').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        register(email, password, username);
    }
});
