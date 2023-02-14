let inputArray;
//Saving the user input name
function historyStorage(inputValue) {
    let dataAsString = localStorage.getItem("inputHistory");

    if (dataAsString === null) {
        inputArray = [];
    } else {
        inputArray = JSON.parse(dataAsString);
    }
    inputArray.push(inputValue);
    dataAsString = JSON.stringify(inputArray);
    localStorage.setItem("inputHistory", dataAsString);
}


let randomPoints= 10;
let hightScoresId = document.getElementById("highScores");//changed with song container

  
// Setting the score 
function setScore(points) {
    let totalPoints = points;
    let storedInitialsArray = JSON.parse(localStorage.getItem("scArray")) || [];
    storedInitialsArray.push(totalPoints);
    localStorage.setItem("scArray", JSON.stringify(storedInitialsArray));
    console.log(storedInitialsArray);
  }


//Showing the score on the list
  function showAllScores (){
   if( JSON.parse(localStorage.getItem("inputHistory")).length !== undefined ){
    for( let i = 0; i < JSON.parse(localStorage.getItem("inputHistory")).length; i++) { 
        let li= document.createElement("li"); 
        console.log("testing loop ");
        li.textContent =  JSON.parse(localStorage.getItem("inputHistory"))[i] + " "  + JSON.parse(localStorage.getItem("scArray"))[i];
        hightScoresId.appendChild(li);
   }
   }
     return;
}  

inputValue="M.J";

historyStorage(inputValue);
setScore(randomPoints);
showAllScores();

//This function is clearing the localstorage API
function clear (){
 localStorage.clear(); 
}    

$("#clear").on("click", clear);