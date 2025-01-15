// Variabelen
let balance = 1000.0;
let ownedUnits = 0;
let currentPrice = 120.0;

const balanceDisplay = document.getElementById("available-balance");
const ownedUnitsDisplay = document.getElementById("owned-units");
const currentPriceDisplay = document.getElementById("current-price");
const transactionLog = document.getElementById("transaction-log");
const amountInput = document.getElementById("amount-input");

const buyButton = document.getElementById("buy-button");
const sellButton = document.getElementById("sell-button");

// Update weergave
function updateDisplay() {
    balanceDisplay.textContent = `€${balance.toFixed(2)}`;
    ownedUnitsDisplay.textContent = ownedUnits;
    currentPriceDisplay.textContent = `€${currentPrice.toFixed(2)}`;
}

// Kopen
buyButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        transactionLog.textContent = "Voer een geldig bedrag in.";
        return;
    }

    const cost = amount;

    if (cost > balance) {
        transactionLog.textContent = "Onvoldoende saldo.";
        return;
    }

    ownedUnits += cost / currentPrice;
    balance -= cost;

    transactionLog.textContent = `Je hebt €${cost.toFixed(2)} geïnvesteerd in het product.`;
    transactionLog.style.color = "green";

    updateDisplay();
});

// Verkopen
sellButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        transactionLog.textContent = "Voer een geldig bedrag in.";
        return;
    }

    const unitsToSell = amount / currentPrice;

    if (unitsToSell > ownedUnits) {
        transactionLog.textContent = "Onvoldoende eenheden om te verkopen.";
        return;
    }

    ownedUnits -= unitsToSell;
    balance += amount;

    transactionLog.textContent = `Je hebt €${amount.toFixed(2)} verkocht.`;
    transactionLog.style.color = "blue";

    updateDisplay();
});

// Startinstellingen
updateDisplay();
