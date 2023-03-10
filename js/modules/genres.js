import { apiKey } from "./api";
import showGenres from "./showGenres";

function genresMovie() {
  (async function getData() {
    const genresMovieApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    const responses = await fetch(genresMovieApi);
    const genresMovie = await responses.json();
    showGenres(genresMovie);
  })();
}

function genresTv() {
  (async function getData() {
    const genresTvApi = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
    const responses = await fetch(genresTvApi);
    const genresTv = await responses.json();
    showGenres(genresTv);
  })();
}

export { genresMovie, genresTv };
