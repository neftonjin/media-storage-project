//feature/movieQuizContinued
let movieTitles = ["Fight club", "Kill bill", "Trainspotting", "Forrest Gump", "Inglorious basterds", "Back to the future", "Ghostbusters", "Inception", "Pulp fiction", "Taxi driver", "The Godfather", "Eternal sunshine of the spotless mind", "The Shining", "Alien", "Pan's Labyrinth", "Indiana Jones and the Raiders of the Lost Ark", "Scarface"];
// let usedMovieTitles = [];
let movieTitle = "";
let queryURL = "";
let score = 0;
let lives = 2;
let questionNumber=3;

let movieHightScoresId =$("#movieHighScores");
console.log(" element is "+ movieHightScoresId);
const scoreEl = $('#score');



// Function to generate a new movie title and make a new API call
function generateNewQuestion() {
    // Choose a random movie title from the array
    movieTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

    // Make the API call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.Actors);
        let clueTitle = $('<h3>').text('Clue');
        let actorsClueEl = $('<div>').text(response.Actors).addClass('box');
        $('#clue-box').append(clueTitle, actorsClueEl);
    });
}

$(window).on("load",  function () {
    // Call the function to generate the first question
    generateNewQuestion();
    console.log("running theh")
    showAllScores(movieHightScoresId);
   
});

// Event listener for the submit button
$('#submit-movie').on("submit", function (event) {
    event.preventDefault();
    questionNumber --;
    if (lives === 0) {
        // Redirect to another page
        $('#score').text(`Score: ${score}`)
        setScore(score);
        $('#nameModal').modal('show');
      }
     else if (questionNumber===0) {
            $('#nameModal').modal('show');
            score += 10;
            $('#score').text(`Score: ${score}`)
            setScore(score);
     }
    else{
    let inputMovie = $('#input-movie').val();
    let modalP = $('<p>');
    let modalCorrectMovieBtn = $('<button>');
    modalCorrectMovieBtn.attr({
        type: "button", 
        class: "btn-btn-primary", 
        id: "correctMovie"});
    let movieModalBody = $('.movie-modal-body');
    movieModalBody.append(modalP, modalCorrectMovieBtn);
    let movieAnswerModalToggle = $('#movieAnswerModal').modal('toggle');

    // If/else statement to check whether the user got the movie right
    if (inputMovie.toLowerCase() === movieTitle.toLowerCase()) {
        movieAnswerModalToggle;
        $('#modalResult').text('Correct!');
        modalP.text('The film is...');
        modalCorrectMovieBtn.text(movieTitle);
        console.log(`you got it right, it is ${movieTitle}`);
        score += 10; // add 10 points to the score
        $('#score').text(`Score: ${score}`); // display the updated score
       
    } else {
        movieAnswerModalToggle;
        $('#modalResult').text("That's wrong, sorry!");
        console.log(`No, it is not ${inputMovie}`);
        lives -=1;
        $("#lives").text(lives);
        console.log(lives +" lives left")
    }
    inputMovie = $('#input-movie').val('');
   
}

})

$("#saveNameButton").on("click", function(event){
    let inputName = $("#nameInput").val();
    console.log(inputName);
    if(lives===0){
        historyStorage(inputName);
         window.location.href = "outOfLives.html";
    }else if(questionNumber===0){
        historyStorage(inputName);
        window.location.href = "highScores.html";

    }
   }) 


// Event listener for the next question button
$('#next-question').on('click', function() {
    // Remove the previous movie clue from the screen
    $('#clue-box').empty();
    $('#movieAnswerModal').modal('hide');
    // Generate a new question
    generateNewQuestion();
    $('.movie-modal-body').empty();
});


