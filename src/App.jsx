import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <MovieProvider>
      <div className="flex flex-col min-h-screen font-[Poppins]">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home>
                  <SearchBar className="mt-8 relative flex" />
                </Home>
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/explore"
              element={
                <Explore>
                  <SearchBar className="relative flex" />
                </Explore>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
