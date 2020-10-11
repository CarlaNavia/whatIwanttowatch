class MovieDbApiService {
  constructor() {
    this.BASE_URL = "https://api.themoviedb.org/3/";
    this.API_KEY = "01f37d24238fcae1de083c92988ee412";
    this.getMoviesUrl = `${this.BASE_URL}search/movie?api_key=${this.API_KEY}&query=`;
    this.getMovieUrl = `${this.BASE_URL}movie/`
  }

  //La crida de la API per tenir el llistat de pelis que s'estàn buscant per text
  getMovies = (searchText) => {
    fetch(`${this.getMoviesUrl}${searchText}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  //La crida de la API per tenir el detall de la peli
  getMovie = (id) => {
    fetch(`${this.getMovieUrl}${id}?api_key=${this.API_KEY}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
}
const moviesService = new MovieDbApiService();
moviesService.getMovies("spiderman");
moviesService.getMovie("557");
