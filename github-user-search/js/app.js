const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
let controller = null;
function render() {
    result.replaceChildren();
    if(state.loading) {
        result.append(createElement("p" , "loading..."));
        return;
    }
    if(state.error) {
        result.append(createElement("p" , state.error));
        return;
    }
    if(state.user){
        const img = document.createElement("img");
        img.src = state.user.avatar_url;
        img.width = 100;
        img.alt = state.user.login;
        result.append(img, createElement("h2", state.user.login), createElement("p" , `Followers: ${state.user.followers}`));
        return;
    }
    result.append(createElement("p", "Search a user to see details"));
}
function createElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}
async function searchUser() {
    const username = searchInput.value.trim();
    if(!username) {
        setState({
            user:null , error:null, query: ""
        });
        return;
    }
    if(controller){
        controller.abort();
    }
    controller = new AbortController();
    const currentController = controller;
    setState({
        query: username,
        loading:true,
        error:null
    });
    try {
        const user = await fetchUser(username , controller.signal);
        setState({
            user:user , error:null
        });
    }
    catch(error) {
        if(error.name === "AbortError"){
            return;
        }
        setState({
            user:null, error:error.message
        });
    }
    finally {
        if(!currentController.signal.aborted) {
            setState({
                loading:false
            });
        }
    }
}
function debounce(fn, delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,args);
        }, delay);
    };
}
const debounceSearch = debounce(searchUser,400);
searchInput.addEventListener("input", debounceSearch);
