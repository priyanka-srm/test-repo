const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
function render() {
    if(state.loading) {
        result.innerHTML =`<p> Loading...</p>`;
        return;
    }
    if(state.error) {
        result.innerHTML = `<p> ${state.error}</p>`;
        return;
    }
    if(state.user) {
        result.innerHTML = ` <img src = "${state.user.avatar_url}" width= 100>
        <h2> ${state.user.login} </h2>
        <p> Followers: ${state.user.followers} </p> `;
        return;
    }
}
async function searchUser() {
    const username = searchInput.value.trim();
    if(!username) {
        return;
    }
    state.loading = true;
    state.error = null;
    render();
    try {
        const user = await fetchUser(username);
        state.user = user;
    }
    catch(error) {
        state.error = error.message;
    }
    finally {
        state.loading = false;
        render();
    }
}
searchInput.addEventListener("keydown" , function(event) {
    if(event.key === "Enter"){
        searchUser();
    }
});