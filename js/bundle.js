!function(){"use strict";const e="775f0b592f7bde9f85571bb76b8f965d",t="https://image.tmdb.org/t/p/",a="w500";var n=function(){const e=document.createElement("form");e.classList.add("search"),e.innerHTML='\n  <input type="search" name="search" id="search" placeholder="Search for movies or TV series" />\n  <input type="submit" value="Search" />\n  ',document.querySelector(".container").appendChild(e)},i=function(e,t){const a=document.createElement("section");return a.classList.add("section"),a.innerHTML=`\n  <div class="section-wrap">\n    <div class="section__title">\n    <h2>${e}</h2>\n    <span>${t}</span>\n    </div>\n    <a class="section__see-more" href="#">See more</a>\n  </div>`,document.querySelector(".container").appendChild(a),a},s=function(e){let n=e.results,i="";return n.slice(0,6).forEach((e=>{const n=e.id,s=e.title||e.name,o=e.release_date||e.first_air_date,c=e.backdrop_path,d=e.release_date?"Movie":"TV Series",l=e.release_date?'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" fill="currentColor"/></svg>':'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" fill="currentColor"/></svg>';let r=`\n    <li class='item' data-id='${n}'>\n      <div class='image'><img src="${t}${a}${c}"></div>\n      <div class='meta'>\n        <div class='meta-des'><p>${o.substring(0,o.length-6)}</p><span></span>${l}<p>${d}</p></div>\n        <h2 class='meta-title'>${s}</h2>\n      </div>\n    </li>`;i+=r})),i},o=function(e){const t=document.createElement("div");t.classList.add("swiper","mySwiper");const a=document.createElement("ul");a.classList.add("swiper-wrapper");const n=document.querySelector(".mySwiper")?"TV Series":"Movies";i("Trending",n).appendChild(t),t.appendChild(a),a.innerHTML=s(e),document.querySelectorAll(".mySwiper ul li").forEach((e=>{e.classList.remove("item"),e.classList.add("swiper-slide")})),new Swiper(".mySwiper",{slidesPerView:1,spaceBetween:20,freeMode:{enabled:!1},pagination:{enabled:!1},paginationDisabledClass:"swiper-pagination-disabled",breakpoints:{768:{slidesPerView:"auto",spaceBetween:40,pagination:{enabled:!1},freeMode:{enabled:!0}}}})},c=function(){document.querySelector(".container").innerHTML=" "},d=function(n){!async function(){const i=`https://api.themoviedb.org/3/movie/${n}?api_key=${e}&language=en-US`,s=`https://api.themoviedb.org/3/movie/${n}/credits?api_key=${e}&language=en-US`,o=await Promise.all([fetch(i),fetch(s)]);!function(e,n){const i=e.poster_path,s=e.title,o=e.tagline,c=e.vote_average.toFixed(1),d=e.runtime,l=e.release_date,r=e.status,p=(Object.values(e.genres).map((e=>e.name))||[]).map((e=>`<li>${e}</li>`)).join(" "),v=e.overview,m=(Object.values(n.cast).map((e=>e.name))||[]).map((e=>`<li>${e}</li>`)).join(" ");let h=`\n    <section class="movie-detail">\n    <div class="movie-detail__img"><img src="${t}${a}${i}" alt="${s}"></div>\n    <div class="movie-detail__wrapper">\n      <h1 class="movie-detail__title">${s}</h1>\n      <p class="movie-detail__short-des">${o}</p>\n      <div class="movie-detail__vote-average">${c}</div>\n      <div class="movie-detail__meta">\n        <div class="movie-detail__length"><span>Length</span>${d} min.</div>\n        <div class="movie-detail__language"><span>Language</span>English</div>\n        <div class="movie-detail__year"><span>Year</span>${l.substring(0,l.length-6)}</div>\n        <div class="movie-detail__status"><span>Status</span>${r}</div>\n      </div>\n      <div class="movie-detail__genres"><span>Genres</span><ul>${p}</ul></div>\n      <p class="movie-detail__des"><span>Overview</span>${v}</p>\n      <div class="movie-detail__cast"><span>Actors</span><ul>${m}</ul></div>\n    </div>\n    </section>`;const u=document.createElement("div");u.classList.add("movies"),document.querySelector(".container").appendChild(u),u.innerHTML=h}(await o[0].json(),await o[1].json())}()},l=function(i){let s=i.genres,o="";s.forEach((e=>{let t=`<a data-id="${e.id}" class="genres__item">${e.name}</a>`;o+=t}));const d=document.createElement("div");d.classList.add("genres"),document.querySelector(".container").appendChild(d),d.innerHTML=o,d.addEventListener("click",(i=>{const s=i.target,o=s.textContent,d=s.dataset.id;var l,r;c(),n(),l=o,r=d,async function(){const n=`https://api.themoviedb.org/3/discover/movie?api_key=${e}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${r}&with_watch_monetization_types=flatrate`,i=await fetch(n);!function(e){console.log(e);let n=e.results,i="";n.forEach((e=>{const n=e.title,s=e.release_date,o=e.backdrop_path;let c=`\n      <li class='item'>\n        <div class='image'><img src="${t}${a}${o}"></div>\n        <div class='meta'>\n          <div class='meta-des'><p>${s.substring(0,s.length-6)}</p><span></span><svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" fill="currentColor"/></svg><p>Movie</p></div>\n          <h2 class='meta-title'>${n}</h2>\n        </div>\n      </li>`;i+=c}));const s=document.createElement("h1");s.innerHTML=`<h1 class="movies-title">${l}</h1>`,document.querySelector(".container").appendChild(s);const o=document.createElement("ul");o.classList.add("movies"),document.querySelector(".container").appendChild(o),o.innerHTML=i}(await i.json())}()}))};function r(){!async function(){const t=`https://api.themoviedb.org/3/trending/movie/day?api_key=${e}`,a=`https://api.themoviedb.org/3/movie/popular?api_key=${e}`,l=`https://api.themoviedb.org/3/movie/top_rated?api_key=${e}`,r=`https://api.themoviedb.org/3/trending/tv/day?api_key=${e}`,p=`https://api.themoviedb.org/3/tv/popular?api_key=${e}`,v=`https://api.themoviedb.org/3/tv/top_rated?api_key=${e}`,m=`https://api.themoviedb.org/3/tv/airing_today?api_key=${e}`,h=await Promise.all([fetch(t),fetch(a),fetch(l),fetch(r),fetch(p),fetch(v),fetch(m)]),u=await h[0].json(),g=await h[1].json(),_=await h[2].json(),f=await h[3].json(),w=await h[4].json(),$=await h[5].json(),y=await h[6].json();o(u),function(e){const t=document.createElement("ul");t.classList.add("standard"),i("Popular","Movie").appendChild(t),t.innerHTML=s(e)}(g),function(e){const t=document.createElement("ul");t.classList.add("standard"),i("Top Rated","Movie").appendChild(t),t.innerHTML=s(e)}(_),o(f),function(e){const t=document.createElement("ul");t.classList.add("standard"),i("Popular","Tv series").appendChild(t),t.innerHTML=s(e)}(w),function(e){const t=document.createElement("ul");t.classList.add("standard"),i("Top Rated","Tv series").appendChild(t),t.innerHTML=s(e)}($),function(e){const t=document.createElement("ul");t.classList.add("standard"),i("Airing Today","Tv series").appendChild(t),t.innerHTML=s(e)}(y),document.querySelectorAll(".item").forEach((e=>{e.addEventListener("click",(e=>{const t=e.currentTarget,a=(t.textContent,t.dataset.id);c(),n(),d(a)}))}))}()}n(),document.querySelector("form").addEventListener("click",(i=>{i.preventDefault();const s=document.querySelector("form input[type='search']");s.addEventListener("keypress",(i=>{const o=s.value.toLowerCase();var d;console.log(o),"Enter"===i.key&&(c(),n(),d=o,async function(){const n=`https://api.themoviedb.org/3/search/multi?api_key=${e}&language=en-US&query=${d}&page=1&include_adult=false`,i=await Promise.all([fetch(n)]);!function(e){let n=e.results;n=n?n.filter((e=>"person"!==e.media_type)):[],n=n?n.filter((e=>null!==e.backdrop_path||null!==e.poster_path)):[];let i="";console.log(n),n.forEach((e=>{const n=e.id,s=e.title||e.name,o=e.release_date||e.first_air_date||" ",c=e.backdrop_path||e.poster_path;let d=`\n    <li class='item' data-id='${n}'>\n      <div class='image'><img src="${t}${a}${c}"></div>\n      <div class='meta'>\n        <div class='meta-des'><p>${o.substring(0,o.length-6)}</p><span></span><p>Movie</p></div>\n        <h2 class='meta-title'>${s}</h2>\n      </div>\n    </li>`;i+=d}));const s=document.createElement("h1");s.innerHTML=`<h1 class="movies-title">Results for "${d}"</h1>`,document.querySelector(".container").appendChild(s);const o=document.createElement("ul");o.classList.add("movies"),document.querySelector(".container").appendChild(o),o.innerHTML=i}(await i[0].json())}())}))})),r(),document.querySelector(".nav__icon-main").addEventListener("click",(()=>{c(),n(),r()})),document.querySelector(".nav__icon-movie").addEventListener("click",(()=>{c(),n(),async function(){const t=`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}&language=en-US`,a=await fetch(t),n=await a.json();l(n)}()})),document.querySelector(".nav__icon-tv").addEventListener("click",(()=>{c(),n(),async function(){const t=`https://api.themoviedb.org/3/genre/tv/list?api_key=${e}&language=en-US`,a=await fetch(t),n=await a.json();l(n)}()}))}();