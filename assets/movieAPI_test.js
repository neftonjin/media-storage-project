let movieTitles = ["Fight club", "Kill bill", "Trainspotting", "Fast and furious", "Inglorious basterds", "Back to the future", "Ghostbusters", "Inception"]
let movieTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
const queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

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

