let movieTitle = "500 days of summer"
const queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

$.ajax({
 url: queryURL,
 method: "GET"
}).then(function(response) {

 console.log(response);
})