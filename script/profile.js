
function editProfile() {
    console.log("Edit profile backend logic placeholder");
    window.location.href = 'profileEdit.html';
}

function loadProfile() {
    console.log("Load profile backend logic placeholder");
    // Placeholder logic for loading user data dynamically
    const username = "CardMaster";
    const displayName = "Master of Cards";
    const description = "Loves collecting and trading rare cards.";

    document.getElementById("username").textContent = username;
    document.getElementById("displayName").textContent = `Display Name: ${displayName}`;
    document.getElementById("description").textContent = `Description: ${description}`;
}

function loadInventory() {
    console.log("Load inventory backend logic placeholder");
    // Placeholder inventory data
    let inventory = [
        { name: "Fire Dragon", rarity: "Rare" },
        { name: "Ice Phoenix", rarity: "Legendary" },
        { name: "Earth Golem", rarity: "Common" }
    ];

    function getDisplay() {
        //give me the display in the format above
        //set the display variable to whatever what selected
    }

    getDisplay()

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
}

function logout() {
    localStorage.removeItem('userToken');
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
}

// Simulate loading data on page load
loadProfile();
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
