
// Placeholder backend function
function saveProfile(profileData) {

    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    profileData.token = token;

    sendRequest(`profiles`, profileData, 'PUT', "Error updating user data: ",
        data => console.log('User data updated successfully: ', data.message),
    )
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
    document.getElementById('profile_img').src = profileData.profile_url || 'https://th.bing.com/th/id/OIP.OZHMzsNssTIUa6TUUZykRQHaHa?rs=1&pid=ImgDetMain';
    document.getElementById('username-preview').textContent = profileData.username;

    // Call the backend placeholder function
    saveProfile(profileData);
});
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
