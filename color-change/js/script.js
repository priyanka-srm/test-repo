let btn = document.getElementById("btn");
let colorText = document.getElementById("colorCode");
btn.addEventListener("click", function(){
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    document.body.style.backgroundColor = color;
    colorText.textContent = color;
});