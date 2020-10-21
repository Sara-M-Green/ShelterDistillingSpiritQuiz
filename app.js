/* store structure */

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "Which of Shelter Distilling's whiskeys is NOT a single malt?",
      answers: [
        'High Sierra Whiskey',
        'Wild Rose Whiskey',
        'Granite Rye',
        'Dark Sky Whiskey'
      ],
      correctAnswer: 'Granite Rye'
    },
    {
      question: "Glass Creek Vodka is made from 100% American White Wheat and Belgian Yeast. It has notes of vanilla and stone fruit. How many times is it distilled?",
      answers: [
        '1',
        '2',
        '5',
        '10'
      ],
      correctAnswer: '2'
    },
    {
      question: "Which of Shelter Distilling's spirits is distilled from molasses and fermented with a Belgian yeast to create a lovely, sugary finish?",
      answers: [
        'Glass Creek Vodka',
        'Blue Agave',
        'Black Unicorn Coffee Liqueur',
        'Stormrider Rum'
      ],
      correctAnswer: 'Stormrider Rum'
    },
    {
      question: "Which of Shelter Distilling's whiskey was set on a mash bill of chocolate and dark malts typically used when brewing stouts and porters and aged for 18 Months?",
      answers: [
        'High Sierra Whiskey',
        'Wild Rose Whiskey',
        'Granite Rye',
        'Dark Sky Whiskey'
      ],
      correctAnswer: 'Dark Sky Whiskey'
    },
    {
      question: "Which of Shelter Distilling's Gin is described with an Eastern Sierra piney flair and a citrus backbone?",
      answers: [
        'O\'Pinyon Gin',
        'Eastside Gin',
        'Gin the Third',
        'Floralia Gin'
      ],
      correctAnswer: 'O\'Pinyon Gin'
    }
    
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

//loads start quiz HTML when page is opened up
function startQuiz(){
  $( "main" ).html(`
  <div class="container center">
  <h2 id="intro-text">Test your knowledge  of Shelter Distilling's spirits to better assist customers and sell more bottles!</h2>
  <button id="start-btn">Start Quiz</button>
  </div>`);
}

// creates a template for each question
function generateQuestionTemplate(){
  let currentQuestion = store.questions[store.questionNumber-1];
  if (store.questionNumber != 0 && store.questionNumber <= store.questions.length){
    return `
  <div class="container">
    <h3>Question ${store.questionNumber}/${store.questions.length}</h3>
    <form>
      <p class="question-text">${currentQuestion.question}</p>
      ${generateAnswerTemplate()}
      <p id="answer-required"></p>
      <input id="submit-btn" type="submit"></input>
    </form>
    <p class="score-display">Current Score: ${store.score}/${store.questions.length}</p>
  </div>
  `
  } else {
    displayResults();
  }
}

// creates radio buttons for answers to each question
function generateAnswerTemplate() {
  let answers = store.questions[store.questionNumber-1].answers
  const answerArray = [];
  for(let i = 0; i < answers.length; i++){
    answerArray.push(`
    <input type="radio" name="answer" value="${answers[i]}" id="${answers[i]}" required></input>
    <label for="${answers[i]}">${answers[i]}</label><br>`)
  }
  return answerArray.join("");
}

// creates a correct answer HTML template
function generateCorrectAnswerHtml(){
  $( "main" ).html(`
  <div class="container center" >
  <h2>That's Correct!</h2>
  <p class="score-display">Current Score: ${store.score}/${store.questions.length}</p>
  <button id="next-btn">Next</button>
  </div>`);
}

// creates an incorrect answer HTML template
function generateWrongAnswerHtml(){
  $( "main" ).html(`
  <div class="container center">
  <h2>Sorry, that's incorrect.</h2>
  <p>The correct answer was <strong>${store.questions[store.questionNumber-1].correctAnswer}</strong></p>
  <p class="score-display">Current Score: ${store.score}/${store.questions.length}</p>
  <button id="next-btn">Next</button>
  </div>`);
}

//validates an answer choice has been picked, validates the selected answer to correct answer, updates score and displays answer feedback HTML
function generateNewScore(){
  let radios = $('input:radio[name=answer]');
  let correctAnswer = store.questions[store.questionNumber-1].correctAnswer;
  let selectedAnswer = $('input[type=radio]:checked').val();
  if(radios.filter(':checked').length === 0){
    $('#answer-required').text("Please Choose an Answer");
    return;
  } else if (selectedAnswer === correctAnswer){
    store.score += 1;
    generateCorrectAnswerHtml();
  } else {
    generateWrongAnswerHtml();
  } 
}

// moves user onto next question
function nextQuestion(){
  if (store.questionNumber <= store.questions.length){
    store.questionNumber +=1;
  }
}


// changes the HTML in our main section with the question template
function displayQuestion(){
  const questionTemplate = generateQuestionTemplate(store);
    $('main').html(questionTemplate);
}

// displays final results when all questions have been answered
function displayResults(){
    $( "main" ).html(`
    <div class="container center">
      <h2>Final Results<h2>
      <h3>${store.score}/${store.questions.length} Correct Answers</h3>
      <button id="restart-btn">Restart Quiz</button>
    </div>`);
  }


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(){
  startQuiz();
  generateQuestion();
  checkAnswer();
  handleNext();
  restartQuiz();
}

render();


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)


// displays the first question and changes quizStarted to true when START QUIZ button is clicked
function generateQuestion(question){
  $("main").on("click", "#start-btn", function(){
    store.quizStarted = true;
    store.questionNumber = 1;
    displayQuestion();
  });
}

// compares user answer to correct answer when SUBMIT button is clicked on each question
function checkAnswer(){
  $('main').on("click", "#submit-btn", function(event){
    event.preventDefault();
    generateNewScore();
  });
}

// takes user to next question after results feedback is displayed
function handleNext(){
  $('main').on('click', '#next-btn', function(){
    nextQuestion();
    displayQuestion();
  });
}

//resets all default values in store, and takes user back to start screen
function restartQuiz(){
  $('main').on("click", "#restart-btn", function(){
    render();
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
  });
}
