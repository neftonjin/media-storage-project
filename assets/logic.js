const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=search&type=multi&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "f52fefffa7msh4adaf3573b9c473p12a90djsn801350d39fda",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

function startQuiz() {
	console.log('startQuiz called');
	// Hide the boxes
	$('#box1').hide();
	$('#box2').hide();
  
	// Fetch data from API and select a random track or artist
	$.ajax(settings).done(function (response) {
		
	  // Check if the response has a 'data' property
	  if (response.data) {
		const items = response.data.item;
		const randomItem = items[Math.floor(Math.random() * items.length)];
  
		// Determine the correct answer and create answer choices
		const correctAnswer = (randomItem.type === 'track') ? randomItem.artists[0].name : randomItem.name;
		const choices = [correctAnswer];
		while (choices.length < 4) {
		  const choice = items[Math.floor(Math.random() * items.length)];
		  const artistName = (choice.type === 'track') ? choice.artists[0].name : choice.name;
		  if (!choices.includes(artistName)) {
			choices.push(artistName);
		  }
		}
  
		// Shuffle the answer choices
		for (let i = choices.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [choices[i], choices[j]] = [choices[j], choices[i]];
		}
  
		// Create the HTML for the quiz question and choices
		const questionHTML = `
		  <div class="quiz-question">Who wrote the ${randomItem.type} "${randomItem.name}"?</div>
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
		  if (answer === correctAnswer) {
			$('#quiz-wrap').html(`<div class="quiz-answer">Correct! Well done.</div>`);
		  } else {
			$('#quiz-wrap').html(`<div class="quiz-answer">Sorry, the correct answer is ${correctAnswer}.</div>`);
		  }
		});
  
		// Show the boxes again
		$('#box_wrap').show();
	  } else {
		console.log('No data.');
	  }
	});
  }
  $('#play_song_button').on('click', startQuiz);
  