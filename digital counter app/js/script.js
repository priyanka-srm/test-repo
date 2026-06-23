const savedCount = localStorage.getItem("count");
const state = {
    count : savedCount === null ? 0 : Number.isInteger(parseInt(savedCount,10)) ? parseInt(savedCount,10) : 0, step: 1
};
const countValue = document.getElementById("count");
const incBtn = document.getElementById("increase");
const decBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const stepInput = document.getElementById("step");
function getStep() {
    const value = parseInt(stepInput.value,10);
    return Number.isInteger(value) && value > 0 ? value : 1;
}
// initial display
render();
incBtn.addEventListener("click", function(){
    setState({
        count: state.count + getStep()
    } );
} );
decBtn.addEventListener("click", function(){
    setState({
        count: state.count - getStep()
    });
});
resetBtn.addEventListener("click", function(){
    setState( {
        count: 0
    });
});
stepInput.addEventListener("input" , function(){
    setState({
        step: getStep()
    });
});
function setState(updates) {
    Object.assign(state , updates);
    render();
    persist();
}
function persist(){
    localStorage.setItem("count" , String(state.count));
}
function render(){
    countValue.textContent = state.count;
    countValue.className = 
    state.count > 0
    ? "positive"
    : state.count < 0
    ? "negative"
    : "zero";
}




