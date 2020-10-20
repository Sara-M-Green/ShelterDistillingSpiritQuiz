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
      correctAnswer: 'High Sierra Whiskey'
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
      question: "Floralia Gin has floral notes layered with cherry, fig, vanilla and dates. It is aged in a Portugese Port barrel. How long is it aged?",
      answers: [
        '6 months',
        '8 months',
        '12 months',
        '14 months'
      ],
      correctAnswer: '12 months'
    },
    {
      question: "Dark Sky is a unique whiskey set on a mash bill of chocolate and dark malts typically used when brewing stouts and porters. It is aged for 18 Months. What kind of barrel is it aged in?",
      answers: [
        'Hungarian Oak',
        'American Oak',
        'Sessile Oak',
        'European Oak'
      ],
      correctAnswer: 'American Oak'
    },
    {
      question: "Blue agave is 100% Organic Blue Agave sourced from the tequila regions of Mexico. Aged in a used Port Barrel for 8 months. What proof is the Blue Agave?",
      answers: [
        '88',
        '90',
        '92',
        '94'
      ],
      correctAnswer: '90'
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
  <div class="container">
  <h2>Test your knowledge  of Shelter Distilling's spirits to better assist customers and sell more bottles!</h2>
  <button id="start-btn">Start Quiz</button>
  </div>`);
}

function generateQuestionTemplate(){
  let currentQuestion = store.questions[store.questionNumber-1];
  if (store.questionNumber != 0 && store.questionNumber <= store.questions.length){
    return `
  <div class="container">
    <h3>Question ${store.questionNumber}/${store.questions.length}</h3>
    <form>
      <p class="question-text">${currentQuestion.question}</p>
      ${generateAnswerTemplate()}
      <input id="submit-btn" type="submit"></input>
    </form>
  </div>
  `
  } else {
    displayResults();
  }
    
}

function generateAnswerTemplate() {
  let answers = store.questions[store.questionNumber-1].answers
  const answerArray = [];
  for(let i = 0; i < answers.length; i++){
    answerArray.push(`
    <input type="radio" name="answer" value="${answers[i]}"></input>
    <label for="answer${i+1}">${answers[i]}</label><br>`)
  }
  return answerArray.join("");
}



function generateNewScore(){
  let correctAnswer = store.questions[store.questionNumber-1].correctAnswer;
  const selectedAnswer = $('input[type=radio]:checked').val();
  if(selectedAnswer === correctAnswer){
    store.score += 1;
    console.log("Correct! Current Score: " + store.score);
  } else {
    console.log("Incorrect. CurrentScore: " + store.score);
  }
}
  
function nextQuestion(){
  if (store.questionNumber <= store.questions.length){
    store.questionNumber +=1;
  }
}


//This function changes the HTML in our main section with the question template
function displayQuestion(){
  const questionTemplate = generateQuestionTemplate(store);
    $('main').html(questionTemplate);
}

function displayResults(){
    $( "main" ).html(`
    <div class="container">
      <h3>Final Results ${store.score}/${store.questions.length}</h3>
      <button>Restart Quiz</button>
    </div>`);
  }


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(){
  startQuiz();
  generateQuestion();
  checkAnswer();
}


render();
/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function generateQuestion(question){
  $("#start-btn").click(function(){
    store.quizStarted = true;
    store.questionNumber = 1;
    displayQuestion();
  });
}

function checkAnswer(){
  $('main').on("click", "#submit-btn", function(event){
    event.preventDefault();
    generateNewScore();
    nextQuestion();
    displayQuestion();
  });
}


