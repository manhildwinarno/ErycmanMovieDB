const searchInput = document.querySelectorAll(".search-input");
const searchContainer = document.querySelector(".search-container");
const homeContainer = document.querySelector(".home-container");
const movieContainer = document.querySelector(".movie-container");
const watchlistTitle = document.querySelector(".watchlist-section-title");

const modalWrapper = document.getElementById("modal-wrapper");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalBody = document.querySelector(".modal-body");

const baseURL = "https://omdbapi.com";

// watchlists crud

function getWatchlists() {
  return JSON.parse(localStorage.getItem("watchlists")) || [];
}

function saveWatchlists(watchlists) {
  localStorage.setItem("watchlists", JSON.stringify(watchlists));
}

function isInWatchlist(imdbID) {
  return getWatchlists().some(movie => movie.imdbID === imdbID);
}

function addToWatchlist(movie) {
  const watchlists = getWatchlists();
  if (!isInWatchlist(movie.imdbID)) {
    watchlists.push(movie);
    saveWatchlists(watchlists);
  }
}

function removeFromWatchlist(imdbID) {
  const watchlists = getWatchlists().filter(movie => movie.imdbID !== imdbID);
  saveWatchlists(watchlists);
}

// WATCHLIST PAGE

const watchlistsPage = document.getElementById("favourites");
watchlistsPage.addEventListener("click", function (e) {
  e.preventDefault();
  showWatchlistsPage();
});

