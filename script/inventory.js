
let inventory = [
    { 
        id: 1, 
        name: "Fire Dragon", 
        image: "https://via.placeholder.com/150?text=Fire+Dragon", 
        description: "A fiery dragon that burns all in its path.", 
        rarity: "Rare" 
    },
    { 
        id: 2, 
        name: "Ice Phoenix", 
        image: "https://via.placeholder.com/150?text=Ice+Phoenix", 
        description: "A mythical phoenix that freezes everything.", 
        rarity: "Epic" 
    },
    { 
        id: 3, 
        name: "Earth Golem", 
        image: "https://via.placeholder.com/150?text=Earth+Golem", 
        description: "A powerful golem made of solid rock.", 
        rarity: "Uncommon" 
    },
    {
        id: 4,
        name: "Lightning Tiger",
        image: "https://via.placeholder.com/150?text=Lightning+Tiger",
        description: "A tiger that controls lightning.",
        rarity: "Common"
    }
];

function getInventory() {
    //give me the inventory in the format above
    //set the inventory variable to whatever what selected
}

getInventory()

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
loadInventory(inventory);
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
