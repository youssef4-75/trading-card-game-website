
        // Placeholder backend function
        function saveProfile(profileData) {
            console.log("Saving profile...", profileData);
            // Simulate backend save operation
            alert("Profile saved successfully!");
        }

        document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const profileData = {
                username: document.getElementById('username').value,
                displayName: document.getElementById('display-name').value,
                profileIcon: document.getElementById('profile-icon').value,
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
    