function showWatchlistsPage() {
  const watchlists = getWatchlists();

  homeContainer.classList.add("hidden");
  searchContainer.classList.remove("hidden");

  // Update section title
  const sectionTitle = document.querySelector(".watchlist-section-title");
  if (sectionTitle) sectionTitle.textContent = "Watchlists";

  if (watchlists.length === 0) {
    movieContainer.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <i class="fa-regular fa-bookmark text-5xl"></i>
        <p class="text-lg font-medium">Your watchlist is empty</p>
        <p class="text-sm">Search for movies and add them to your watchlist</p>
      </div>
    `;
  } else {
    movieContainer.innerHTML = watchlists.map(movie => makeWatchlistCard(movie)).join("");
    attachWatchlistCardListeners();
  }
}

function makeWatchlistCard(movie) {
  return `
  <div class="bg-gray-200 flex flex-col w-full rounded-lg shadow-sm overflow-hidden pb-3" data-imdbid="${movie.imdbID}">
    <a href="#" class="w-full flex-shrink-0 bg-gray-300 aspect-[2/3] block open-modal-detail" data-imdbid="${movie.imdbID}">
      <img class="w-full h-full object-cover object-center block" src="${movie.Poster}" alt="${movie.Title} Poster"/>
    </a>
    <div class="pt-3 px-3 flex flex-col flex-grow text-center">
      <h4 class="text-sm md:text-base font-semibold tracking-tight text-gray-900 line-clamp-2 mb-1">${movie.Title}</h4>
      <p class="text-xs md:text-sm text-gray-700 mb-2">${movie.Year}</p>
      <div class="mt-auto flex gap-2">
        <button data-imdbid="${movie.imdbID}" class="open-modal-detail flex-1 text-xs text-black border border-gray-400 py-1.5 px-3 rounded hover:bg-gray-300 font-medium transition-colors cursor-pointer">Read more</button>
        <button data-imdbid="${movie.imdbID}" class="remove-watchlist text-xs text-red-500 border border-red-300 py-1.5 px-3 rounded hover:bg-red-50 font-medium transition-colors cursor-pointer" title="Remove from watchlist">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  `;
}

function attachWatchlistCardListeners() {
  // Open modal
  document.querySelectorAll(".open-modal-detail").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      getMovieDetail(btn.dataset.imdbid);
    });
  });

  // Remove from watchlist
  document.querySelectorAll(".remove-watchlist").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromWatchlist(btn.dataset.imdbid);
      // Remove card from DOM
      const card = movieContainer.querySelector(`[data-imdbid="${btn.dataset.imdbid}"]`);
      if (card) card.remove();

      // Show empty state if none left
      if (getWatchlists().length === 0) {
        movieContainer.innerHTML = `
          <div class="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <i class="fa-regular fa-bookmark text-5xl"></i>
            <p class="text-lg font-medium">Your watchlist is empty</p>
            <p class="text-sm">Search for movies and add them to your watchlist</p>
          </div>
        `;
      }
    });
  });
}

// search
searchInput.forEach(input => {
  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      getMovies(input.value.trim());
    }
  });
});

// fetch

async function fetchData(params) {
  const url = new URL(baseURL);
  url.searchParams.set("apikey", OMDB_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}

// get movies

async function getMovies(keyword) {
  try {
    const data = await fetchData({ s: keyword });

    homeContainer.classList.add("hidden");
    searchContainer.classList.remove("hidden");

    // Restore section title to "Search Results"
    const sectionTitle = document.querySelector(".watchlist-section-title");
    if (sectionTitle) sectionTitle.textContent = "Search Results";

    const moviecards = data.Search.map(movie => makeMovieCards(movie)).join("");
    movieContainer.innerHTML = moviecards;

    modalEventListener();

  } catch (error) {
    homeContainer.classList.add("hidden");
    searchContainer.classList.remove("hidden");
    movieContainer.innerHTML = errorMessage(keyword);
  } finally {
    searchInput.forEach(input => input.value = "");
  }
}

// Modal event listener

function modalEventListener() {
  const openModalBtn = document.querySelectorAll(".open-modal-detail");

  openModalBtn.forEach(button => {
    button.addEventListener("click", () => {
      const imdbID = button.dataset.imdbid;
      getMovieDetail(imdbID);
    });
  });
}

// modal detail

async function getMovieDetail(imdbID) {
  try {
    const movie = await fetchData({ i: imdbID });
    modalBody.innerHTML = makeModalDetail(movie);
    modalWrapper.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    updateWatchlistButton(imdbID);

    const watchlistButton = document.getElementById("watchlist-modal-button");
    watchlistButton.addEventListener("click", function () {
      if (isInWatchlist(imdbID)) {
        // REMOVE
        removeFromWatchlist(imdbID);
        setWatchlistButtonDefault(watchlistButton);
      } else {
        // ADD
        addToWatchlist(movie);
        setWatchlistButtonSaved(watchlistButton);
      }
    });

  } catch (error) {
    movieContainer.innerHTML = errorMessage(imdbID);
    modalWrapper.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

// watchlists button state

function updateWatchlistButton(imdbID) {
  const btn = document.getElementById("watchlist-modal-button");
  if (!btn) return;
  if (isInWatchlist(imdbID)) {
    setWatchlistButtonSaved(btn);
  } else {
    setWatchlistButtonDefault(btn);
  }
}

function setWatchlistButtonSaved(btn) {
  btn.innerHTML = `<i class="fa-solid fa-bookmark mr-2 text-cyan-500"></i> Saved to Watchlist`;
  btn.classList.remove("bg-white", "border-gray-400", "text-gray-800", "hover:bg-gray-100");
  btn.classList.add("bg-cyan-50", "border-cyan-400", "text-cyan-700", "hover:bg-cyan-100");
}

function setWatchlistButtonDefault(btn) {
  btn.innerHTML = `<i class="fa-regular fa-bookmark mr-2"></i> Watch List`;
  btn.classList.remove("bg-cyan-50", "border-cyan-400", "text-cyan-700", "hover:bg-cyan-100");
  btn.classList.add("bg-white", "border-gray-400", "text-gray-800", "hover:bg-gray-100");
}

// modal close button
modalBackdrop.addEventListener("click", closeModal);

function closeModal() {
  modalWrapper.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// error

function errorMessage(message) {
  return `<p class="col-span-full font-semibold text-lg text-red-500 text-center py-14">Movie or Serial <span class="font-bold">${message}</span> is not found</p>`;
}

function makeMovieCards(movie) {
  return `
  <div class="bg-gray-200 flex flex-col w-full rounded-lg shadow-sm overflow-hidden pb-3">
    <a href="#" class="w-full flex-shrink-0 bg-gray-300 aspect-[2/3] block">
      <img class="w-full h-full object-cover object-center block" src="${movie.Poster}" alt="${movie.Title} Poster"/>
    </a>
    <div class="pt-3 px-3 flex flex-col flex-grow text-center">
      <h4 class="text-sm md:text-base font-semibold tracking-tight text-gray-900 line-clamp-2 mb-1">${movie.Title}</h4>
      <p class="text-xs md:text-sm text-gray-700 mb-2">${movie.Year}</p>
      <button data-imdbid="${movie.imdbID}" class="open-modal-detail mt-auto text-xs text-black border border-gray-400 py-1.5 px-3 rounded hover:bg-gray-300 font-medium transition-colors cursor-pointer">Read more</button>
    </div>
  </div>
  `;
}

function makeModalDetail(movie) {
  return `
  <div class="flex flex-col w-3/4 md:w-1/3 flex-shrink-0 gap-4">
    <img class="w-full h-auto object-cover rounded shadow border border-gray-200" src="${movie.Poster}" alt="${movie.Title} Poster">
    <button id="watchlist-modal-button" class="w-full bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 rounded transition-colors shadow-sm cursor-pointer flex items-center justify-center">
      <i class="fa-regular fa-bookmark mr-2"></i> Watch List
    </button>
  </div>
  <div class="flex flex-col text-center md:text-left w-full md:w-2/3 gap-4">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
      <h4 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">${movie.Title}</h4>
      <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="inline-block flex-shrink-0 mx-auto md:mt-1.5 lg:mt-3 md:mx-0">
        <button class="border border-gray-400 text-gray-800 text-xs font-bold py-1 px-2 rounded flex items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
          IMDB ${movie.Ratings && movie.Ratings.length > 0 ? movie.Ratings[0].Value.split('/')[0] : 'N/A'}<span class="opacity-70 font-normal">/10</span>
        </button>
      </a>
    </div>
    <div class="flex flex-wrap justify-center md:justify-start items-center text-[11px] md:text-xs lg:text-sm text-gray-600 gap-1.5 font-medium">
      <span>${movie.Rated}</span>
      <span>|</span>
      <span>${movie.Runtime}</span>
      <span>|</span>
      <span>${movie.Genre}</span>
      <span>|</span>
      <span>${movie.Year}</span>
    </div>
    <p class="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed border-t border-b border-gray-100 py-3 my-1">${movie.Plot}</p>
    <div class="flex flex-col text-[11px] md:text-xs lg:text-sm text-gray-800 gap-2 text-left">
      <p><span class="font-bold text-gray-900">Director:</span> ${movie.Director}</p>
      <p><span class="font-bold text-gray-900">Writers:</span> ${movie.Writer}</p>
      <p><span class="font-bold text-gray-900">Actors:</span> ${movie.Actors}</p>
      <p><span class="font-bold text-gray-900">Language:</span> ${movie.Language}</p>
    </div>
  </div>
  `;
}