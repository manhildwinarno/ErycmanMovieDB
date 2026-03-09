const search = document.getElementById("search-input");
const modalWrapper = document.getElementById("modal-wrapper");
const modalBackdrop = document.getElementById("modal-backdrop");

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

const debounceSearch = debounce(searchMovie, 500);

search.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});


function searchMovie() {

  fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${search.value}`)
    .then(response => response.json())
    .then(response => {
      const movies = response.Search;
      const movieContainer = document.querySelector(".movie-container");
      movies.forEach(m => {
        movieContainer.innerHTML += 
        `<div class="bg-gray-200 flex flex-col w-full rounded-lg shadow-sm overflow-hidden pb-3">
          <a href="#" class="w-full flex-shrink-0 bg-gray-300 aspect-[2/3] block">
            <img class="w-full h-full object-cover object-center block" src="${m.Poster}" alt="${m.Title} Poster"/>
          </a>
          <div class="pt-3 px-3 flex flex-col flex-grow text-center">
            <h4 class="text-sm md:text-base font-semibold tracking-tight text-gray-900 line-clamp-2 mb-1">${m.Title}</h4>
            <p class="text-xs md:text-sm text-gray-700 mb-2">${m.Year}</p>
            <button data-imdbid="${m.imdbID}" class="open-modal-detail mt-auto text-xs text-black border border-gray-400 py-1.5 px-3 rounded hover:bg-gray-300 font-medium transition-colors cursor-pointer">Read more</button>
          </div>
        </div>`
        search.value = "";
      });

      const openModalBtn = document.querySelectorAll(".open-modal-detail");
      openModalBtn.forEach(btn => {
        btn.addEventListener("click", function() {
          const imdbid = this.dataset.imdbid;
          fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbid}`)
            .then(response => response.json())
            .then(m => {
              const modalContainer = document.querySelector(".modal-body");
              let formattedRuntime = m.Runtime;
              if (m.Runtime && m.Runtime !== "N/A") {
                const totalMenit = parseInt(m.Runtime); 
                
                if (!isNaN(totalMenit)) {
                  const jam = Math.floor(totalMenit / 60);
                  const menit = totalMenit % 60;
                  
                  if (jam > 0 && menit > 0) {
                    formattedRuntime = `${jam} hour ${menit} min`;
                  } else if (jam > 0 && menit === 0) {
                    formattedRuntime = `${jam} hour`;
                  } else {
                    formattedRuntime = `${menit} min`;
                  }
                }
              }
              modalContainer.innerHTML =
              `<div class="flex flex-col w-3/4 md:w-1/3 flex-shrink-0 gap-4">
              <img class="w-full h-auto object-cover rounded shadow border border-gray-200" src="${m.Poster}" alt="${m.Title} Poster">
              <button id="watchlist-modal-button" class="w-full bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 rounded transition-colors shadow-sm cursor-pointer">
                Watch List
              </button>
              </div>
              <div class="flex flex-col text-center md:text-left w-full md:w-2/3 gap-4">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  <h4 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">${m.Title}</h4>
                  <a href="https://www.imdb.com/title/${m.imdbID}" target="_blank" class="inline-block flex-shrink-0 mx-auto md:mt-1.5 lg:mt-3 md:mx-0">
                    <button class="border border-gray-400 text-gray-800 text-xs font-bold py-1 px-2 rounded flex items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                      IMDB ${m.Ratings && m.Ratings.length > 0 ? m.Ratings[0].Value.split('/')[0] : 'N/A'}<span class="opacity-70 font-normal">/10</span>
                    </button>
                  </a>
                </div>
                <div class="flex flex-wrap justify-center md:justify-start items-center text-[11px] md:text-xs lg:text-sm text-gray-600 gap-1.5 font-medium">
                  <span>${m.Rated}</span>
                  <span>|</span>
                  <span>${formattedRuntime}</span>
                  <span>|</span>
                  <span>${m.Genre}</span>
                  <span>|</span>
                  <span>${m.Year}</span>
                </div>
                <p class="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed border-t border-b border-gray-100 py-3 my-1">${m.Plot}</p>
                <div class="flex flex-col text-[11px] md:text-xs lg:text-sm text-gray-800 gap-2 text-left">
                  <p><span class="font-bold text-gray-900">Director:</span> ${m.Director}</p>
                  <p><span class="font-bold text-gray-900">Writers:</span> ${m.Writer}</p>
                  <p><span class="font-bold text-gray-900">Actors:</span> ${m.Actors}</p>
                  <p><span class="font-bold text-gray-900">Language:</span> ${m.Language}</p>
                </div>
              </div>`
              modalWrapper.classList.remove("hidden");
              document.body.style.overflow = "hidden";
            });
          
        });
      });

    });

}

modalBackdrop.addEventListener("click", function() {
  modalWrapper.classList.add("hidden");
  document.body.style.overflow = "auto";
});