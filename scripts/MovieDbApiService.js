const API_KEY = "01f37d24238fcae1de083c92988ee412";
const BASE_URL = "https://api.themoviedb.org/3/";

const getMoviesUrl = `${BASE_URL}search/movie?api_key=${API_KEY}&query=spiderman`

fetch(getMoviesUrl)
  .then(response => response.json())
  .then(data => console.log(data));