let count = 0;
let countValue = document.getElementById("count");
let incBtn = document.getElementById("increase");
let decBtn = document.getElementById("decrease");
let resetBtn = document.getElementById("reset");
incBtn.addEventListener("click", function(){
    count++;
    countValue.textContent = count;
});
decBtn.addEventListener("click", function(){
    count--;
    countValue.textContent = count;
});
resetBtn.addEventListener("click", function(){
    count = 0;
    countValue.textContent = count;
});



