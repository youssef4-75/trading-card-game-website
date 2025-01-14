let trades = [];



function getNameList(compressedString) {
    const cardIds = [];
    const cardNames = [];
    const cardUrls = [];
    console.log(compressedString);

    if (!compressedString) return [[""], [""]];

    compressedString.split(';').forEach(item => {
        const parts = item.split('|');
        cardIds.push(parts[0]);
        cardNames.push(parts[1]);
        cardUrls.push(parts[2]);
    });

    return [cardIds, cardNames, cardUrls];
}

function getCardNamesList(cardNamesString) {
    if (!cardNamesString) return [];
    return cardNamesString.split(',').map(name => name.trim());
}

function acceptTrade(id) {

    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    sendRequest(`trades`, {token, id}, 'PUT', "Error in accepting a trade", 
        data=>{ if (data.message == true) {
            alert("you accomplished this trade successfuly"); 
            trades = trades.filter(obj => obj.id !== id);
            location.reload();
        }
    })

    document.getElementById('trade-form').reset();

}

function showTradeDetails(tradeId) {
    const trade = trades.find(t => t.id === tradeId);

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h4>Offered Cards:</h4>
            <div id="cards-container">
                ${trade.offeredImages.map(img => `<img src="${img}" alt="Card Image">`).join('')}
            </div>
        <h4>Requested Cards:</h4>
            <div id="cards-container">
                ${trade.requestedImages.map(img => `<img src="${img}" alt="Card Image">`).join('')}
            </div>
        <p><strong>Requested by:</strong> ${trade.requestedBy}</p>
    `;

    accepting_button = document.getElementById("accepting-trade");
    accepting_button.onclick = eve => {acceptTrade(trade.id);};
    openModal('trade-modal');
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.getElementById('trade-form').addEventListener('submit', submit);

function submit(e) {
    e.preventDefault();

    const offeredCards = getCardNamesList(document.getElementById('offered-cards').value);
    const requestedCards = getCardNamesList(document.getElementById('requested-cards').value);

    const token = localStorage.getItem('userToken'); // Retrieve token from local storage

    if (!token) {
        console.error('Token is not found in local storage');
        window.location.href = "login.html";
        return;
    }

    sendRequest(`trades`, { token, of: offeredCards, re: requestedCards }, 'POST', "Error, couldnt add this trade",
        data => { if (data.message == true) {
            alert("your trade has been added successfully"); 
            document.getElementById('trade-form').reset();
            location.reload();
        }}
    )
}

function loadTrades() {
    sendRequest(`trades`, {}, 'GET', "Error getting all trades", 
        data => {
            
            trades.length = 0;  

            data.data.forEach(trade => {

                const listat0 = getNameList(trade.requested_cards);
                console.log(listat0);
                const listat1 = getNameList(trade.offered_cards);
                trades.push({
                    id: trade.trade_id,
                    requestedCardsIds: listat0[0],
                    offeredCardsIds: listat1[0],

                    requestedCards: listat0[1],
                    offeredCards: listat1[1],

                    requestedImages: listat0[2],
                    offeredImages: listat1[2],

                    requestedBy: trade.initiator_display_name
                })
                
            });

            filterTrades();

        }, 

        response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to fetch user inventory');
                });
            }
            return response.json();
        }
    )
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
filterTrades();
document.getElementById('search-trades').addEventListener('input', filterTrades);
loadTrades();
// Redirect to login if not logged in
const userToken = localStorage.getItem('userToken');
if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page
}
