import clear from "./clear";
import showSearch from "./showSearch";
import render from "./render";

function showGenres(data) {
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
    const type = key.dataset.id;

    clear();
    showSearch();
    render(keyValue, type);
  });
}

export default showGenres;
