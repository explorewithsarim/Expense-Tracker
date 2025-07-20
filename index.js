
const notyf = new Notyf();

function togglePassword() {
  const password = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");
  if (password.type === "password") {
    password.type = "text";
    icon.textContent = "🙈";
  } else {
    password.type = "password";
    icon.textContent = "👁️";
  }
}


function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    notyf.success(`Welcome, ${user.name || "User"}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    notyf.error("Invalid email or password");
  }
}


function handleSignup(e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    notyf.error("Please fill all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.some(user => user.email === email);

  if (alreadyExists) {
    notyf.error("Email already registered.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  notyf.success("Account created!");
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1500);
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  notyf.success("Logged out successfully!");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", loginUser);

  const signupForm = document.getElementById("signup-form");
  if (signupForm) signupForm.addEventListener("submit", handleSignup);
});
git remote set-url origin https://github.com/explorewithsarim/Expense-Tracker.git
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
        const myElement = document.createElement('div');
        myElement.className = 'mytransaction';
        myElement.innerHTML = `<div>
        <strong>${item.name}</strong><br><small>${item.date}</small>
      </div>
      <div class="${item.type === 'income' ? 'mygreen' : 'myred'}">
        Rs.${parseFloat(item.amount).toLocaleString()}
      </div>`;
        myTransactionList.appendChild(myElement);

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