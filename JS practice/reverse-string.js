// problem reverse a string
// input 
let text = "priyanka";
let reversed = "";
// logic 
for (let i = text.length - 1; i >= 0; i--){
    reversed += text[i];
}
console.log(reversed);