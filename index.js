/************************ PROMISES **************************/
/*********************************************************/
// Promises is used to handle asynchronous opertaions.

/**E-commerce App example**/

//Array which contain all the cart values
const cart = ["Pant","Shirt","Shoes"];

//API to create a order which takes cart as the parameter and returns order details/orderID
createOrder(cart);

//API to procced to payment once the order has been created. This takes the orderId as the parameter
proceedToPayment(orderId);

//Both are ASYNC functions and are dependednt on each other (createOrder & proceedToPayment)
//We can execute or run "proceedToPayment" only after createOrder has been completed
//We wrap proceedToPayment inside the createOrder as a callback function

createOrder(cart, function (){
    proceedToPayment(orderId);
});
//The above has an issue of "INVESRION OF CONTROL"

//Question - How do we resolve this issue?
//Ans      - Using Promises

//What is a Promise?
// Def: PROMISE IS AN OBJECT REPRESENTING THE EVENTUAL COMPLETION OR FAILURE OF AN ASYNCRONOUS OPERATION.
// IN OTHER WORDS, PROMISE IS A PLACEHOLDER FOR A CERTAIN PERIOD OF TIME UNTIL WE GET THE VALUE FROM 
// THE ASYNCHRONOUS OPERATION.

//Example without Promise:
createOrder(cart, function (){
    proceedToPayment(orderId);
});

const promise = createOrder(cart);
    proceedToPayment(orderId);

//Question - How will we know the response is ready?
//Ans - Now we will attach the callback function to the promise object using "then" to get triggered
//      automatically when the result is ready.

//Example with Promise:
//Array which contain all the cart values
const cart1 = ["Pant","Shirt","Shoes"];

const promiseRef = createOrder(cart1);
//This promise has access to then
//{data: undefined}
//Initially the data is undefined
//After sometime when the code execution has finished, the promiseRef has the data then automatically
//the line is trigerred.

promiseRef.then(function(){
    proceedToPayment(orderId);
});

/**
Question - How is this better than callback approach?
Answer: 1. In the earlier solution, we use to call the function and blindly trust the function to execute
           the callback.
        2. In promises, we will attach the callback function to the promise object.
        3. Here we will have full control of the program as the createOrder API will just do its job and
           fill the promise object with orderId.
        4. As soons as the data is filled out, it will call our function.
        5. Promises guarantees us that it will call the callback function whenever the data is inside the
           promise object.
**/

//Promise object has three things :
// 1. protoType
// 2. promiseState: Will tell us what is the state of promise (Inital state is "pending")
// 3. promiseResult: Stores the data returned

// Example using fetch
// We will be calling public github api to fetch data
const API_URL = "https://api.github.com/users/mohit9222"
const user = fetch(API_URL);

user.then(function (data){
    console.log(data);
})

//Three states in a promise object:
// -> pending
// -> fullfilled
// -> rejected

// Promise objects are Immutable.
// Once the promise is fullfilled and we have the data, we can make use of the data anywhere without 
// worrying if someone can mutate the data.

// ?? How do we solve the issue for "CALLBACK HELL/ PYRADMID OF DOOM"
// Callback Hell Example
createOrder(cart, function (orderId) {
    proceedToPayment(orderId, function (paymentInf) {
      showOrderSummary(paymentInf, function (balance) {
        updateWalletBalance(balance);
      });
    });
});

// ==> PROMISE CHAINING FIXES this issue

//Example of e-commerce cart
const cart2 = ["Pant","Shirt","Shoes"];
createOrder(cart2)
    .then(function (orderId){
      return proccedToPayment(orderId);
    })
    .then(function (paymentInfo){
      return orderSummary(paymentInfo);
    })
    .then(function (balance){
      return updateWallet(balance);
    });
//⚠️ Hint - Most of the developer forget to return the promise in the Callback function 
// (idea is to return data from one which becomes data of other)

// We also use Arrow functions for this:
createOrder(cart2)
    .then((orderId) => proccedToPayment(orderId))
    .then((paymentInfo) => orderSummary(paymentInfo))
    .then((balance) => updateWallet(balance));