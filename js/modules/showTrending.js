import renderSection from "./renderSection";
import renderMovies from "./renderMovies";
import swiperSlider from "./swiperSlider";

function showTrending(data) {
  const div = document.createElement("div");
  div.classList.add("swiper", "mySwiper");
  const ul = document.createElement("ul");
  ul.classList.add("swiper-wrapper");
  const type = document.querySelector(".mySwiper") ? "TV Series" : "Movies";
  renderSection("Trending", type).appendChild(div);

  div.appendChild(ul);
  ul.innerHTML = renderMovies(data);

  const movies = document.querySelectorAll(".mySwiper ul li");
  movies.forEach((movie) => {
    movie.classList.remove("item");
    movie.classList.add("swiper-slide");
  });

  swiperSlider();
}

export default showTrending;
