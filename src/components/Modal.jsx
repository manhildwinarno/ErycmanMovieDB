import { FaBookmark } from "react-icons/fa";
import { useMovieContext } from "../contexts/useContext";

function Modal ({ movie, onClose }) {
  if (!movie) return null
  console.log(movie)
  return (
    <div id="modal-wrapper" className="fixed z-[150] inset-0">
      <div id="modal-backdrop" className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8 pointer-events-none">
        <div className="bg-white rounded-xl max-w-[340px] md:max-w-3xl lg:max-w-4xl w-full relative p-6 md:p-8 pointer-events-auto max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl">
          <div className="modal-body flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
            <ModalDetail movie={movie}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModalDetail({ movie }) {
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
  const favorite = isFavorite(movie.id)

  function handleFavorite(e) {
    e.preventDefault()
    if(favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }

  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return Number(rating).toFixed(1);
  }

  function runtime(time) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    if (hour === 0) return `${minute}m`;
    if (minute === 0) return `${hour}h`;
    return `${hour}h ${minute}m`;
  }

  return (
    <>
      <div className="flex flex-col w-3/4 md:w-1/3 shrink-0 gap-4">
        <img 
          className="w-full h-auto object-cover rounded shadow border border-gray-200 min-h-[300px] bg-gray-100" 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} 
          alt={movie.title}
        />
        <button id="watchlist-modal-button" className={`w-full border text-sm font-semibold py-2 px-4 rounded transition-colors shadow-sm cursor-pointer flex items-center justify-center text-gray-800 ${favorite ? "bg-cyan-50 border-gray-800 hover:bg-cyan-100" : "bg-white border-gray-400 hover:bg-gray-100"}`} onClick={handleFavorite}>
          <FaBookmark className="mr-2"/>Watch List
        </button>
      </div>
      <div className="flex flex-col text-center md:text-left w-full md:w-2/3 gap-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">{movie.title}</h4>
          <div className="flex gap-2 justify-center items-center">
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" className="inline-block shrink-0 md:mt-1.5 lg:mt-3 md:mx-0">
              <button className="border border-gray-400 text-gray-800 text-xs font-bold py-1.5 px-2.5 rounded flex items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer shadow-sm">
                IMDB
              </button>
            </a>
            <div className="inline-block shrink-0 md:mt-1.5 lg:mt-3 md:mx-0">
              <div className="border border-yellow-400 bg-yellow-50 text-yellow-900 text-xs font-bold py-1.5 px-2.5 rounded flex items-center gap-1.5 shadow-sm">
                <span className="text-yellow-500 text-sm leading-none">★</span>
                <span>{formatRating(movie.vote_average)}</span>
                <span className="opacity-60 font-normal">/ 10</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start items-center text-[11px] md:text-xs lg:text-sm text-gray-600 gap-1.5 font-medium">
          <span>{runtime(movie.runtime)}</span>
          <span>|</span>
          <span>{movie.genres?.map((genre) => genre.name).join(', ')}</span>
          <span>|</span>
          <span>{movie.release_date?.split("-")[0]}</span>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed border-t border-b border-gray-100 py-3 my-1">{movie.overview}</p>
        <div className="flex flex-col text-[11px] md:text-xs lg:text-sm text-gray-800 gap-2 text-left">
          <p><span className="font-bold text-gray-900"></span><em>{movie.tagline}</em></p>
        </div>
      </div>
    </>
  )
}

export default Modal