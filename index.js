// Challenge: Import 'initializeApp' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// Challenge: Import 'getDatabase' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  push,
  onValue,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-bcbc1-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

onValue(shoppingListInDB, function (snapshot) {
  let ArrayBook = Object.values(snapshot.val());
  for (let i = 0; i < ArrayBook.length; i++) {
    console.log(ArrayBook[i]);
  }

  console.log(ArrayBook);
});

/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.*/

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingList = document.getElementById("items");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  // inputFieldEl.value = "";
  empty();

  renderItems(inputValue);

  console.log(inputValue);
});

function empty() {
  inputFieldEl.value = "";
}

function renderItems(itemValue) {
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
}

// my doubt in the above code was that if i pass and put itemValue or inpuTValue bith works the same in the li and and as a parameter so in js it does not mean to that the parameter needs to be same as that of variable ex- below code will also do the same
// function renderItems(inputValue){
//   shoppingList.innerHTML += `<li>${inputValue}</li>`;
// }

function deleteButtonLi(deleteLi) {
  shoppingList.innerHTML = "";
}
