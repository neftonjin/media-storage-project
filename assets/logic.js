

  // Define an array of songs and their corresponding artists
  const songs = [
	{ title: 'Bohemian Rhapsody', artist: 'Queen', preview_url: 'https://p.scdn.co/mp3-preview/4c8e7c9f5fcaa2c54178583b31bcbce08bc329b0?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Like a Rolling Stone', artist: 'Bob Dylan', preview_url: 'https://p.scdn.co/mp3-preview/f0b80375e119086da7b15568a31995f3a9311490?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Stairway to Heaven', artist: 'Led Zeppelin', preview_url: 'https://p.scdn.co/mp3-preview/d65345613e6e9d2b09816783b9c79793f9175a41?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Imagine', artist: 'John Lennon' , preview_url: 'https://p.scdn.co/mp3-preview/3ecb8ff1dcc79c652a16b37dd2a54438715020e3?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'What\'s Going On', artist: 'Marvin Gaye', preview_url: 'https://p.scdn.co/mp3-preview/4465cfb651565353c3c51d1248746a82d6402a58?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Smells Like Teen Spirit', artist: 'Nirvana', preview_url: 'https://p.scdn.co/mp3-preview/72efbab455857a3596ccdef0e726262987c88a99?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Billie Jean', artist: 'Michael Jackson', preview_url: 'https://p.scdn.co/mp3-preview/fe96b637200f2b20da85c74aeafcc97534da3054?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Purple Haze', artist: 'Jimi Hendrix' , preview_url: 'https://p.scdn.co/mp3-preview/a25dd2c8b6ea332a32e631e90b01dd6f4144b32c?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'I Will Always Love You', artist: 'Whitney Houston' , preview_url: 'https://p.scdn.co/mp3-preview/4ba75d5d764b0f0e0a2ca4727736da42b7cc9484?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'I Want to Hold Your Hand', artist: 'The Beatles' , preview_url: 'https://p.scdn.co/mp3-preview/9d4d3ba4d72947a3d570f94df6e19166461596fe?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' , preview_url: 'https://p.scdn.co/mp3-preview/e93312278ea1ae01b26b79f2ec1ed3945dbb7406?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Livin\' on a Prayer', artist: 'Bon Jovi', preview_url: 'https://p.scdn.co/mp3-preview/7dd66c1d90f6bf623acbc73e5b4b69bdf13e41bf?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Hotel California', artist: 'The Eagles', preview_url: 'https://p.scdn.co/mp3-preview/8eb1ea19b4811fc7efa330ea146329bdffd9165f?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Thriller', artist: 'Michael Jackson', preview_url: 'https://p.scdn.co/mp3-preview/928993faf45ea6a9291226545c7147695dbf062e?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
	{ title: 'Every Breath You Take', artist: 'The Police', preview_url: 'https://p.scdn.co/mp3-preview/9213e4bbbdfce2e16d6e13a3aa968c92bd105d45?cid=d8a5ed958d274c2e8ee717e6a4b0971d' },
  ];
  
  let heartSymbol = '<i class="fas fa-heart"></i>';
  let lives = 3;
  let index = 0;
  let questionCounter = 0;
  let usedQuestions = [];
  let scores = 0;
  let isGameOver = false;
  
  // Function to start the quiz
  function startQuiz() {
	// Hide the boxes
	$('#box1').hide();
	$('#box2').hide();
  
	// Increment the question counter and update the HTML
	questionCounter++;
	$('#quiz-counter').text(`Question ${questionCounter} of 10`);
  
	// Choose a random song from the array that hasn't been used yet
	let randomSong;
	do {
	  randomSong = songs[Math.floor(Math.random() * songs.length)];
	} while (usedQuestions.includes(randomSong));
	usedQuestions.push(randomSong);
  
	const { title, artist, preview_url } = randomSong;
  
	const audio = new Audio(preview_url);
	audio.play();
  
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
  
	
	const heartIcons = heartSymbol.repeat(lives);
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
	  <div id="heart-container">
		${heartIcons}
	  </div>
	`;
	
	
  
	// Display the quiz question and wait for the user's answer
	$('#quiz-wrap').html(questionHTML).show();
	$('#quiz-form').on('submit', function(event) {
	  event.preventDefault();
  
	  const answer = $('input[name=quiz-answer]:checked', '#quiz-form').val();
	  if (answer === randomSong.artist) {
		// Update the score if the answer is correct
		scores += 10;
		$('#quiz-wrap').html(`<div class="quiz-answer">Correct! Well done. You're a music genius!</div>`);
	  } else {
		// Update the score if the answer is incorrect
		lives--;
		$('#heart-container').find('.fas.fa-heart:last').remove();
		$('#quiz-wrap').html(`<div class="quiz-answer">Sorry, the correct answer is ${randomSong.artist}. We still like you, don't worry.</div>`);
	  }
	  
	  
	  audio.pause();
	  if (questionCounter === 10 || lives === 0) {
		isGameOver = true;
	  
		if (lives === 0) {
		  $('#quiz-wrap').append(`<div class="quiz-result">Game over! You scored ${scores} out of 100.</div><button id="play-again">Play Again</button>`);
		} else {
		  $('#quiz-wrap').append(`<div class="quiz-result">You scored ${scores} out of 100.</div><button id="play-again">Play Again</button>`);
		}
	  
		// Show the heart symbols when the page loads
		const heartsHTML = `${heartSymbol.repeat(lives)}${heartSymbol.repeat(3 - lives)}`;
		$('#hearts').html(heartsHTML);
	  
		// Add a click event listener to the "Play Again" button
		$('#play-again').on('click', function() {
		  questionCounter = 0;
		  usedQuestions = [];
		  scores = 0;
		  lives = 3;
		  isGameOver = false;
		  startQuiz();
		});
	  
	  } else {
		// Otherwise, wait a few seconds and start the next question
		setTimeout(startQuiz, 2500);
	  }
	  
	  // Update the heart symbols
	  const heartsHTML = `${heartSymbol.repeat(lives)}${heartSymbol.repeat(3 - lives)}`;
	  $('#hearts').html(heartsHTML);
	}
	)

	// Show the boxes again
	$('#box_wrap').show();
	$('#play_song_button').hide();
  }
  
  
  // Add a click event listener to the "Play" button for the song quiz
  $('#play_song_button').on('click', startQuiz);

  document.getElementById("quiz-body").style.backgroundImage = "url('assets/images/crowd.jpg')";

  