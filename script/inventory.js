
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
        data.data.forEach(card =>{
            inventory.push({ 
                id: card.card_id,
                name: card.card_name,
                image: card.image_url,
                description: card.card_description,
                rarity: card.rarity
            })
        });
        loadInventory(inventory);

    })
    .catch(error => {
        console.error('Error fetching user data:', error.message);
        alert(error.message); // Show an error message to the user
    });


}

getInventory();

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

// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
