import { Routes, Route } from 'react-router-dom'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Find from './pages/Find'
import Footer from './components/Footer'
import NavBar from './components/NavBar'


function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/find' element={<Find/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
