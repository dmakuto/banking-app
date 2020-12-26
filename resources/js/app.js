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
  movementsDates: [
    "2018-08-01T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-12-20T10:17:24.185Z",
    "2020-12-21T14:11:59.604Z",
    "2020-12-22T17:01:17.194Z",
    "2020-12-23T23:36:17.929Z",
    "2020-12-24T10:51:36.790Z",
  ],
  currency: "KES",
  locale: "en-GB",
};

const accountB = {
  owner: "Cynthia Kusimba",
  movements: [50000, 34000, -1500, -7900, -32100, -10000, 85000, -300],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-12-21T14:43:26.374Z",
    "2020-12-22T18:49:59.371Z",
    "2020-12-23T12:01:20.894Z",
  ],
  currency: "KES",
  locale: "en-US",
};

const accountC = {
  owner: "Brendan Blaise Makuto",
  movements: [2000, -2000, 3400, -3000, -200, 500, 4000, -4600],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-12-21T14:43:26.374Z",
    "2020-12-22T18:49:59.371Z",
    "2020-12-23T12:01:20.894Z",
  ],
  currency: "KES",
  locale: "en-US",
};

const accountD = {
  owner: "Bernice Kimberly",
  movements: [4300, 10000, 7000, 500, 900],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-12-21T14:43:26.374Z",
    "2020-12-22T18:49:59.371Z",
    "2020-12-23T12:01:20.894Z",
  ],
  currency: "KES",
  locale: "en-US",
};

const accNames = [accountA, accountB, accountC, accountD];

/////////////////////////////////////////////////////////////////////////////////
///---Functions---///

// Display Date Function

const formatMovementDate = function (date, locale) {
  //const date = new Date();
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(`daysPassed: ${daysPassed}`);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  //return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// Currency Formatter Function //

const formatCur = function (value, locale, currency) {
  const optionsMov = {
    style: "currency",
    currency: currency,
  };
  return new Intl.NumberFormat(locale, optionsMov).format(value);
};

//Display Movements Account Function//

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  // .textContent = 0;

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    /*
    const optionsMov = {
      style: "currency",
      currency: acc.currency,
    };
    const formattedMov = new Intl.NumberFormat(acc.locale, optionsMov).format(
      mov
    );
*/
    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      1 + i
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
          </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Computing User Account Balance Function//

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  // acc.balance = balance;
  const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);
  //labelBalance.textContent = `Kshs. ${acc.balance.toFixed(2)}`;
  labelBalance.textContent = formattedMov;
};

// Computing Summary for Logged-in User Transactions FUnction//

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const formattedIn = formatCur(incomes, acc.locale, acc.currency);
  //labelSumIn.textContent = `Kshs. ${incomes.toFixed(2)}`;
  labelSumIn.textContent = formattedIn;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  //labelSumOut.textContent = `Kshs. ${Math.abs(outcomes).toFixed(2)}`;
  const formattedOut = formatCur(Math.abs(outcomes), acc.locale, acc.currency);
  labelSumOut.textContent = formattedOut;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  //labelSumInterest.textContent = `Kshs. ${Math.abs(interest).toFixed(2)}`;
  const formattedInt = formatCur(Math.abs(interest), acc.locale, acc.currency);
  labelSumInterest.textContent = formattedInt;
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Timer Function //

const startLogoutTimer = function () {
  // Set time to 5 minutes

  let time = 120;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min} : ${sec}`;

    // When 0 seconds, stop timer and log out user

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }

    // Decrease 1s
    time--;
  };

  tick();
  // Call the timer every second

  const timer = setInterval(tick, 1000);

  return timer;
};

/////////////////////////////////////////////////////////////////////////////////
///---Event Handlers---///

console.log("---/// Event Handlers ///---");

// Logging into Current Account Function Handler//

let currentAccount, timer;

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

    // Experimenting API

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);
    //--- Time and Date ---//

    /*
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour} : ${min}`;
*/
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

/* Request Loan Function Handler: 
    Condition to grant loan is that at one deposit should have 10% of the requested amount.
  */

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
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
