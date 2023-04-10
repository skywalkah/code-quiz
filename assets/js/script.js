// Containers
var mainStage = document.querySelector('#main-stage');
var timerEl = document.querySelector('#timer-cont');
var introEl = document.querySelector('.intro-text');
var quizContainer = document.querySelector("#quiz-container");
var questionEl = document.querySelector("#question");
var choiceA = document.querySelector("#choice-a");
var choiceB = document.querySelector("#choice-b");
var choiceC = document.querySelector("#choice-c");
var choiceD = document.querySelector("#choice-d");
var statusEL = document.querySelector("#status");
var gameOverContainer = document.querySelector("#game-over");
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");

// Buttons
var startQuizBtn = document.querySelector('#start-quiz');
var submitScoreBtn = document.querySelector('#submit-score');

// Questions
var quizQuestions = [
    {
        question: "Which type of language is JavaScript?",
        a: "Object-Oriented",
        b: "Object-Based",
        c: "Assembly-language",
        d: "High-level",
        answer: "b"
    }, {
        question: 'The "function" and "var" are known as:',
        a: "Keywords",
        b: "Data types",
        c: "Declaration statements",
        d: "Prototypes",
        answer: "c"
    }, {
        question: "Which of the following number object function returns the value of the number?",
        a: "toString()",
        b: "valueOf()",
        c: "toLocaleString()",
        d: "toPrecision()",
        answer: "b"
    }, {
        question: "In JavaScript the x===y statement implies that:",
        a: "Both x and y are equal in value, type and reference address as well.",
        b: "Both are x and y are equal in value only",
        c: "Both are equal in the value and data type",
        d: "Both are not same at all",
        answer: "c"
    }
]

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerId;

// Update the timer
function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        gameOver();
    }
}

// Start the game function
function startGame(event) {
    // Prevent reloading
    event.preventDefault();
    // Hide intro block
    introEl.style.display = "none";
    // Show quiz
    quizContainer.style.display = "block";
    timerId = setInterval(updateTimer, 1000);
    // Show questions
    showQuestion();
}

// Show questions function
function showQuestion() {
    var q = quizQuestions[currentQuestion];
    questionEl.textContent = q.question;
    choiceA.textContent = q.a;
    choiceB.textContent = q.b;
    choiceC.textContent = q.c;
    choiceD.textContent = q.d;
}

// Check if the answer is correct ot not
function checkAnswer(answer) {
    var isCorrect = quizQuestions[currentQuestion].answer === answer;
    if (isCorrect) {
        score += 10;
        statusEL.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        statusEL.textContent = "Wrong!";
        timerEl.textContent = timeLeft;
    }
    scoreEl.textContent = score;
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        gameOver();
    }
}

function gameOver() {
    clearInterval(timerId);
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
}

submitScoreBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var initials = initialsEl.value.trim().toUpperCase();
    if (initials) {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = {
            initials: initials,
            score: score
        };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href = "highscore.html";
    }
});

startQuizBtn.addEventListener('click', startGame);

choiceA.addEventListener('click', function () { checkAnswer("a"); });
choiceB.addEventListener('click', function () { checkAnswer("b"); });
choiceC.addEventListener('click', function () { checkAnswer("c"); });
choiceD.addEventListener('click', function () { checkAnswer("d"); });