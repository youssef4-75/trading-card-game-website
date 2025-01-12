
function editProfile() {
    console.log("Edit profile backend logic placeholder");
    window.location.href = 'profileEdit.html';
}

function loadProfile() {
    console.log("Load profile backend logic placeholder");



    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    const url = getURL(`loading`);


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to fetch user data');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('User data fetched successfully:', data.data);
            const username = data.data.username;
            const displayName = data.data.display_name;
            const description = data.data.description;

            document.getElementById("username").textContent = username;
            document.getElementById("displayName").textContent = `Display Name: ${displayName}`;
            document.getElementById("description").textContent = `Description: ${description}`;
        })
        .catch(error => {
            console.error('Error fetching user data:', error.message);
            alert(error.message); // Show an error message to the user
        });





    // // Placeholder logic for loading user data dynamically
    // const username = "CardMaster";
    // const displayName = "Master of Cards";
    // const description = "Loves collecting and trading rare cards.";

    // document.getElementById("username").textContent = username;
    // document.getElementById("displayName").textContent = `Display Name: ${displayName}`;
    // document.getElementById("description").textContent = `Description: ${description}`
}

function loadInventory() {

    let inventory = [
        // { name: "Fire Dragon", rarity: "Rare" },
        // { name: "Ice Phoenix", rarity: "Legendary" },
        // { name: "Earth Golem", rarity: "Common" }
    ];


    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    const url = getURL(`inventory`);


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
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
            console.log('User inventory fetched successfully:', data.data);
            // inventory.length = 0;  
            data.data.forEach(card => {
                inventory.push({
                    name: card.card_name,
                    rarity: card.rarity
                })
            });

            const inventoryList = document.getElementById("inventory");
            inventoryList.innerHTML = "";

            inventory.forEach(item => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-rarity">${item.rarity}</span>
        `;
                inventoryList.appendChild(listItem);
            });

        })
        .catch(error => {
            console.error('Error fetching user data:', error.message);
            alert(error.message); // Show an error message to the user
        });
}

function logout() {
    localStorage.removeItem('userToken');
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
}

// Simulate loading data on page load
loadProfile();
loadInventory();
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
