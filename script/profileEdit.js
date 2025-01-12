
// Placeholder backend function
function saveProfile(profileData) {

    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }
    
    profileData.token = token;

    const url = getURL(`profiles`);

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })
        .then(response => {
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
        })
        .then(data => {
            console.log('User data updated successfully:', data.message);
            // inventory.length = 0;  
        })
        .catch(error => {
            console.error('Error fetching user data:', error.message);
            alert(error.message); // Show an error message to the user
        });
}

document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const profileData = {
        username: document.getElementById('username').value,
        display_name: document.getElementById('display-name').value,
        profile_url: document.getElementById('profile-icon').value,
        description: document.getElementById('description').value
    };

    // Update the preview
    document.getElementById('profile-icon-preview').src = profileData.profileIcon || 'https://via.placeholder.com/100';
    document.getElementById('username-preview').textContent = profileData.username;

    // Call the backend placeholder function
    saveProfile(profileData);
});
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
