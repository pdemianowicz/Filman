import { apiKey } from "./api";
import clear from "./clear";
import showSearch from "./showSearch";
import render from "./render";

function genres(type) {
  (async function getData() {
    const genresListApi = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
    const responses = await fetch(genresListApi);
    const genresList = await responses.json();
    showGenres(genresList, type);
  })();
}

function showGenres(data, type) {
  let genres = data.genres;
  let html = "";

  genres.forEach((genre) => {
    let htmlSegment = `<a data-id="${genre.id}" class="genres__item">${genre.name}</a>`;
    html += htmlSegment;
  });
  const div = document.createElement("div");
  div.classList.add("genres");
  document.querySelector(".container").appendChild(div);
  div.innerHTML = html;

  div.addEventListener("click", (event) => {
    const key = event.target;
    const keyValue = key.textContent;
    const id = key.dataset.id;

    clear();
    showSearch();
    render(keyValue, id, type);
  });
}

export default genres;
