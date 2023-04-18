// Import modules
import { apiKey, baseurl, w500 } from "./modules/api";
import clear from "./modules/clear";
import showSearch from "./modules/showSearch";
import renderSection from "./modules/renderSection";
import renderMovies from "./modules/renderMovies";
import showTrending from "./modules/showTrending";
import renderDetail from "./modules/renderMovieDetail";
import showGenres from "./modules/showGenres";

function mainApp() {
  (async function getData() {
    const trendingMoviesApi = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const popularMoviesApi = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const topRatedMoviesApi = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

    const trendingTvApi = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
    const popularTvApi = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
    const topRatedTvApi = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`;
    const airingTodayTvApi = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`;

    const responses = await Promise.all([
      fetch(trendingMoviesApi),
      fetch(popularMoviesApi),
      fetch(topRatedMoviesApi),
      fetch(trendingTvApi),
      fetch(popularTvApi),
      fetch(topRatedTvApi),
      fetch(airingTodayTvApi),
    ]);

    const trendingMovies = await responses[0].json();
    const popularMovies = await responses[1].json();
    const topRatedMovies = await responses[2].json();
    const trendingTv = await responses[3].json();
    const popularTv = await responses[4].json();
    const topRatedTv = await responses[5].json();
    const airingTodayTv = await responses[6].json();

    showTrending(trendingMovies);
    showPopularMovies(popularMovies);
    showTopRatedMovies(topRatedMovies);
    showTrending(trendingTv);
    showPopularTv(popularTv);
    showTopRatedTv(topRatedTv);
    showAiringTodayTv(airingTodayTv);
    renderDetailCard();
  })();

  function showPopularMovies(data) {
    const ul = document.createElement("ul");
    ul.classList.add("standard");
    renderSection("Popular", "Movie").appendChild(ul);
    ul.innerHTML = renderMovies(data);
  }

  function showTopRatedMovies(data) {
    const ul = document.createElement("ul");
    ul.classList.add("standard");
    renderSection("Top Rated", "Movie").appendChild(ul);
    ul.innerHTML = renderMovies(data);
  }

  function showPopularTv(data) {
    const ul = document.createElement("ul");
    ul.classList.add("standard");
    renderSection("Popular", "Tv series").appendChild(ul);
    ul.innerHTML = renderMovies(data);
  }

  function showTopRatedTv(data) {
    const ul = document.createElement("ul");
    ul.classList.add("standard");
    renderSection("Top Rated", "Tv series").appendChild(ul);
    ul.innerHTML = renderMovies(data);
  }

  function showAiringTodayTv(data) {
    const ul = document.createElement("ul");
    ul.classList.add("standard");
    renderSection("Airing Today", "Tv series").appendChild(ul);
    ul.innerHTML = renderMovies(data);
  }
}

const buttons = document.querySelectorAll(".nav__main-nav div");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const btnValue = btn.id;
    activateClickedButton(btn);

    clear();
    showSearch();
    btnValue !== "btn-main" ? (btnValue !== "btn-movie" ? showGenres("tv") : showGenres("movie")) : mainApp();
  });
});

function activateClickedButton(btn) {
  buttons.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}
buttons[0].click(); // default active main button

function see(data) {
  document.querySelectorAll(".section__see-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      clear();
      showSearch();
      render2(data);
    });
  });
}

function render2(data) {
  let movies = data.results;
  movies = movies ? movies.filter((item) => item.backdrop_path !== null) : []; // check img
  let html = "";

  movies.forEach((movie) => {
    const id = movie.id;
    const title = movie.title || movie.name;
    const date = movie.release_date || movie.first_air_date || " ";
    const img = movie.backdrop_path || [];

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
  h1.innerHTML = `<h1 class="movies-title">Results for "</h1>`;
  document.querySelector(".container").appendChild(h1);

  const ul = document.createElement("ul");
  ul.classList.add("movies");
  document.querySelector(".container").appendChild(ul);
  ul.innerHTML = html;
}

function renderDetailCard() {
  const items = document.querySelectorAll("li[data-id]");
  items.forEach((e) => {
    e.addEventListener("click", (event) => {
      const key = event.currentTarget;
      const keyValue = key.textContent;
      const id = key.dataset.id;
      const type = e.querySelector(".meta-type").innerHTML !== "TV Series" ? "movie" : "tv";

      clear();
      showSearch();
      renderDetail(id, type);
    });
  });
}
