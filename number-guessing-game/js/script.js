var guessnumber = document.getElementById("guessnumber");
var result = document.getElementById("result");
var score = document.getElementById("score");
var randomNumber = Math.floor(Math.random() * 10) + 1;
var totalscore = 10;
function check() {
    var enterednumber = Number(guessnumber.value);
    if (randomNumber === enterednumber) {
        result.textContent = "Right";
        alert("YOU WON THE GAME");
    } else {
        totalscore--;
        score.textContent = "Score: " + totalscore;
        result.textContent = "Wrong";
    }
}