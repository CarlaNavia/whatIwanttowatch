
//Linkar el botó "GO!" amb el js
const buttonSearcher = document.querySelector("#buttonSearch");
buttonSearcher.addEventListener("click", (event) => {
  event.preventDefault()
  const form = document.querySelector("#searcher").value;
  getMovies(form)
 })



