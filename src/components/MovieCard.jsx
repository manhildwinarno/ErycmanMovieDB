function MovieCard({ movie }) {  
  return (
    <div className="bg-gray-200 flex flex-col w-full rounded-lg shadow-sm overflow-hidden pb-3">
      <a href="#" className="w-full shrink-0 bg-gray-300 aspect-2/3 block">
        <img className="w-full h-full object-cover object-center block" src={movie.Poster} alt={movie.Title}/>
      </a>
      <div className="pt-3 px-3 flex flex-col grow text-center">
        <h4 className="text-sm md:text-base font-semibold tracking-tight text-gray-900 line-clamp-2 mb-1">{movie.title}</h4>
        <p className="text-xs md:text-sm text-gray-700 mb-2">{movie.release_date}</p>
        <button data-imdbid="${movie.imdbID}" className="open-modal-detail mt-auto text-xs text-black border border-gray-400 py-1.5 px-3 rounded hover:bg-gray-300 font-medium transition-colors cursor-pointer">Read more</button>
      </div>
    </div>
  )
}

export default MovieCard