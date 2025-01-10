
let isLogin = true;

const toggleAuth = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const registerExtraFields = document.getElementById('register-extra-fields');

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
    //get the logins from the database
    //compare them with the inserted logins
    //if they're successful, run the following code
    //also look up how the tokens work, cuz they have to do with backend
    const token = "example_token_here"; // Replace with real token from backend
    localStorage.setItem('userToken', token);
    alert("Login successful!");
    window.location.href = "profile.html"; // Redirect to the profile page
}

function register(email, password, username) {
    console.log("Registering with", { email, password, username });
    alert("Registration successful!");
    //get the logins from the database
    //check if they dont already exist
    //add the new logins to the databse
    //run the login function to automatically connect the user
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
