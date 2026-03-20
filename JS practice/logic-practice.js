function firstUnique(str){
    let freq = {};
    for(let char of str){
        freq[char] = (freq[char] || 0) + 1;
    }
    for(let char of str){
        if(freq[char] === 1){
            console.log(char);
            return;
        }
    }
}
firstUnique("javascript");