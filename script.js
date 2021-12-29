'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'John Ndegwa',
  movements: [ 200, 450, -400, 3000, -650, -130, 70, 1300 ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [ 200, -200, 340, -300, -20, 50, 400, -460 ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [ 430, 1000, 700, 50, 90 ],
  interestRate: 1,
  pin: 4444,
};

const accounts = [ account1, account2, account3, account4 ];

// Elements
const labelWelcome = document.querySelector( '.welcome' );
const labelDate = document.querySelector( '.date' );
const labelBalance = document.querySelector( '.balance__value' );
const labelSumIn = document.querySelector( '.summary__value--in' );
const labelSumOut = document.querySelector( '.summary__value--out' );
const labelSumInterest = document.querySelector( '.summary__value--interest' );
const labelTimer = document.querySelector( '.timer' );

const containerApp = document.querySelector( '.app' );
const containerMovements = document.querySelector( '.movements' );

const btnLogin = document.querySelector( '.login__btn' );
const btnTransfer = document.querySelector( '.form__btn--transfer' );
const btnLoan = document.querySelector( '.form__btn--loan' );
const btnClose = document.querySelector( '.form__btn--close' );
const btnSort = document.querySelector( '.btn--sort' );

const inputLoginUsername = document.querySelector( '.login__input--user' );
const inputLoginPin = document.querySelector( '.login__input--pin' );
const inputTransferTo = document.querySelector( '.form__input--to' );
const inputTransferAmount = document.querySelector( '.form__input--amount' );
const inputLoanAmount = document.querySelector( '.form__input--loan-amount' );
const inputCloseUsername = document.querySelector( '.form__input--user' );
const inputClosePin = document.querySelector( '.form__input--pin' );

/**Deleted all the projects before in the script for array methods */

//1. Displaying the movements inside the movements Conatiner

const displayMovements = ( accountToDisplayMovements, sorted = false ) => {
  //reset the containerMovements
  containerMovements.innerHTML = '';

  //store the movements in a variable

  //sort the movements
  let movs = sorted ? accountToDisplayMovements?.movements.slice().sort( ( a, b ) => a - b ) : accountToDisplayMovements.movements;

  //show the movs sorted or unsorrted
  console.log( movs );

  movs.forEach( ( mov, idx ) => {
    // console.log( mov, idx );
    //set the movement type to depoit or withdrawal
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    //create the movemet row
    const movementRowHTML = `
      <div class="movements__row">
            <div class="movements__type movements__type--${ movType }">${ idx } ${ movType }</div>
            <div class="movements__value">${ mov } EUR€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML( "afterbegin", movementRowHTML );
  } );
};



//Create a function to calculate and display the results to the dom
const calcDisplayBalance = ( accToDisplayBalance ) => {
  //calculate the balance remain in the account
  const balanceToDisplay = accToDisplayBalance.movements.reduce( ( acc, curr ) => acc + curr );
  //add the balance to the account
  accToDisplayBalance.balance = balanceToDisplay;
  //render the balance to the DOM
  labelBalance.innerText = `${ balanceToDisplay } EUR€`;
};



//Calculating the value to dsiplay, totalwithdrawals, totalDeposits, and the interest earned on the deposit
//chaining arrayHelper methods, which do not mutate the original array

const calcDisplaySummary = ( accountToDisplay ) => {
  const totalDeposits = accountToDisplay.movements.filter( mov => mov > 0 )
    .map( mov => mov )
    .reduce( ( accum, currMov ) => accum + currMov );

  // console.log( totalDeposits );
  //calculate the totalWithdrawals
  const totalWithdrawals = accountToDisplay.movements.filter( mov => mov < 0 )
    .map( mov => mov )
    .reduce( ( accum, currMov ) => accum + currMov );
  // console.log(totalWithdrawals);

  //calculate the interest earned from the deposit, 1.2% for every depodit
  const totalInterestEarned = accountToDisplay.movements.filter( mov => mov > 0 )
    .map( mov => ( mov * accountToDisplay.interestRate ) / 100 )
    .filter( interestEarned => interestEarned >= 1 )
    .map( interest => interest )
    .reduce( ( accum, currInterest ) => accum + currInterest );
  // console.log( totalInterestEarned );

  //add the values to the DOM
  labelSumIn.innerText = `${ totalDeposits }€`;
  labelSumOut.innerText = `${ Math.abs( totalWithdrawals ) }€`;
  labelSumInterest.innerText = `${ totalInterestEarned }€`;

};





//creating a user name initials from the name
//using the map method
const createUserName = ( accs ) => {
  //loop over each of the account and add the userName property to the account, in this case the four account, userName as initials of the acc.Owner
  accs.forEach( ( acc ) => {
    acc.userName = acc.owner.toLocaleLowerCase().split( ' ' ).map( name => name[ 0 ] ).join( '' );
    // console.log(acc);
  } );
};

//pass in the accounts as the argument
createUserName( accounts );


//creating user name initials
// const userName = account1.owner.toLocaleLowerCase().split(' ').map(name => name[0]).join('');
// console.log(userName);


//Display the UI 

const updateUI = ( acc ) => {
  //Display movement
  //Use the function on the account Logged In
  displayMovements( acc );
  //Display balance
  //call the function using the accountLoggedin
  calcDisplayBalance( acc );

  //Display the summary
  calcDisplaySummary( acc );
};



//Using the Array.prototype.find(callbackfn) to find a certain account in the arrays data
//1. using find to fing the account logged in into the account

const findAccountToLogin = ( accountsToFindFrom ) => {
  return accountsToFindFrom.find( acc => acc.userName === inputLoginUsername.value );
};

//set a temporaly variable, which keep track of the account
let accountLoggedIn;

//Adding the login btn addEventListener
btnLogin.addEventListener( 'click', e => {
  //Preventing the button before submission
  e.preventDefault();
  // console.log(e);
  //set the account logged in from function findaccont to login
  accountLoggedIn = findAccountToLogin( accounts );
  // console.log( accountLoggedIn );

  //check if the pin entered is correct
  if ( accountLoggedIn && accountLoggedIn?.pin === Number( inputLoginPin.value ) ) {
    // console.log( 'You have been logged in' );


    //Display the UI message
    labelWelcome.innerText = `Welcome, ${ accountLoggedIn.owner.split( ' ' )[ 0 ] }, Logged in`;
    //make the text bold
    labelWelcome.style.fontWeight = 'bolder';


    //Update the UI for the account Logged In
    updateUI( accountLoggedIn );


    //do not need them for now since the inputs are hidden
    // //Clear the input the fields
    inputLoginPin.value = inputLoginUsername.value = '';
    // //clear the focus
    inputLoginPin.blur();


    //bring back the opacity to display the results
    containerApp.style.opacity = 100;

    //change the text of the login Button to logout
    // btnLogin.innerText = 'Log Out';

    //hide the loginInputs
    // inputLoginPin.hidden = inputLoginUsername.hidden = true;
  }

} );

//Implementing the requestLOan
btnLoan.addEventListener( 'click', e => {
  e.preventDefault();

  const loanRequestAmount = Number( inputLoanAmount.value );
  //check if the any of the deposits is greater than 10%
  const amountRequestedGreaterThan10Percent = accountLoggedIn.movements.filter( mov => mov > 0 ).some( mov => mov > loanRequestAmount * 0.1 );

  // console.log(amountRequestedGreaterThan10Percent);

  //check if the details for the loan are correct
  if ( loanRequestAmount && accountLoggedIn && amountRequestedGreaterThan10Percent ) {
    //push the amount of loan into the requested amount
    accountLoggedIn.movements.push( loanRequestAmount );
    // console.log( accountLoggedIn.movements );

    //update the UI after pushing the loan as a deposit
    updateUI( accountLoggedIn );
  }

} );

//implementing the transfer
btnTransfer.addEventListener( 'click', e => {
  //stop the default submission
  e.preventDefault();

  //get the account to transfer to
  const amountToTransfer = Number( inputTransferAmount.value );
  const accToTransferTo = accounts.find( acc => acc.userName === inputTransferTo.value );

  // console.log( accToTransferTo );
  // console.log( amountToTransfer );

  //check if the amountToTransfer is greater than 0, less than the account's balance, the receiverAccount exists and the accountToTransferTo is not the account logged in
  if ( amountToTransfer > 0 &&
    accToTransferTo &&
    amountToTransfer <= accountLoggedIn.balance &&
    accToTransferTo?.userName !== accountLoggedIn.userName ) {
    //execute the transfert
    //add a negative movemnet to the currentAccount
    accountLoggedIn.movements.push( -amountToTransfer );

    // console.log( accountLoggedIn.movements );
    //add a positive movement to the receiving account
    accToTransferTo.movements.push( amountToTransfer );
    // console.log(accToTransferTo.movements);

    //update the User Interface
    updateUI( accountLoggedIn );

    //clear the inputs after transfer
    inputTransferAmount.value = inputTransferTo.value = '';

  } else {
    console.log( 'The transaction was not executed' );
  }
} );



//Delete the user from the account array after deletting the account

btnClose.addEventListener( 'click', e => {
  e.preventDefault();
  //get the account
  const userToDelete = inputCloseUsername.value;
  //get the pin
  const userPin = Number( inputClosePin.value );
  //get the account from the userName
  const accToDelete = accounts.filter( acc => acc.userName === userToDelete );

  console.log( accToDelete[ 0 ] );
  console.log( accountLoggedIn === accToDelete[ 0 ] );
  console.log( 'Dleted Account' );
  //CHeck the account details


  //check the the account credentials are correct
  if ( accToDelete[ 0 ] === accountLoggedIn && accToDelete[ 0 ].pin === userPin ) {
    // console.log( 'Account is the current to be deletd' );
    //get the index of  the account to delete
    const indexOfAccToDelete = accounts.findIndex( acc => acc.userName === accToDelete[ 0 ].userName );
    console.log( indexOfAccToDelete );

    //delete the current account and hide the UI
    accounts.splice( indexOfAccToDelete, 1 );
    // console.log( accounts );

    //hide the UI
    containerApp.style.opacity = 0;

  }
} );
//set the state for the sorted variable
let sorted = false;

///Implement the sort button
btnSort.addEventListener( 'click', e => {
  //stop the defualt button behavior
  e.preventDefault();

  displayMovements( accountLoggedIn, !sorted );
  //if true to false, if false to true
  //if true turned to flase and if false turnde to true
  sorted = !sorted;

} );

const acc1Movements = account1.movements;
//console.log( acc1Movements.sort() ); //[-130, -400, -650, 1300, 200, 3000, 450, 70 //default sorting as strings
//using sort
//sort ascenidng
// console.log( acc1Movements.sort( ( a, b ) => {
//   if ( a > b ) return 1;
//   if ( a < b ) return -1;
// } ) );
//
// console.log( acc1Movements.sort( ( a, b ) => {
//   if ( a > b ) return -1;
//   if ( a < b ) return 1;
// }));



//Creating and filling arrays

const arryOne = Array( 1, 2, 3, 4, 5, 6, 7 );
// console.log( arryOne ); //[1, 2, 3, 4, 5, 6, 7]/

const arrConstructor = new Array( 7 );
// console.log( arrConstructor ); //[empty × 7]

const arrFilledAfterConstruction = arrConstructor.fill( 1 );
// console.log( arrFilledAfterConstruction ); //[1, 1, 1, 1, 1, 1, 1]

arrFilledAfterConstruction.fill( 3, 2, 5 ); //[1,1, 3, 3, 3, 1, 1 ]
// console.log( arrFilledAfterConstruction );


//Using Arrayfrom

const arryTwo = Array.from( { length: 7 }, ( el, idx ) => {
  //currently element is in nto available
  // console.log(idx );
  return idx + 1;
} );

//console.log( arryTwo ); //[1, 2, 3, 4, 5, 6, 7]



const randomDiceRolls = Array.from( { length: 100 }, () => Math.floor( Math.random() * 6 ) + 1 );
//console.log( randomDiceRolls ); //[5, 3, 3, 1, 5, 3, 4, 4, 6, 5, 1, 5, 3, 6, 3, 5, 4, 2, 1, 4, 3, 6, 2, 2, 5, 1, 3, 3, 1, 1, 3, 2, 1, 2, 6, 4, 4, 2, 4, 5, 3, 4, 4, 2, 4, 1, 6, 3, 2, 4, 3, 1, 1, 2, 1, 3, 5, 1, 3, 2, 3, 3, 3, 5, 1, 6, 2, 5, 4, 4, 3, 3, 2, 6, 3, 1, 2, 6, 6, 5, 1, 1, 1, 3, 5, 3, 2, 1, 5, 4, 2, 6, 4, 2, 1, 5, 6, 1, 3, 6]


const numberOneToHundred = Array.from( { length: 100 }, ( _, idx ) => idx + 1 );
//console.log(numberOneToHundred); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]



//getting elements from the DOM
labelBalance.addEventListener( 'click', e => {

  const movementsValuesFromUI = Array.from( document.querySelectorAll( '.movements__value' ), el => Number( el.innerText.replace( 'EUR€', '' ) ) );
  // console.log(movementsValuesFromUI);
} );

/****
 * Coding Challenge of Arrays
 */

//1. Getting the Bank deposit sums from the bank

//get all the movemnets in the bank 
const allMovements = accounts.map( acc => acc.movements ).flat();
const allMovementsV2 = accounts.flatMap( acc => acc.movements );
console.log( allMovements ); //[200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
console.log( allMovementsV2 ); //[200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

//store all deposits in an array
const allDeposits = allMovements.filter( mov => mov > 0 );

//calculate the total value of the deposits
const totalAmountDeposited = allDeposits.reduce( ( sum, curr ) => sum + curr );
console.log( totalAmountDeposited ); //251180


//2. Get how many deposits have a value greater or equal to 1000
//using reduce
const depositGreaterThanThaoCount = allDeposits.filter( mov => mov >= 1000 ).length;
//using array.length
const depositGreaterThanThaoCountV2 = allDeposits.filter( mov => mov >= 1000 ).reduce( ( count, curr ) => ( curr >= 1000 ? count + 1 : count ), 0 );
//using reduce
console.log( depositGreaterThanThaoCount ); //6 //
console.log( depositGreaterThanThaoCountV2 ); //6 //




//Calculating the sum of deposits and withdrawals as an object using reduce {totalDeposits: 0, totalWithdrawals: 0}
const totalDepositsWithdrawals = allMovements.reduce( ( sums, curr ) => {

  //check if curr value is greater than 0 and add it to the totalDeposit and if less than 0 add it to totalWithdrawals
  // curr > 0 ? sums.totalDeposits += curr : sums.totalWithdrawals += curr;

  //an alternative by directly accessing the key values
  sums[ curr > 0 ? 'totalDeposits' : 'totalWithdrawals' ] += curr;
  //return sums value
  return sums;
}, { totalDeposits: 0, totalWithdrawals: 0 } );

console.log( totalDepositsWithdrawals ); //{totalDeposits: 25180, totalWithdrawals: -7340}








/***
 * 
 */


