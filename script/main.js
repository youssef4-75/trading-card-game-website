
// Page Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = link.getAttribute('href');
    });
});

// Modal control
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Backend placeholders
function login() {
    console.log("Login backend logic placeholder");
}

function register() {
    console.log("Register backend logic placeholder");
}

function fetchProfile() {
    console.log("Fetch profile backend logic placeholder");
}

function updateProfile() {
    console.log("Update profile backend logic placeholder");
}

function fetchInventory() {
    console.log("Fetch inventory backend logic placeholder");
}

function createTrade() {
    console.log("Create trade backend logic placeholder");
}

function fetchTrades() {
    console.log("Fetch trades backend logic placeholder");
}

function createPost() {
    console.log("Create post backend logic placeholder");
}

function fetchPosts() {
    console.log("Fetch posts backend logic placeholder");
}

function sendMessage() {
    console.log("Send message backend logic placeholder");
}

function fetchMessages() {
    console.log("Fetch messages backend logic placeholder");
}
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
