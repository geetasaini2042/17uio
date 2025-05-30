// API Config const apiKey = "8723ad7aaba98483edee474a2abc3c80"; const imageBase = "https://image.tmdb.org/t/p/w500"; const placeholderImg = "https://via.placeholder.com/300x450?text=No+Image";

let nowPlayingMovies = [];

// Fetch Hindi Now Playing Movies async function fetchHindiNowPlaying() { const res = await fetch(https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=hi-IN&page=1); const data = await res.json(); return data.results.filter(movie => movie.original_language === "hi"); }

// Fetch 2025 Movies async function fetch2025Movies() { const res = await fetch(https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&primary_release_year=2025&page=1); const data = await res.json(); return data.results; }

// Create Carousel Cardunction createCarouselCard(movie) { const card = document.createElement("div"); card.className = "carousel-card";

const img = document.createElement("img"); img.src = movie.poster_path ? imageBase + movie.poster_path : placeholderImg;

const title = document.createElement("div"); title.className = "carousel-title"; title.textContent = movie.title;

const button = document.createElement("a"); button.className = "play-now-btn"; button.href = Search/stream.html?id=${movie.id}; button.textContent = "▶ Play Now";

card.appendChild(img); card.appendChild(title); card.appendChild(button);

return card; }

// Update Dots function updateDots(currentIndex) { document.querySelectorAll(".carousel-dot").forEach((dot, idx) => { dot.classList.toggle("active", idx === currentIndex); }); }

// Build Now Playing Carousel async function buildNowPlayingCarousel() { let movies = await fetchHindiNowPlaying();

if (movies.length < 7) { const moreMovies = await fetch2025Movies(); for (let i = 0; i < 7 - movies.length && i < moreMovies.length; i++) { movies.push(moreMovies[i]); } }

nowPlayingMovies = movies.slice(0, 7); const container = document.getElementById("nowPlaying"); const dotsContainer = document.getElementById("carouselDots");

nowPlayingMovies.forEach((movie, index) => { container.appendChild(createCarouselCard(movie));

const dot = document.createElement("span");
dot.className = "carousel-dot";
dot.onclick = () => {
  scrollToCard(index);
  updateDots(index);
};
dotsContainer.appendChild(dot);

});

updateDots(0); autoScroll(); addScrollListener(); }

// Scroll to Card function scrollToCard(index) { const container = document.getElementById("nowPlaying"); const cardWidth = container.offsetWidth; container.scrollTo({ left: cardWidth * index, behavior: "smooth" }); }

// Auto Scroll function autoScroll() { let currentIndex = 0; setInterval(() => { currentIndex = (currentIndex + 1) % nowPlayingMovies.length; scrollToCard(currentIndex); updateDots(currentIndex); }, 3000); }

// Update dot on manual scroll function addScrollListener() { const container = document.getElementById("nowPlaying"); container.addEventListener("scroll", () => { const index = Math.round(container.scrollLeft / container.offsetWidth); updateDots(index); }); }

// Search Handling document.addEventListener("DOMContentLoaded", () => { buildNowPlayingCarousel();

const searchInput = document.getElementById("searchInput"); const doneButton = document.getElementById("doneButton");

function searchRedirect() { const query = searchInput.value.trim(); if (query) { window.location.href = search/index.html?query=${encodeURIComponent(query)}; } }

if (searchInput) { searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") searchRedirect(); }); }

if (doneButton) { doneButton.addEventListener("click", searchRedirect); } });

