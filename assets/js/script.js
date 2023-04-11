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

// Lets initiate variables
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

// Reset the game
function resetGame() {
    introEl.style.display = "block";
    quizContainer.style.display = "none";
    clearInterval(timerId);
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
    // Check if current answer matches the correct answer within quizQuestions
    var isCorrect = quizQuestions[currentQuestion].answer === answer;
    if (isCorrect) {
        // Correct answer, score 10 points
        score += 10;
        // Tell user they were correct
        statusEL.textContent = "Correct!";
    } else {
        // Wrong answer, take 10 seconds off the timer
        timeLeft -= 10;
        // Tell user they were wrong
        statusEL.textContent = "Wrong!";
        // Update the timer on the page with the penalty of -10
        timerEl.textContent = timeLeft;
    }

    // Add the score to the #score element
    scoreEl.textContent = score;

    // Show next question
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        // If questions left, show the next one
        showQuestion();
    } else {
        // If not questions left, the game is over
        gameOver();
    }
}

// Game over function
function gameOver() {
    // Lets kill the timer
    clearInterval(timerId);
    // Hide the quiz
    quizContainer.style.display = "none";
    // Show the game over section
    gameOverContainer.style.display = "block";
}

// Lets add event listener to the #submitScoreBtn button and store the highscores functions
submitScoreBtn.addEventListener('click', function (event) {
    event.preventDefault();
    // Store user initials, remove empty spaces and convert to uppercase
    var initials = initialsEl.value.trim().toUpperCase();
    // Check if initials were entered
    if (initials) {
        // Retrieve highscores from localStorage and convert them to an object
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        // Save the new score
        var newScore = {
            initials: initials,
            score: score
        };
        // Add this new score (push) to the highScores object
        highScores.push(newScore);
        // Sort them
        highScores.sort((a, b) => b.score - a.score);
        // Limit it up to 5 highschores
        highScores.splice(5);
        // Convert the new highscores back to a string and store in localStorage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        // Redirect to the highscore page
        window.location.href = "highscore.html";
    }
});

// Adding event listener to startQuizBtn button to start the game
startQuizBtn.addEventListener('click', startGame);

// Adding event listeners to each one of the answer buttons with a function to relay the chosen answer to the checkAnswer function so that it can check if its correct
choiceA.addEventListener('click', function () { checkAnswer("a"); });
choiceB.addEventListener('click', function () { checkAnswer("b"); });
choiceC.addEventListener('click', function () { checkAnswer("c"); });
choiceD.addEventListener('click', function () { checkAnswer("d"); });

// Reset the game by default
resetGame();