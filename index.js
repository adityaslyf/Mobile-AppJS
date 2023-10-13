import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  push,
  onValue,
  ref,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-bcbc1-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingList = document.getElementById("items");

/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.*/
addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);
  empty();
  renderItems(inputValue);
  console.log(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {
  let data = snapshot.val()
  if (data !=null){
  let ArrayBook = Object.entries(snapshot.val());
  empty();
  for (let i = 0; i < ArrayBook.length; i++) {
    let currentElement = ArrayBook[i];
    if (currentElement !== null) {
    let CurrentItemID = currentElement[0];
    let CurrentItemValue = currentElement[1];
    renderItems(currentElement)
  }
  }
}
});

function empty() {
  inputFieldEl.value = "";
}

function renderItems(item) {
  // shoppingList.innerHTML += `<li>${itemValue}</li>`;

  let itemId = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function(){
console.log(itemId)
let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
remove(exactLocationOfItemInDB)
newEl.remove()

  })
  shoppingList.append(newEl);
}
    // deleteButtonLi(currentElement)
// my doubt in the above code was that if i pass and put itemValue or inpuTValue bith works the same in the li and and as a parameter so in js it does not mean to that the parameter needs to be same as that of variable ex- below code will also do the same
// function renderItems(inputValue){
//   shoppingList.innerHTML += `<li>${inputValue}</li>`;
// }

// function deleteButtonLi(deleteLi) {
//   shoppingList.innerHTML = "";
// }

