let movieTitles = ["Fight club", "Kill bill", "Trainspotting", "Forrest Gump", "Inglorious basterds", "Back to the future", "Ghostbusters", "Inception"]
let movieTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
const queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";
const lives = 10;
const points = 0;

$(window).on("load",  function () {
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

    console.log(response);
    
    console.log(response.Actors);
    let actorsClueEl = $('<div>').text(response.Actors).addClass('box');
    $('#clue-box').append(actorsClueEl);
    })}
);


$('#submit-movie').on("submit", function (event) {
    event.preventDefault();
    let inputMovie = $('#input-movie').val();
     
    if (inputMovie.toLowerCase() === movieTitle.toLowerCase()) {
        console.log(`you got it right, it is ${movieTitle}`);
        points += 10;
    } else {
        console.log(`No, it is not ${inputMovie}`);
        lives -=1;
    }
    inputMovie = $('#input-movie').val('');
})

