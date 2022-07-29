const { REACT_APP_API_KEY } = process.env;
const LANG = 'en-US';
export const request = {
	fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28&sort_by=popularity.desc&language=${LANG}`,
};
