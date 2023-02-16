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


// let randomPoints= 10;
// let movieHightScoresId = document.getElementById("movieHighScores");//changed with song container
let songHightScoresId = document.getElementById("songHighScores");//changed with song container

  
// Setting the score 
function setScore(points) {
    let totalPoints = points;
    let storedInitialsArray = JSON.parse(localStorage.getItem("scArray")) || [];
    storedInitialsArray.push(totalPoints);
    localStorage.setItem("scArray", JSON.stringify(storedInitialsArray));
    console.log(storedInitialsArray);
  }


//Showing the score on the list
function showAllScores (id){
  let inputHistory = JSON.parse(localStorage.getItem("inputHistory"));
  let scArray = JSON.parse(localStorage.getItem("scArray"));
  if(inputHistory !== null && scArray !== null && inputHistory.length !== undefined) {
     for(let i = 0; i < inputHistory.length; i++) { 
        let li = document.createElement("li"); 
        li.textContent = inputHistory[i] + " " + scArray[i];
        id.appendChild(li);
     }
  }
}


// setScore(randomPoints);
// showAllScores(movieHightScoresId);

//This function is clearing the localstorage API
function clear (){
 localStorage.clear(); 
}    

$("#clear").on("click", clear);