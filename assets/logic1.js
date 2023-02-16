function startQuiz() {
	console.log('startQuiz called');
	// Hide the boxes
	$('#box1').hide();
	$('#box2').hide();
  
	//$.ajax(settings).then(function (response) {
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://spotify23.p.rapidapi.com/search/?q=Queen&type=multi&offset=0&limit=10&numberOfTopResults=5",
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "2bdc5d045fmsh0302cc548eecb40p1670d2jsndf26506269ba",
				"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
			}
		};
		
		$.ajax(settings).done(function (response) {
			console.log(response);
	//   // Check if the response has a 'data' property
	   if (response.tracks) {
		console.log(response.tracks)
	   }
	const items = response.tracks.items;
	console.log(items)
	 	const randomItem = items[Math.floor(Math.random() * items.length)];
		console.log(randomItem.data.name)
  
		// Create the HTML for the quiz question and choices

		  const questionHTML = `
		  <div class="quiz-question">Who wrote the ${randomItem.data.name}?</div>
		  <form id="quiz-form">
			  <label>
				  <input type="text" name="quiz-answer" placeholder="Enter your answer">
			  </label>
			  <input type="submit" value="Submit">
		  </form>
	  `;
	  const correctAnswer = items[Math.floor(Math.random() * items.length)];
	// 	// Display the quiz question and wait for the user's answer
		$('#quiz-wrap').html(questionHTML).show();
		$('#quiz-form').on('submit', function(event) {
		  event.preventDefault();
		  const answer = $('input[name=quiz-answer]:checked', '#quiz-form').val();
		  if (answer === correctAnswer) {
			$('#quiz-wrap').html(`<div class="quiz-answer">Correct! Well done.</div>`);
		  } else {
			$('#quiz-wrap').html(`<div class="quiz-answer">Sorry, the correct answer is ${correctAnswer}.</div>`);
		  }
		  console.log(correctAnswer)
		});

	});
  }
  $('#play_song_button').on('click', startQuiz);
  