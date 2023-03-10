import { apiKey, baseurl, w500 } from "./api";

function renderMovieDetail(id) {
  (async function getData() {
    const movieDetailApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const movieCreditsApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
    const responses = await Promise.all([fetch(movieDetailApi), fetch(movieCreditsApi)]);
    const movieDetail = await responses[0].json();
    const movieCredits = await responses[1].json();

    showMovieDetail(movieDetail, movieCredits);
  })();

  function showMovieDetail(data, credits) {
    const img = data.poster_path;
    const title = data.title;
    const tagline = data.tagline;
    const vote = data.vote_average.toFixed(1);
    const lenght = data.runtime;
    const date = data.release_date;
    const status = data.status;
    const genres = Object.values(data.genres).map((genre) => genre.name) || []; // array
    const genresTemplate = genres
      .map((genre) => {
        return `<li>${genre}</li>`;
      })
      .join(" ");
    const overview = data.overview;
    const cast = Object.values(credits.cast).map((actor) => actor.name) || []; // array
    const castTemplate = cast
      .map((actor) => {
        return `<li>${actor}</li>`;
      })
      .join(" ");

    let html = `
    <section class="movie-detail">
    <div class="movie-detail__img"><img src="${baseurl}${w500}${img}" alt="${title}"></div>
    <div class="movie-detail__wrapper">
      <h1 class="movie-detail__title">${title}</h1>
      <p class="movie-detail__short-des">${tagline}</p>
      <div class="movie-detail__vote-average">${vote}</div>
      <div class="movie-detail__meta">
        <div class="movie-detail__length"><span>Length</span>${lenght} min.</div>
        <div class="movie-detail__language"><span>Language</span>English</div>
        <div class="movie-detail__year"><span>Year</span>${date.substring(0, date.length - 6)}</div>
        <div class="movie-detail__status"><span>Status</span>${status}</div>
      </div>
      <div class="movie-detail__genres"><span>Genres</span><ul>${genresTemplate}</ul></div>
      <p class="movie-detail__des"><span>Overview</span>${overview}</p>
      <div class="movie-detail__cast"><span>Actors</span><ul>${castTemplate}</ul></div>
    </div>
    </section>`;

    const div = document.createElement("div");
    div.classList.add("movies");
    document.querySelector(".container").appendChild(div);
    div.innerHTML = html;
  }
}

export default renderMovieDetail;
