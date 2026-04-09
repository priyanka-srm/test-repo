let count = localStorage.getItem("count") 
    ? parseInt(localStorage.getItem("count")) 
    : 0;
let countValue = document.getElementById("count");
let incBtn = document.getElementById("increase");
let decBtn = document.getElementById("decrease");
let resetBtn = document.getElementById("reset");
let stepInput = document.getElementById("step");
// initial display
countValue.textContent = count;
updateColor();
incBtn.addEventListener("click", function(){
    let step = parseInt(stepInput.value);
    count += step;
    updateDisplay();
});
decBtn.addEventListener("click", function(){
    let step = parseInt(stepInput.value);
    count -= step;
    updateDisplay();
});
resetBtn.addEventListener("click", function(){
    count = 0;
    updateDisplay();
});
function updateDisplay(){
    countValue.textContent = count;
    localStorage.setItem("count", count);
    updateColor();
}
function updateColor(){
    if(count > 0){
        countValue.style.color = "green";
    } 
    else if(count < 0){
        countValue.style.color = "red";
    } 
    else{
        countValue.style.color = "black";
    }
}




