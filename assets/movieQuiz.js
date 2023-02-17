
let movieTitles = ["Fight club", "Kill bill", "Trainspotting", "Forrest Gump", "Inglorious basterds", "Back to the future", "Ghostbusters", "Inception", "Pulp fiction", "Taxi driver", "The Godfather", "Eternal sunshine of the spotless mind", "The Shining", "Alien", "Pan's Labyrinth", "Indiana Jones and the Raiders of the Lost Ark", "Scarface"];
// let usedMovieTitles = [];
let movieTitle = "";
let queryURL = "";
let score = 0;
const scoreEl = $('#score');
let guesses = 0;
let lives = 2;
let inputString="";
// Function to select a random movie title from an array
function selectRandomMovieTitle(movieTitles) {
    let randomIndex = Math.floor(Math.random() * movieTitles.length);
    return movieTitles[randomIndex];
  }

// Function to generate a new movie title and make a new API call
function generateNewQuestion() {
    // Choose a random movie title from the array
    movieTitle = selectRandomMovieTitle(movieTitles);
    queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

    // Make the API call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // console.log(response.Actors);
        let clueTitle = $('<h3>').text('Clue');
        let actorsClueEl = $('<div>').text(response.Actors).addClass('box');
        $('#clue-box').append(clueTitle, actorsClueEl);
    });
}

// $(window).on("load",  function () {
// Call the function to generate the first question
 // displaying local storage values on the screen
generateNewQuestion();
const currentMovie = movieTitle; // store the current movie title in a variable
// console.log(currentMovie);
// });

// Event listener for the submit button
$('#submit-movie').on("submit", function (event) {
    event.preventDefault();
    // increment the number of guesses
    let inputMovie = $('#input-movie').val();
    let modalP = $('<p>');

    let modalCorrectMovieBtn = $('<button>');
    modalCorrectMovieBtn.attr({
        type: "button", 
        class: "btn-btn-primary", 
        id: "correctMovie"});
    let movieModalBody = $('.movie-modal-body');
    // movieModalBody.append(modalP, modalCorrectMovieBtn);
    movieModalBody.append(modalP);
    let movieAnswerModalToggle = $('#movieAnswerModal').modal('toggle');
    
    // If/else statement to check whether the user got the movie right
    if (inputMovie.toLowerCase() === movieTitle.toLowerCase()) {
        guesses++;
        movieAnswerModalToggle;
        $('#modalResult').text('Correct!');
        modalP.text('The film is...');
        // modalCorrectMovieBtn.text(movieTitle);

        // console.log(`you got it right, it is ${movieTitle}`);
        // add an image of the correct movie
        queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

        // Make the API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let imgSrc = response.Poster;
            // console.log(imgSrc);
            // console.log(typeof imgSrc);
            // Create the image element
            let imgElement = $("<img>").attr({src: imgSrc, id: "modal-image"});
            $(".movie-modal-body").append(imgElement);
        })

        score += 10; // add 10 points to the score
        $('#score').text(`Score: ${score}`); // display the updated score

    } else {
        movieAnswerModalToggle;
        $('#modalResult').text("That's wrong, sorry!");
        console.log(`No, it is not ${inputMovie}`);
        lives -=1;
        $("#lives").text(lives);
    }
    inputMovie = $('#input-movie').val('');
})

// Event listener for the next question and close buttons
$('.modal-footer').on('click', function() {
    // Remove the previous movie clue from the screen
    $('#clue-box').empty();
    $('#movieAnswerModal').modal('hide');
    inputMovie = $('#input-movie').val('');
     redirectToFinalPage(lives);
    // check if the user has made 5 guesses
    if (guesses >= 1) {
        // display a message or take any action you want
        // alert("The quiz is done!");
        
        redirectToHighScore(guesses);
        
        // window.location.href='highScores.html'; ////////////////////////////////////////////////////////////////////////////////////////////////
       
    } else { 
    // Generate a new question
    $('.movie-modal-body').empty();
    generateNewQuestion();
    }
});

$('#show_movie_button').on('click', function () {
    queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

    // Make the API call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let hintTitle = $('<h3>').text('Hint');
        let plotClueEl = $('<div>').text(response.Plot).addClass('box');
        $('#clue-box').append(hintTitle, plotClueEl);
        $('#show_movie_button').hide();
    })
    score -= 5; // subtract 5 points to the score
    $('#score').text(`Score: ${score}`); // display the updated score
});


function redirectToFinalPage(life){
    if(life === 0){
        window.location.href = 'outOfLives.html';
    }
}
    
function redirectToHighScore(guessNr){
  
    if (guessNr === 1) {
        // Show the modal
        $('#my-modal').modal({
          backdrop: 'static', // Prevents closing the modal when clicking outside of it
          keyboard: false // Prevents closing the modal when pressing the Esc key
        });
      
        // When the user clicks the save button, save the input value and close the modal
        $('#save-button').click(function(event) {
           inputString = $('#input-string').val(); // Get the value of the input field
           console.log('Input value:', inputString); // Log the value to the console
           historyStorage(inputString);
           setScore(score);
           console.log("i need to hide ")
           window.location.href='highScores.html'
           $('#my-modal').modal('hide'); // Hide the modal
        });
      }
}

showAllScores(movieHightScoresId);