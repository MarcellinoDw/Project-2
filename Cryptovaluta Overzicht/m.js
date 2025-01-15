// Startwaarden
let cryptoData = {
    Bitcoin: { price: 90000, balance: 0 },
    Ethereum: { price: 4800, balance: 0 },
    Litecoin: { price: 250, balance: 0 }
};

let transactionLog = document.getElementById("transaction-log");
let cryptoSelect = document.getElementById("crypto-select");
let amountInput = document.getElementById("amount-input");

// Huidige saldi tonen
function updateDisplay() {
    document.getElementById("btc-balance").textContent = `€${(cryptoData.Bitcoin.balance).toFixed(2)}`;
    document.getElementById("eth-balance").textContent = `€${(cryptoData.Ethereum.balance).toFixed(2)}`;
    document.getElementById("ltc-balance").textContent = `€${(cryptoData.Litecoin.balance).toFixed(2)}`;
}

// Transactie logica
function handleTransaction(type) {
    let cryptoType = cryptoSelect.value;
    let amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        transactionLog.textContent = "Voer een geldig bedrag in.";
        transactionLog.style.color = "red";
        return;
    }

    let crypto = cryptoData[cryptoType];
    let units = amount / crypto.price;

    if (type === "buy") {
        crypto.balance += amount;
        transactionLog.textContent = `Je hebt €${amount.toFixed(2)} in ${cryptoType} geïnvesteerd.`;
        transactionLog.style.color = "green";
    } else if (type === "sell") {
        if (amount > crypto.balance) {
            transactionLog.textContent = "Onvoldoende balans om te verkopen.";
            transactionLog.style.color = "red";
            return;
        }
        crypto.balance -= amount;
        transactionLog.textContent = `Je hebt €${amount.toFixed(2)} uit ${cryptoType} verkocht.`;
        transactionLog.style.color = "blue";
    }

    updateDisplay();
}

// Knoppen events
document.getElementById("buy-button").addEventListener("click", () => handleTransaction("buy"));
document.getElementById("sell-button").addEventListener("click", () => handleTransaction("sell"));

// Startscherm updaten
updateDisplay();
