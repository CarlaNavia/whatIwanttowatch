
const buttonSearcher = document.querySelector("#buttonSearch");

buttonSearcher.addEventListener("click", (event) => {
  event.preventDefault()
  const form = document.querySelector("#searcher").value;
  getMovies(form)
 })


const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '01f37d24238fcae1de083c92988ee412';
const getMoviesUrl = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
const getMovieUrl = `${BASE_URL}movie/`;


//La crida de la API per tenir el llistat de pelis que s'estàn buscant per text
const getMovies = (searchText) => {
  const movie = document.querySelector(".movie")
  fetch(`${getMoviesUrl}${searchText}`)
    .then((response) => response.json())
    .then((data) =>
      
        data.results.map((oneMovie) => {
          const eachMovie = document.createElement("div")
          eachMovie.innerHTML = `<div class="target">
            <img src="https://image.tmdb.org/t/p/w500${oneMovie.poster_path}"/>
            <h5>${oneMovie.original_title}</h5>
          </div>`
          
          movie.appendChild(eachMovie)
        })
      
    );
};



//La crida de la API per tenir el detall de la peli
const getMovie = (id) => {
  fetch(`${getMovieUrl}${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};















