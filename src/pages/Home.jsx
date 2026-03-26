import SearchBar from "../components/SearchBar"
import FeatureCard from "../components/FeatureCard"

function Home() {
  return (
    <>
      <section className="home-container">
        <div className="text-center flex flex-col justify-center items-center h-96 pt-12 relative z-10 px-4">
          <h1 className="text-5xl text-shadow-sm md:text-7xl tracking-tight z-10 relative">Eryc<span className="font-bold">Movie</span></h1>
          <p className="text-xl md:text-2xl mt-4">Explore Every Best Movie</p>
          <SearchBar style="mt-8 relative"/>
        </div>

        
    
        <div className="flex flex-col justify-center items-center px-16 py-20 gap-3" id="features">
          <h3 className="features-title text-3xl font-bold text-center">Our Best Features</h3>
          <hr className="w-24"/>
          <div className="cards flex justify-evenly items-center flex-col lg:flex-row gap-9 mt-10">
            <FeatureCard title="Easy Movie Search" caption="Find your favorite movies quickly using a fast and simple search feature."/>
            <FeatureCard title="Complete Movie Information" caption="View detailed information about movies, including synopsis, ratings, and other important details."/>
            <FeatureCard title="Save Favorite Movies" caption="Add movies to your watchlist so you can easily find and watch them later."/>
          </div>
        </div>
      </section>
    </>
  )  
}

export default Home