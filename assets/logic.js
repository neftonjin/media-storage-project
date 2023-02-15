const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=tracks&type=multi&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
	  "X-RapidAPI-Key": "f52fefffa7msh4adaf3573b9c473p12a90djsn801350d39fda",
	  "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
  };
  
  // Define an array of songs and their corresponding artists
  const songs = [
	{ title: 'Bohemian Rhapsody', artist: 'Queen' },
	{ title: 'Like a Rolling Stone', artist: 'Bob Dylan' },
	{ title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
	{ title: 'Imagine', artist: 'John Lennon' },
	{ title: 'What\'s Going On', artist: 'Marvin Gaye' },
	{ title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
	{ title: 'Billie Jean', artist: 'Michael Jackson' },
	{ title: 'Purple Haze', artist: 'Jimi Hendrix' },
	{ title: 'I Will Always Love You', artist: 'Whitney Houston' },
	{ title: 'I Want to Hold Your Hand', artist: 'The Beatles' },
	{ title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
	{ title: 'Livin\' on a Prayer', artist: 'Bon Jovi' },
	{ title: 'Hotel California', artist: 'The Eagles' },
	{ title: 'Thriller', artist: 'Michael Jackson' },
	{ title: 'Every Breath You Take', artist: 'The Police' },
  ];
  
  let questionCounter = 0;
  let score = 0;
  
  // Function to start the quiz
  function startQuiz() {
	// Hide the boxes
	$('#box1').hide();
	$('#box2').hide();
  
	// Increment the question counter and update the HTML
	questionCounter++;
	$('#quiz-counter').text(`Question ${questionCounter} of 10`);
  
	// Choose a random song from the array
	const randomSong = songs[Math.floor(Math.random() * songs.length)];
  
	// Create an array of artist names, including the correct one
	const choices = [randomSong.artist];
	while (choices.length < 4) {
	  // Choose a random artist from the songs array
	  const artist = songs[Math.floor(Math.random() * songs.length)].artist;
	  // Add the artist to the choices array if it's not already there
	  if (!choices.includes(artist)) {
		choices.push(artist);
	  }
	}
	// Shuffle the choices array
	for (let i = choices.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [choices[i], choices[j]] = [choices[j], choices[i]];
	}
  
	// Create the HTML for the quiz question and choices
const questionHTML = `
<div class="quiz-question">Who wrote the song "${randomSong.title}"?</div>
<form id="quiz-form">
 ${choices.map(choice => `
   <div class="quiz-choice">
	 <input type="radio" name="quiz-answer" value="${choice}">
	 <label>${choice}</label>
   </div>
 `).join('')}
 <input type="submit" value="Submit">
</form>
`;

// Display the quiz question and wait for the user's answer
$('#quiz-wrap').html(questionHTML).show();
$('#quiz-form').on('submit', function(event) {
event.preventDefault();
const answer = $('input[name=quiz-answer]:checked', '#quiz-form').val();
if (answer === randomSong.artist) {
 // Update the score if the answer is correct
 score += 10;
 $('#quiz-wrap').html(`<div class="quiz-answer">Correct! Well done.</div>`);
} else {
 // Update the score if the answer is incorrect
 score -= 10;
 $('#quiz-wrap').html(`<div class="quiz-answer">Sorry, the correct answer is ${randomSong.artist}.</div>`);
}
// If this is the last question, show the results
if (questionCounter === 10) {
 $('#quiz-wrap').append(`<div class="quiz-result">You scored ${score} out of 100.</div>`);
} else {
 // Otherwise, wait a few seconds and start the next question
 setTimeout(startQuiz, 2000);
}
});

  
	// Show the boxes again
	$('#box_wrap').show();
  }
  
  // Add a click event listener to the "Play" button for the song quiz
  $('#play_song_button').on('click', startQuiz);
  

