////////////////////////--- Online Banking App ---//////////////////////////////////////

"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////////////////////////////////////////////////////////////////////////////
// Data
const accountA = {
  owner: "Derick Simiyu",
  movements: [2000, 4500, -4000, 30000, -6500, -1300, 700, 13000],
  interestRate: 1.2, // %
  pin: 1111,
};

const accountB = {
  owner: "Cynthia Kusimba",
  movements: [50000, 34000, -1500, -7900, -32100, -10000, 85000, -300],
  interestRate: 1.5,
  pin: 2222,
};

const accountC = {
  owner: "Brendan Blaise Makuto",
  movements: [2000, -2000, 3400, -3000, -200, 500, 4000, -4600],
  interestRate: 0.7,
  pin: 3333,
};

const accountD = {
  owner: "Bernice Kimberly",
  movements: [4300, 10000, 7000, 500, 900],
  interestRate: 1,
  pin: 4444,
};

const accNames = [accountA, accountB, accountC, accountD];

//Display Movements Account Function//

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  // .textContent = 0;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      1 + i
    } ${type}</div>
            <div class="movements__value">Kshs. ${mov}</div>
          </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Computing User Account Balance Function//

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  // acc.balance = balance;
  labelBalance.textContent = `Kshs. ${acc.balance}`;
};

// Computing Summary for Logged-in User Transactions//

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `Kshs. ${incomes}`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `Kshs. ${Math.abs(outcomes)}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `Kshs. ${Math.abs(interest)}`;
};

//Computing Username Function//

const createUserNames = function (accUsers) {
  accUsers.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((init) => init[0])
      .join("");
  });
  // return accUsers;
};

createUserNames(accNames);

// Update UI Function //

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event Handlers //

console.log("---/// Event Handlers ///---");

// Logging into Current Account Function Handler//

let currentAccount;

btnLogin.addEventListener("click", (e) => {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accNames.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //currentAccount && currentAccount.pin === Number(inputLoginPin.value)
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// Transfer Money Function Handler //

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accNames.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //console.log("Transfer valid");
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

/* Request Loan Function Handler: 
    Condition to grant loan is that at one deposit should have 10% of the requested amount.
  */

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

/* Close Account Function Handler */

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  //console.log("Delete");

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accNames.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accNames.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

/* Sorting Function Handler */

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
