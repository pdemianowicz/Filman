// Import modules
import { apiKey, baseurl, w500 } from "./modules/api";
import showSearch from "./modules/showSearch";
import renderSection from "./modules/renderSection";
import renderMovies from "./modules/renderMovies";
import showTrending from "./modules/showTrending";
import clear from "./modules/clear";
import renderMovieDetail from "./modules/renderMovieDetail";
import { genresMovie, genresTv } from "./modules/genres";
import renderQuery from "./modules/getData";

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
showSearch();

document.querySelector("form").addEventListener("click", (e) => {
  e.preventDefault();

  const input = document.querySelector("form input[type='search']");

  // input.addEventListener("keyup", () => {
  //   const searchText = input.value.toLowerCase();
  //   console.log(searchText);

  //   clear();
  //   renderQuery(searchText);
  // });

  input.addEventListener("keypress", (e) => {
    const searchText = input.value.toLowerCase();
    console.log(searchText);

    if (e.key === "Enter") {
      clear();
      showSearch();
      renderQuery(searchText);
    }
  });
});

mainApp();

function renderDetailCard() {
  const items = document.querySelectorAll(".item");
  items.forEach((e) => {
    e.addEventListener("click", (event) => {
      const key = event.currentTarget;
      const keyValue = key.textContent;
      const type = key.dataset.id;

      clear();
      showSearch();
      renderMovieDetail(type);
    });
  });
}

document.querySelector(".nav__icon-main").addEventListener("click", () => {
  clear();
  showSearch();
  mainApp();
});

document.querySelector(".nav__icon-movie").addEventListener("click", () => {
  clear();
  showSearch();
  genresMovie();
});

document.querySelector(".nav__icon-tv").addEventListener("click", () => {
  clear();
  showSearch();
  genresTv();
});
