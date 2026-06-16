const state = {
    count: localStorage.getItem("count")
    ? parseInt(localStorage.getItem("count")) : 0
};
let countValue = document.getElementById("count");
let incBtn = document.getElementById("increase");
let decBtn = document.getElementById("decrease");
let resetBtn = document.getElementById("reset");
let stepInput = document.getElementById("step");
// initial display
render();
incBtn.addEventListener("click", function(){
    let step = parseInt(stepInput.value);
    setState({
        count: state.count + step
    }
    );
} );
decBtn.addEventListener("click", function(){
    let step = parseInt(stepInput.value);
    setState ( {
        count: state.count - step
    }
    );
});
resetBtn.addEventListener("click", function(){
    setState( {
        count: 0
    });
});
function setState(updates) {
    Object.assign(state , updates);
    localStorage.setItem("count" , state.count);
    render();
}
function render () {
    countValue.textContent = state.count;
    if(state.count > 0) {
        countValue.style.color = "green";
    }
    else if(state.count < 0) {
        countValue.style.color = "red";
    }
    else {
        countValue.style.color = "black";
    }
}




