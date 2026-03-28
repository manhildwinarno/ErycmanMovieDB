import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex flex-col bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-10 md:gap-0 py-10 ">
        <div className="flex flex-col items-center md:items-start justify-center gap-4 max-w-52 mx-5 md:mx-0 order-1">
          <img className="w-16 inline md:-translate-x-3" src="img/Logo Eryc.png" alt="Logo ErycMovie Website"/>
          <p className="text-center md:text-start">Connect with Eryc to solve problem and make a project together.</p>
          <div className="flex items-center gap-10">
            <a href="https://www.instagram.com/manhillih/" target="_blank"><FaInstagram className="text-xl"/></a>
            <a href="https://www.youtube.com/channel/UCvSDzPo9iBJlbo4N_HpYqYw" target="_blank"><FaYoutube className="text-xl"/></a>
            <a href="https://github.com/manhildwinarno" target="_blank"><FaGithub className="text-xl"/></a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:items-start gap-2 order-3 md:order-1">
          <h5 className="font-semibold text-base text-gray-600">Pages</h5>
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/explore" className="text-sm">Explore</Link>
          <Link to="/favorites" className="text-sm">Favorites</Link>
        </div>
        <div className="flex flex-col justify-center items-center md:items-start gap-2 order-4 md:order-1">
          <h5 className="font-semibold text-base text-gray-600">About</h5>
          <p className="text-sm">Help</p>
          <p className="text-sm">Conditions of Use</p>
          <p className="text-sm">Privacy Policy</p>
        </div>
        <div className="flex flex-col items-center gap-4 order-2 md:order-1">
          <button className="cursor-pointer p-2 border border-gray-800 w-full"><a href="https://github.com/manhildwinarno/ErycmanMovieDB" target="_blank">Github Repository</a></button>
          <div className="flex gap-0 border border-gray-600 w-full">
            <input type="text" className="p-2 outline-none" placeholder="Send me an email"/>
            <button type="submit" className="bg-gray-600 text-white p-2 cursor-pointer">Send</button>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm text-center mx-auto pb-6">&copy; 2026 by Eryc.com, Inc. All rights reserved</p>
    </footer>
  )
}

export default Footer