import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { searchMovies, getPopularMovies } from "./services/api"
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'



function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (err) {
        console.log(err)
        setError("Failed to load movies...")
      }
      finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
      const searchResults = await searchMovies(searchQuery)
      navigate("/explore")
      setMovies(searchResults)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
    setSearchQuery("")
  }  

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={
            <Home>
              <SearchBar className="mt-8 relative flex" searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
            </Home>
            }/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/explore' element={
            <Explore movies={movies} loading={loading} error={error}>
              <SearchBar className="relative flex" searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
            </Explore>
            }/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
