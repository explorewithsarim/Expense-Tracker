let myType = 'expense';

let myBalance = document.getElementById('myBalance');
let myIncome = document.getElementById('myIncome');
let myExpense = document.getElementById('myExpense');
let myTransactionList = document.getElementById('myTransactionList');
let mySubmit = document.getElementById('mySubmit');
let myName = document.getElementById('myName');
let myAmount = document.getElementById('myAmount');
let myDate = document.getElementById('myDate');

let incomeBtn = document.getElementById('myincomeType');
let expenseBtn = document.getElementById('myexpenseType');


incomeBtn.addEventListener('click', () => {
    myType = 'income';
    incomeBtn.classList.add('active');
    expenseBtn.classList.remove('active');
});

expenseBtn.addEventListener('click', () => {
    myType = 'expense';
    expenseBtn.classList.add('active');
    incomeBtn.classList.remove('active');
});
document.addEventListener('click', function (event) {
    const isIncome = incomeBtn.contains(event.target);
    const isExpense = expenseBtn.contains(event.target);

    if (!isIncome && !isExpense) {
        incomeBtn.classList.remove('active');
        expenseBtn.classList.remove('active');
        myType = '';
    }
});


function getData() {
    return JSON.parse(localStorage.getItem('myTransactions') || '[]');
}

function saveData(data) {
    localStorage.setItem('myTransactions', JSON.stringify(data));
}

function updateUI() {
    const data = getData();
    let income = 0, expense = 0;
    myTransactionList.innerHTML = '';

    data.slice().reverse().forEach(item => {
        const el = document.createElement('div');
        el.className = 'mytransaction';
        el.innerHTML = `<div>
        <strong>${item.name}</strong><br><small>${item.date}</small>
      </div>
      <div class="${item.type === 'income' ? 'mygreen' : 'myred'}">
        Rs.${parseFloat(item.amount).toLocaleString()}
      </div>`;
        myTransactionList.appendChild(el);

        if (item.type === 'income') income += parseFloat(item.amount);
        else expense += parseFloat(item.amount);
    });

    myIncome.textContent = `+Rs.${income.toLocaleString()}`;
    myExpense.textContent = `-Rs.${expense.toLocaleString()}`;
    myBalance.textContent = `Rs.${(income - expense).toLocaleString()}`;
}

mySubmit.addEventListener('click', () => {
    if (!myType) {
        alert("Enter account either Income or Expense");
        return;
    }

    if (!myName.value || !myAmount.value || !myDate.value) {
        alert("Please fill out all fields.");
        return;
    }

    const data = getData();
    data.push({
        name: myName.value,
        amount: myAmount.value,
        date: myDate.value,
        type: myType
    });

    saveData(data);
    updateUI();

    myName.value = '';
    myAmount.value = '';
    myDate.value = '';
});


updateUI();