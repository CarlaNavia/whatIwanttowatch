const splitUrlParametres = window.location.search.split("?id=");
const id = splitUrlParametres[1];

getMovie(id)