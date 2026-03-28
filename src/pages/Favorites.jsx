function Favorites() {
  return (
    <div className="favorites-empty max-w-5xl min-h-80 mx-auto mt-12 px-4 mb-20 ">
      <div className="text-center flex flex-col justify-center items-center px-4 mb-12 gap-4">
        <h2 className="font-semibold text-2xl">No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    </div>
  )
}

export default Favorites