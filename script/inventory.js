
let inventory = [];

function getInventory() {
    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    sendRequest(`inventory`, { token }, 'POST', "Error fetching the user inventory",
        data => {
            console.log('User inventory fetched successfully:', data.data);
            inventory.length = 0;  
            data.data.forEach(card =>{
                inventory.push({ 
                    id: card.card_id,
                    name: card.card_name,
                    image: card.image_url,
                    description: card.description,
                    rarity: card.rarity
                })
            });
            console.log(inventory);
            loadInventory(inventory);
        }, 
        response => {
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
        }
    );
}


function loadInventory(cards) {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = ''; // Clear existing cards
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <p><strong>${card.name}</strong></p>
        `;
        cardElement.onclick = () => showCardDetails(card);
        inventoryGrid.appendChild(cardElement);
    });
}

getInventory();


function showCardDetails(card) {
    document.getElementById('card-name').textContent = card.name;
    document.getElementById('card-image').src = card.image;
    document.getElementById('card-description').textContent = card.description;
    document.getElementById('card-rarity').textContent = card.rarity;
    openModal('card-modal');
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function applyFilters() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const rarity = document.getElementById('rarity-filter').value;
    const filteredCards = inventory.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm);
        const matchesRarity = rarity ? card.rarity === rarity : true;
        return matchesSearch && matchesRarity;
    });
    loadInventory(filteredCards);
}

// Load all cards initially
// loadInventory(inventory);

// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
