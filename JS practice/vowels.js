// problem count vowels 
// input 
let word = "Program";
let count = 0;
// logic 
for(let letter of word){
    if(letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u"){
        count++;
    }
}
console.log("Total Vowels:" , count);
