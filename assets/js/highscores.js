
var highScoresList = document.querySelector('#high-scores');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var clearHighscoreBtn = document.querySelector('#clear-highscore-btn');

highScores.innerHTML = '';

highScores.forEach(function (score) {
    var li = document.createElement('li');
    li.textContent = `${score.initials} - ${score.score}`;
    highScoresList.appendChild(li);
});

function clearLocalStorage() {
    if (localStorage.length !== 0 && confirm('Are you sure you want to delete your highscores?') == true) {
        localStorage.clear();
        location.reload();
    }
}

clearHighscoreBtn.addEventListener('click', clearLocalStorage)