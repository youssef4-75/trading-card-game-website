const colors = {
    Common: list("#A9A9A9", 3),
    Uncommon: list("#32CD32", 3),
    Rare: list("#1E90FF", 3),
    Epic: list("#8A2BE2", 3),
    Legendary: ["#B700FF", "#00EEFF", "#00FF59"],
}

function list(a, i){
    al = [];
    for(let j=0; j<i; j++){
        al.push(a);
    }
    return al;
}


function editProfile() {
    window.location.href = 'profileEdit.html';
}

function loadProfile() {
    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    sendRequest(`loading`, { token }, 'POST', "Error fetching user data: ", 
        data => {
            const username = data.data.username;
            const displayName = data.data.display_name;
            const description = data.data.description;
            const url = data.data.profile_icon;

            document.getElementById("username").textContent = username;
            document.getElementById("displayName").textContent = `Display Name: ${displayName}`;
            document.getElementById("description").textContent = `Description: ${description}`;
            document.getElementById("profile-icon").src = url;
        }
    )
}

function countOccurrences(items) {
    const counts = {};
    const rarities = {}

    // Count occurrences of each item
    items.forEach(item => {
        counts[item.name] = (counts[item.name] || 0) + 1;
        rarities[item.name] = item.rarity;
    });

    // Convert the counts object into a list of tuples
    return {
        occ: Object.entries(counts),
        rar: Object.entries(rarities)
    };
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

    sendRequest(`inventory`, { token }, 'POST', "Error loading the users inventory", 
        data => {
            // inventory.length = 0;  
            data.data.forEach(card => {
                inventory.push({
                    name: card.card_name,
                    rarity: card.rarity
                })
            });

            const inventoryList = document.getElementById("inventory");
            inventoryList.innerHTML = "";

            const ultimateInventory = countOccurrences(inventory);

            for(let i=0; i<ultimateInventory.occ.length; i++){
                const card_name = ultimateInventory.occ[i][0];
                const card_occ = ultimateInventory.occ[i][1];
                const card_rar= ultimateInventory.rar[i][1];


                const listItem = document.createElement("li");
                listItem.style.background = `linear-gradient(to right, ${colors[card_rar][0]}, ${colors[card_rar][1]});`
                listItem.innerHTML = `
            <span class="item-name">${card_name} × ${card_occ}</span>
            <span class="item-rarity" style="
    background: linear-gradient(to bottom right, ${colors[card_rar][0]} 8%, ${colors[card_rar][1]} 50%, ${colors[card_rar][2]} 90%);padding: 10px;
    border-radius: 17px;
    width: 100px;
    text-align: center
            ">${card_rar}</span>
        `;
                inventoryList.appendChild(listItem);
            
                 
            }

        }        
    )

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
