import { apiKey, baseurl, w500 } from "./api";

function render(name, id) {
  (async function getData() {
    const genreApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`;
    const responses = await fetch(genreApi);
    const genre = await responses.json();
    showGenre(genre);
  })();

  function showGenre(data) {
    console.log(data);
    let movies = data.results;
    let html = "";

    movies.forEach((movie) => {
      const title = movie.title;
      const date = movie.release_date;
      const img = movie.backdrop_path;

      let htmlSegment = `
      <li class='item'>
        <div class='image'><img src="${baseurl}${w500}${img}"></div>
        <div class='meta'>
          <div class='meta-des'><p>${date.substring(
            0,
            date.length - 6
          )}</p><span></span><svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" fill="currentColor"/></svg><p>Movie</p></div>
          <h2 class='meta-title'>${title}</h2>
        </div>
      </li>`;
      html += htmlSegment;
    });

    const h1 = document.createElement("h1");
    h1.innerHTML = `<h1 class="movies-title">${name}</h1>`;
    document.querySelector(".container").appendChild(h1);

    const ul = document.createElement("ul");
    ul.classList.add("movies");
    document.querySelector(".container").appendChild(ul);
    ul.innerHTML = html;
  }
}

export default render;
