'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'John Ndegwa',
  movements: [ 200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300 ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2022-01-07T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Jessica Mpepesi',
  movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const accounts = [ account1, account2 ];

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


//Getting the date and time to show, as the current date and time;

//Format movemnets date function
const formatMovementsDate = ( date, locale ) => {
  const calcDayPassed = ( date1, date2 ) => {
    const daysPassed = Math.round( Math.abs( date2 - date1 ) / ( 24 * 60 * 60 * 1000 ) );
    return daysPassed;
  };
  //set the number of days passed
  const daysPassed = calcDayPassed( date, new Date() );
  //check the days passed
  if ( daysPassed === 0 ) return 'Today';
  if ( daysPassed === 1 ) return 'Yesterday';
  if ( daysPassed <= 7 ) return `${ daysPassed } days ago`;

  return new Intl.DateTimeFormat( locale ).format( date );
};


//iMPLEMENT THE FUNCTION TO format the currencies
const formatCurrencies = ( value, locale, currency ) => {
  return new Intl.NumberFormat( locale,
    {
      style: 'currency',
      currency: currency
    } ).format( value );
};

//TESTING THE FUNCTION
// console.log(formatCurrencies(200000, 'en-US', 'KSH'));

/**
 * 
 Implement the startLogOutTimer function
 */


/**Deleted all the projects before in the script for array methods */

//1. Displaying the movements inside the movements Conatiner

const displayMovements = ( accountToDisplayMovements, sorted = false ) => {
  //reset the containerMovements
  containerMovements.innerHTML = '';

  //store the movements in a variable

  //sort the movements
  let movs = sorted ? accountToDisplayMovements?.movements.slice().sort( ( a, b ) => a - b ) : accountToDisplayMovements.movements;

  //show the movs sorted or unsorrted
  // console.log( movs );

  movs.forEach( ( mov, idx ) => {
    // console.log( mov, idx );
    //set the movement type to depoit or withdrawal
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    //set the date 
    let dateOfMovement = new Date( accountToDisplayMovements.movementsDates[ idx ] );
    // console.log( dateOfMovement );
    // DELTE DATE
    const formattedDate = formatMovementsDate( dateOfMovement, accountToDisplayMovements.locale );

    //Format the movement value is formatCurrencies function
    let formattedMov = formatCurrencies( mov, accountToDisplayMovements.locale, accountToDisplayMovements.currency );
    //create the movemet row
    const movementRowHTML = `
      <div class="movements__row">
            <div class="movements__type movements__type--${ movType }">${ idx + 1 } ${ movType }</div>
          <div class="movements__date">${ formattedDate }</div> 
            <div class="movements__value">${ formattedMov }</div>
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
  labelBalance.innerText = `${ formatCurrencies( balanceToDisplay, accToDisplayBalance.locale, accToDisplayBalance.currency ) }`;
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
  labelSumIn.innerText = `${ formatCurrencies( totalDeposits, accountToDisplay.locale, accountToDisplay.currency ) }`;
  labelSumOut.innerText = `${ formatCurrencies( totalWithdrawals, accountToDisplay.locale, accountToDisplay.currency ) }`;
  labelSumInterest.innerText = `${ formatCurrencies( totalInterestEarned, accountToDisplay.locale, accountToDisplay.currency ) }`;
};





//creating a user name initials from the name
//using the map method
const createUserName = ( accs ) => {
  //loop over each of the account and add the userName property to the account, in this case the four account, userName as initials of the acc.Owner
  accs.forEach( ( acc ) => {
    //adding the userName prop to each account
    acc.userName = acc.owner.toLocaleLowerCase().split( ' ' ).map( name => name[ 0 ] ).join( '' );
    // console.log(acc);
  } );
};

//pass in the accounts array as the argument
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
// //Fake the Login ***********************************************
accountLoggedIn = account1;
updateUI( accountLoggedIn );
containerApp.style.opacity = 100;



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


    //display the date
    //An option object for the DateTimeFormat(locale, optionsObject)
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    };

    //Get the current time
    const timeNow = new Date();
    //update the date
    labelDate.innerText = new Intl.DateTimeFormat( navigator.language, options ).format( timeNow );

    //Update the UI for the account Logged In
    updateUI( accountLoggedIn );


    //do not need them for now since the inputs are hidden
    //Clear the input the fields
    inputLoginPin.value = inputLoginUsername.value = '';
    //clear the focus
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
  //clear the input

  setTimeout( () => {
    //get the amount of loan requested and floor it
    const loanRequestAmount = Math.floor( inputLoanAmount.value );
    //check if the any of the deposits is greater than 10%
    const amountRequestedGreaterThan10Percent = accountLoggedIn.movements.filter( mov => mov > 0 ).some( mov => mov > loanRequestAmount * 0.1 );

    // console.log(amountRequestedGreaterThan10Percent);

    //check if the details for the loan are correct
    if ( loanRequestAmount && accountLoggedIn && amountRequestedGreaterThan10Percent ) {
      //push the amount of loan into the requested amount
      accountLoggedIn.movements.push( loanRequestAmount );
      // console.log( accountLoggedIn.movements );
      //push date to the movements
      accountLoggedIn.movementsDates.push( new Date().toISOString() );

      //update the UI after pushing the loan as a deposit
      updateUI( accountLoggedIn );
      // clear the input
      inputLoanAmount.value = '';
    }
  }, 2500 );

} );

//implementing the transfer
btnTransfer.addEventListener( 'click', e => {
  //stop the default submission
  e.preventDefault();
  setTimeout( () => {
    //get the account to transfer to
    const amountToTransfer = Math.floor( inputTransferAmount.value );
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
      //push the date
      accountLoggedIn.movementsDates.push( new Date().toISOString() );

      // console.log( accountLoggedIn.movements );
      //add a positive movement to the receiving account
      accToTransferTo.movements.push( amountToTransfer );
      // console.log(accToTransferTo.movements);
      //add the transfer to 
      accToTransferTo.movementsDates.push( new Date().toISOString() );

      //update the User Interface
      updateUI( accountLoggedIn );

      //clear the inputs after transfer
      inputTransferAmount.value = inputTransferTo.value = '';

    } else {
      console.log( 'The transaction was not executed' );
    }
  }, 3000 );

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