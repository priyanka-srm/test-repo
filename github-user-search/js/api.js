async function fetchUser(username , signal) {
    const response = await fetch(`https://api.github.com/users/${username}`, {signal});
    if(!response.ok) {
        throw new Error("User not found");
    }
    const data = await response.json();
    return data;
}