import { apiKey, baseurl, w500 } from "./api";

function renderQuery(query) {
  (async function getData() {
    const searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    const responses = await Promise.all([fetch(searchApi)]);
    const search = await responses[0].json();

    render(search);
  })();

  function render(data) {
    let movies = data.results;
    movies = movies ? movies.filter((item) => item.media_type !== "person") : [];
    movies = movies ? movies.filter((item) => item.backdrop_path !== null || item.poster_path !== null) : []; // check img
    let html = "";

    console.log(movies);

    movies.forEach((movie) => {
      const id = movie.id;
      const title = movie.title || movie.name;
      const date = movie.release_date || movie.first_air_date || " ";
      const img = movie.backdrop_path || movie.poster_path;

      let htmlSegment = `
    <li class='item' data-id='${id}'>
      <div class='image'><img src="${baseurl}${w500}${img}"></div>
      <div class='meta'>
        <div class='meta-des'><p>${date.substring(0, date.length - 6)}</p><span></span><p>Movie</p></div>
        <h2 class='meta-title'>${title}</h2>
      </div>
    </li>`;
      html += htmlSegment;
    });

    const h1 = document.createElement("h1");
    h1.innerHTML = `<h1 class="movies-title">Results for "${query}"</h1>`;
    document.querySelector(".container").appendChild(h1);

    const ul = document.createElement("ul");
    ul.classList.add("movies");
    document.querySelector(".container").appendChild(ul);
    ul.innerHTML = html;
  }
}

export default renderQuery;
