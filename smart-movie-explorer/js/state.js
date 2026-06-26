export const state = {
    movies:[] , selectedMovie: null, query:"" , loading: false, error:null
};
export function setState(updates) {
    Object.assign(state, updates);
}