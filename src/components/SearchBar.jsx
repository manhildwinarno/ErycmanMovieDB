import { FaSearch } from "react-icons/fa";

function SearchBar({ className, searchQuery, setSearchQuery, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className={className}>
      <input type="text" placeholder="Search for movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input w-full md:w-96 pl-6 pr-12 py-3 block border border-gray-300 rounded-full hover:ring-2 hover:ring-black transition-all duration-500  focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"/>
      <button type="submit" className="search-button flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 ml-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-500 rounded-r-full h-full w-10 md:w-14 cursor-pointer">
        <FaSearch/>
      </button>
    </form>
  )
}

export default SearchBar