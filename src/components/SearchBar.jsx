
function SearchBar({ style }) {
  return (
    <div className={style}>
      <input type="text" placeholder="Search Movies..." className="search-input w-full md:w-96 pl-6 pr-12 py-3 block border border-gray-300 rounded-full hover:ring-2 hover:ring-black transition-all duration-500  focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"/>
      <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
    </div>
  )
}

export default SearchBar