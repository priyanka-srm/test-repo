var guessnumber = document.getElementById("guessnumber");
var result = document.getElementById("result");
var score = document.getElementById("score");
var attemptsDisplay = document.getElementById("attempts");
var history = document.getElementById("history");
// random number
var randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
var totalscore = 100;
var attempts = 10;
// hint logic
function getHint(secret, guess){
    let output = "";
    for(let i = 0; i < 4; i++){
        if(guess[i] === secret[i]){
            output += "🟢 ";
        }
        else if(secret.includes(guess[i])){
            output += "🟡 ";
        }
        else{
            output += "🔴 ";
        }
    }
    return output;
}
// main logic
function check() {
    var enterednumber = guessnumber.value;
    if(enterednumber.length !== 4){
        result.textContent = "❗ Enter 4 digit number";
        return;
    }
    attempts--;
    totalscore -= 10;
    if (randomNumber === enterednumber) {
        result.textContent = "🎉 Correct! You Won!";
        alert("YOU WON THE GAME");
        return;
    } 
    if(attempts === 0){
        result.textContent = "💀 Game Over! Number was " + randomNumber;
        return;
    }
    let hint = getHint(randomNumber, enterednumber);
    result.textContent = hint;
    score.textContent = "Score: " + totalscore;
    attemptsDisplay.textContent = "Attempts Left: " + attempts;
    // history
    history.innerHTML += `<p>${enterednumber} → ${hint}</p>`;
    guessnumber.value = "";
}
// restart
function restart(){
    randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
    totalscore = 100;
    attempts = 10;
    score.textContent = "Score: 100";
    attemptsDisplay.textContent = "Attempts Left: 10";
    result.textContent = "";
    history.innerHTML = "";
    guessnumber.value = "";
}