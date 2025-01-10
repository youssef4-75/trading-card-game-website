
let trades = [
    {
        id: 1,
        offeredCards: ["Fire Dragon", "Ice Phoenix"],
        requestedCards: ["Earth Golem", "Lightning Tiger"],
        offeredImages: ["https://via.placeholder.com/150?text=Fire+Dragon", "https://via.placeholder.com/150?text=Ice+Phoenix"],
        requestedImages: ["https://via.placeholder.com/150?text=Earth+Golem", "https://via.placeholder.com/150?text=Lightning+Tiger"],
        requestedBy: "CardMaster123"
    },
    {
        id: 2,
        offeredCards: ["Water Serpent"],
        requestedCards: ["Thunder Hawk"],
        offeredImages: ["https://via.placeholder.com/150?text=Water+Serpent"],
        requestedImages: ["https://via.placeholder.com/150?text=Thunder+Hawk"],
        requestedBy: "CardCollector99"
    }
];

function showTradeDetails(tradeId) {
    const trade = trades.find(t => t.id === tradeId);

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h4>Offered Cards:</h4>
        ${trade.offeredImages.map(img => `<img src="${img}" alt="Card Image">`).join('')}
        <h4>Requested Cards:</h4>
        ${trade.requestedImages.map(img => `<img src="${img}" alt="Card Image">`).join('')}
        <p><strong>Requested by:</strong> ${trade.requestedBy}</p>
    `;

    openModal('trade-modal');
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.getElementById('trade-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const offeredCards = document.getElementById('offered-cards').value;
    const requestedCards = document.getElementById('requested-cards').value;

    console.log(`New trade created: Offered ${offeredCards}, Requested ${requestedCards}`);

    alert(`Trade created: Offered ${offeredCards} for ${requestedCards}`);
    document.getElementById('trade-form').reset();
});

function loadTrades() {
    // get the trades and put them in the trades variable
    //also when you finish this function, can you clear the trades variable?
    filterTrades()
}

function filterTrades() {
    const searchInput = document.getElementById('search-trades').value.toLowerCase();
    const tradeList = document.getElementById('trade-list');
    tradeList.innerHTML = '';

    const filteredTrades = trades.filter(trade =>
        trade.offeredCards.some(card => card.toLowerCase().includes(searchInput)) ||
        trade.requestedCards.some(card => card.toLowerCase().includes(searchInput)) ||
        trade.requestedBy.toLowerCase().includes(searchInput)
    );

    filteredTrades.forEach(trade => {
        const tradeItem = document.createElement('li');
        tradeItem.onclick = () => showTradeDetails(trade.id);
        tradeItem.innerHTML = `
            <div class="trade-info">
                <p><strong>Offered Cards:</strong> ${trade.offeredCards.join(', ')}</p>
                <p><strong>Requested Cards:</strong> ${trade.requestedCards.join(', ')}</p>
                <p><strong>Request by:</strong> ${trade.requestedBy}</p>
            </div>
        `;
        tradeList.appendChild(tradeItem);
    });
}

document.getElementById('search-trades').addEventListener('input', filterTrades);
loadTrades();
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
