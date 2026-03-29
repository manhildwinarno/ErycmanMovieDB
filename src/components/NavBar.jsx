import { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

function NavLinks({mobileClass = "-translate-y-full opacity-0"}) {
  const activeNavLink = ({ isActive }) => 
    `text-base font-medium transition-all duration-300 border-b-0 ${
    isActive ? "text-cyan-500" : "hover:text-cyan-500 "
  }`

  return (
    <ul className={`mobile-menu flex flex-col md:flex-row md:items-center absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto py-6 md:py-0 px-4 md:px-0 ${mobileClass} -full md:translate-y-0 md:opacity-100 top-full transition-all ease-in-out duration-500 shadow-md md:shadow-none z-[-1] md:z-auto`}>
      <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
        <NavLink to="/" className={activeNavLink}>Home</NavLink>
      </li>
      
      <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
        <NavLink to="/explore" className={activeNavLink}>Explore</NavLink>
      </li>

      <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
        <NavLink to="/favorites" className={activeNavLink}>Favorites</NavLink>
      </li>
      
      <li className="my-4 md:mx-4 md:my-0 text-center md:text-left">
        <button className="bg-cyan-500 text-white text-sm font-[Poppins] font-medium transition-colors duration-300 px-6 py-2 hover:bg-cyan-600 rounded cursor-pointer w-full md:w-auto shadow-sm">
          Login
        </button>
      </li>
    </ul>
  )
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const toggleNavBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow md:flex md:items-center md:justify-between relative z-100">
      <div className="logo-menu flex justify-between items-center z-10">
        <Link to="/">
          <img className="h-16 inline" src="img/Logo Eryc.png" alt="ErycMovie Website"/>
        </Link>
        <div className="text-2xl cursor-pointer md:hidden block">
          <button onClick={toggleNavBar}>
            {isOpen ? <FaXmark/> : <IoMenu/>}
          </button>
        </div>
      </div>
      <NavLinks mobileClass={isOpen ? "" : "-translate-y-full opacity-0"}/>
    </nav>
  )
}

export default NavBar