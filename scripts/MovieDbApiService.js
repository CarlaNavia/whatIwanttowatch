
//Crear les 4 variables de la API
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '01f37d24238fcae1de083c92988ee412';
const getMoviesUrl = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
const getMovieUrl = `${BASE_URL}movie/`;



//La crida de la API per tenir el llistat de pelis que s'estàn buscant per text
const getMovies = (searchText) => {
  const movie = document.querySelector(".movie") //Linkar el div on estará la capsa d'informació (seria millor dir-li "movies")
  fetch(`${getMoviesUrl}${searchText}`)
    .then((response) => response.json())
    .then((data) =>{
        movie.innerHTML = ""; //para que borre la búsqueda anterior y no acumule los resultados
        data.results.map((oneMovie) => { //la API em dóna un objecte amb un paràmetre que es diu results i cada objecte li dic oneMovie (inventat per mi)
          const eachMovie = document.createElement("div") //Estic creant un div dins del div movie del HTML
          eachMovie.innerHTML = `<div class="target"> 
            <img src="https://image.tmdb.org/t/p/w500${oneMovie.poster_path}"/>
            <h5>${oneMovie.original_title}</h5>
            <a href="filmpage.html?id=${oneMovie.id}" class="showmore">Show more</a> 
          </div>`
          movie.appendChild(eachMovie) //Afegir dintre del div ja creat "movie" el nou div "eachMovie"
        }) }
      
    );
};

//La crida de la API per tenir el detall de la peli
const getMovie = (id) => {
  const sinopsis = document.querySelector(".sinopsis")
  fetch(`${getMovieUrl}${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
console.log(data)


          const detailed = document.createElement("div");
          detailed.innerHTML = `<div> <img src="https://image.tmdb.org/t/p/w500${data.poster_path}"/>
          <h5>${data.original_title}</h5> </div>`
          sinopsis.appendChild(detailed)
        
    } 
    );

};






