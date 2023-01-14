var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var optionsEl = document.getElementById('options');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');
  questionsEl.removeAttribute('class');
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionEl = document.getElementById('question');
  questionEl.textContent = currentQuestion.question; 
  optionsEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.options.length; i++) { 
    var option = currentQuestion.options[i];
    var optionNode = document.createElement('button');
    optionNode.setAttribute('class', 'option');
    optionNode.setAttribute('value', option);
    optionNode.textContent = i + 1 + '. ' + option;
    optionsEl.appendChild(optionNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  if (!buttonEl.matches('.option')) {
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // take away time
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== '') {
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];
    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
optionsEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;

function addNumbers(number_one, number_two) {
  return number_one + number_two
}