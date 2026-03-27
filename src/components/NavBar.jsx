import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoMenu } from "react-icons/io5";

function NavBar() {
  return (
    <nav className="bg-white shadow md:flex md:items-center md:justify-between relative z-100">
      <div className="logo-menu flex justify-between items-center z-10">
        <Link to="/">
          <img className="h-16 inline" src="img/Logo Eryc.png" alt="ErycMovie Website"/>
        </Link>
        <span className="text-2xl cursor-pointer md:hidden block">
          <IoMenu/>
        </span>
      </div>
      <ul className="mobile-menu flex flex-col md:flex-row md:items-center absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto py-6 md:py-0 px-4 md:px-0 opacity-0 -translate-y-full md:translate-y-0 md:opacity-100 top-full transition-all ease-in-out duration-500 shadow-md md:shadow-none z-[-1] md:z-auto">
        <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
          <Link to="/" className="text-base font-medium hover:text-cyan-500 transition-colors duration-300">Home</Link>
        </li>
        
        <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
          <HashLink smooth to="/#features" className="text-base font-medium hover:text-cyan-500 transition-colors duration-300">Features</HashLink>
        </li>
        
        <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
          <Link to="/explore" className="text-base font-medium hover:text-cyan-500 transition-colors duration-300">Explore</Link>
        </li>

        <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
          <Link to="/favorites" className="text-base font-medium hover:text-cyan-500 transition-colors duration-300">Favorites</Link>
        </li>
        
        <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
          <button className="bg-cyan-500 text-white text-sm font-[Poppins] font-medium transition-colors duration-300 px-6 py-2 hover:bg-cyan-600 rounded cursor-pointer w-full md:w-auto shadow-sm">
            Login
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar