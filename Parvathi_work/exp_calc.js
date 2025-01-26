var autoEmail = require("./HelloNode/email");
const userTransactions = +10;
const totalTransactions = 50;
const totalUsers = 10;

//equal distibution
function calculateAmount (userTransactions, totalTransactions, totalUsers){
    const toPay = userTransactions - totalTransactions/totalUsers; 

    if (toPay < 0){
        console.log("You owe", toPay);
    }
    else if (toPay > 0){
        console.log("You are owed", toPay);
    }
    else {
        console.log("Everything is perfect");
    }
}
calculateAmount(userTransactions, totalTransactions, totalUsers);
