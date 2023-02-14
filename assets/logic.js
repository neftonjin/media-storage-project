// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "a8df3f5d09mshb31b08921c76d7ap1e5d4bjsn093ba4c08265",
// 		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });


//Calling the modal component
  $(document).ready(function() {
    $("#submit_answer").on("click", function() {
      $("#modal").modal();
    });
  });