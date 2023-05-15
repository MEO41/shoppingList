import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {// 
    databaseURL:"https://playground-f2cb0-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app) 
const shopListDB = ref(database, "objects")// referans noktasi 

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){// add-button id li butonun davranisi
    let inputValue = inputFieldEl.value
    if(inputValue != ""){
        push(shopListDB,inputValue)
        console.log(`${inputValue} add to database`) 
    
    
    clearInputFieldEl()
    }
}) 
onValue(shopListDB, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    clearShoppingListEl()

    for (let i = 0; i< itemsArray.length; i++){
        let currentItem = itemsArray[i]
    
        appendItemToShoppingListEl(currentItem)
    }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
})

function clearShoppingListEl(){
     shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item){
   // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")


    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database,`objects/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)

}
