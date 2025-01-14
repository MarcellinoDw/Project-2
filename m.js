// Willekeurige transacties genereren
function generateRandomTransactions() {
    const transactions = [];
    const types = ['inkomend', 'uitgaand'];

    for (let year = 2020; year <= 2025; year++) {
        const numTransactions = Math.floor(Math.random() * 4) + 5; // 5 tot 8 transacties per jaar

        for (let i = 0; i < numTransactions; i++) {
            const randomDate = new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
            const randomType = types[Math.floor(Math.random() * types.length)];
            const randomAmount = Math.floor(Math.random() * (10000 - 300 + 1)) + 300;

            transactions.push({
                id: transactions.length + 1,
                type: randomType,
                datum: randomDate.toISOString().split('T')[0],
                bedrag: randomType === 'inkomend' ? randomAmount : -randomAmount,
            });
        }
    }

    return transactions;
}

const transactions = generateRandomTransactions();
const transactionTableBody = document.querySelector('#transaction-table tbody');
const emptyState = document.getElementById('empty-state');
const filterType = document.getElementById('filter-type');
const filterDate = document.getElementById('filter-date');

// Transacties weergeven
function renderTransactions(filteredTransactions) {
    transactionTableBody.innerHTML = '';

    if (filteredTransactions.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td class="transaction-type ${transaction.type === 'inkomend' ? 'transaction-income' : 'transaction-expense'}">
                ${transaction.type}
            </td>
            <td>${transaction.datum}</td>
            <td>€${Math.abs(transaction.bedrag).toFixed(2)}</td>
        `;
        transactionTableBody.appendChild(row);
    });
}

// Filters toepassen
function filterTransactions() {
    const type = filterType.value;
    const date = filterDate.value;

    let filteredTransactions = transactions;

    if (type !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === type);
    }

    if (date) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.datum === date);
    }

    renderTransactions(filteredTransactions);
}

filterType.addEventListener('change', filterTransactions);
filterDate.addEventListener('input', filterTransactions);

// Alle transacties tonen bij start
renderTransactions(transactions);
