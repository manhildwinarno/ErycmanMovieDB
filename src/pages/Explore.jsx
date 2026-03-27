import MovieCard from "../components/MovieCard"

function Explore({movies, children, loading, error}) {
  return (
    <>
      <section className="search-container max-w-5xl min-h-60 mx-auto mt-12 px-4 mb-20 relative z-10">
        <div className="text-center flex flex-col justify-center items-center px-4 mb-12">
          {children}
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : ( 
          <div className="movie-container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mx-auto">
            {/* <!-- Movie container --> */}
            {movies.map((movie) => 
              <MovieCard movie={movie} key={movie.id}/>
            )}
            {/* <!-- Movie container end --> */}
          </div>
        )}

      </section>
      <div id="modal-wrapper" className="fixed z-150 inset-0 hidden">
        <div id="modal-backdrop" className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity"></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8 pointer-events-none">
          <div className="bg-white rounded-xl max-w-340px md:max-w-3xl lg:max-w-4xl w-full relative p-6 md:p-8 pointer-events-auto max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl">

            <div className="modal-body flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
              {/* <!-- Modal Body --> */}

              {/* <!-- Modal Body End --> */}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Explore