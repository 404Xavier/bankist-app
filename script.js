'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
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

const displayMovements = ( movements ) => {
  //reset the containerMovements
  containerMovements.innerHTML = '';
  movements.forEach( ( mov, idx ) => {
    // console.log( mov, idx );
    //set the movement type to depoit or withdrawal
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    //create the movemet ro
    const movementRowHTML = `
      <div class="movements__row">
            <div class="movements__type movements__type--${ movType }">${ idx + 1 } ${ movType }</div>
            <div class="movements__value">${ Math.abs( mov ) }</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML( "afterbegin", movementRowHTML );
  } );
};

//Use the function on the first account
displayMovements( account2.movements );

//Create a function to calculate and display the results to the dom
const calcDisplayBalance = ( acc ) => {
  //calculate the balance remain in the account
  const balanceToDisplay = acc.reduce( ( acc, curr ) => acc + curr );

  //render the balance to the DOM
  labelBalance.innerText = `${ balanceToDisplay } EUR€`;
};

//call the function using account1 movements
calcDisplayBalance( account2.movements );


//Calculating the value to dsiplay, totalwithdrawals, totalDeposits, and the interest earned on the deposit
//chaining arrayHelper methods, which do not mutate the original array

const calcDisplaySummary = ( movements ) => {
  const totalDeposits = movements.filter( mov => mov > 0 )
    .map( mov => mov )
    .reduce( ( accum, currMov ) => accum + currMov );
  
    // console.log( totalDeposits );
  //calculate the totalWithdrawals
  const totalWithdrawals = movements.filter( mov => mov < 0 )
    .map( mov => mov )
    .reduce( ( accum, currMov ) => accum + currMov );
  // console.log(totalWithdrawals);
  
  //calculate the interest earned from the deposit, 1.2% for every depodit
  const totalInterestEarned = movements.filter( mov => mov > 0 )
    .map( mov => (mov * 1.2) / 100 )
    .filter( interestEarned => interestEarned >= 1 )
    .map( interest => interest )
    .reduce( ( accum, currInterest ) => accum + currInterest );
  // console.log( totalInterestEarned );
  
  //add the values to the DOM
  labelSumIn.innerText = `${ totalDeposits }€`;
  labelSumOut.innerText = `${ Math.abs(totalWithdrawals) }€`;
  labelSumInterest.innerText = `${ totalInterestEarned }€`;

};

//call the function with account 1 movemnets
calcDisplaySummary( account1.movements );



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






