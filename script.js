// create any variables for time, your questions (array of objects), and a ways to globally target the position of the index of the question array
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// create the variables for the DOM elements you are targeting
var articlesDiv = document.getElementById('articles');
var headerDiv = document.getElementById('header');
var timerEl = document.getElementById('time');
var startBtn = document.getElementById('start');
var questionsEl = document.getElementById('second');
var choicesEl = document.getElementById('choices');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');
var startScreenEl = document.getElementById('first');
var submitBtn =document.getElementById('submit');

// when the user visits the page they click on the button. 
// we need to start the timer.
// we need to hide/unhide second container
function startQuiz() {
    startScreenEl.setAttribute('class', 'hide');
   
    questionsEl.removeAttribute('class');

    timerEl.textcontent = time;
    timerId = setInterval(clockTick, 1000);


    askQuestions();
}
    
function askQuestions() {
    // add the content into the title element and into our choices container
    // add a click event to our choice options
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('title');
    titleEl.textContent = currentQuestion.title;

    // clear other choices
    choicesEl.innerHTML = '';

    //create a forloop for choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.addEventListener('click', questionClick)
        choiceNode.textContent = choice;
        choicesEl.append(choiceNode)
    }
    
}

function questionClick(event) {
    var buttonEl = event.target;
  
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
  
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timerEl.textContent = time;

  
    }
  

  
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      askQuestions();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById('third');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }
  
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== '') {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials,
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
  
      
    }
  }
  
  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }
  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  

  
 



