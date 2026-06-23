const state = { 
    user: null, loading: false, error: null, query: ""
};
function setState(updates){
    Object.assign(state, updates);
    render();
}