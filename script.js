'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////rot
//Array methods
//01.Array.prototype.slice
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nums2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const vowels = ['a', 'b', 'c', 'd', 'e'];
//does not mutate the origin array it create a new array
const copyNumsSliced = nums.slice(1); //copies the array from index 1 to the end
const copyNums = nums.slice(); //copies the whole array
const copyNumsSlicedSrtToEndIdx = nums.slice(1, 5); //copies the array from idx 1 to 4
const copyNumsSlicedFromEnd = nums.slice(-2); //copies the 2 FROM THE END

console.log(copyNums);
console.log(copyNumsSliced);
console.log(copyNumsSlicedSrtToEndIdx);
console.log(copyNumsSlicedFromEnd); //[9, 10]

//2. Using Array.prototype.splice(startIdx, deleteCouny);
//Mutates the orginal array

// const spliced = vowels.splice(1);
//console.log(spliced); //Fro index 1 get three element

//3 Array.prototype.concat

console.log(nums);
const romanNUmerals = nums.concat(vowels);
console.log(romanNUmerals);

//4 Uusing Array.prototype.join

const joinedNums = nums.join('-');
console.log(joinedNums); //1-2-3-4-5-6-7-8-9-10

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Using forEach with ARRAYS

movements.forEach((mov, idx, arr) => {
  if (mov > 0) {
    console.log(
      `You deposited Ksh ${mov} into your bank account as the ${
        idx + 1
      } movement.`
    );
  } else {
    console.log(
      `You withdrew Ksh ${Math.abs(mov)} from your bank account the ${
        idx + 1
      } movement.`
    );
  }
});

//Using forEach with Maps and Sets

const eastAfricanCurrencies = new Map([
  ['KSH', 'Kenyan Shillings'],
  [ 'USH', 'Ugandan Shillings' ],
  ['TSH', 'Tanzanian Shillings']
]);


console.log( eastAfricanCurrencies );
eastAfricanCurrencies.forEach( ( key, value, map ) => {
  console.log( `${ value }: ${key}` );
  // console.log(map);
} );


const uniqueCurrencies = new Set( ['KSH', 'TSH', 'USH', 'RSH', 'KSH', 'TSH']);
console.log( uniqueCurrencies );

uniqueCurrencies.forEach( ( value, _, set ) => {
  console.log(`${value}: ${value}`);
})