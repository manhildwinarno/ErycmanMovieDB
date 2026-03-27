import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-5 pt-10 pb-4 bg-gray-100 min-h-full">
      <div className="social flex flex-col justify-center items-center gap-6 mb-7">
        <h5 className="font-semibold text-lg">Follow Eryc on Social</h5>
        <div className="social-media flex justify-center items-center gap-10">
          <a href="https://www.instagram.com/manhillih/" target="_blank"><FaInstagram className="text-xl"/></a>
          <a href="https://www.youtube.com/channel/UCvSDzPo9iBJlbo4N_HpYqYw" target="_blank"><FaYoutube className="text-xl"/></a>
          <a href="https://github.com/manhildwinarno" target="_blank"><FaGithub className="text-xl"/></a>
        </div>
      </div>
      <div className="add-on md:grid md:grid-cols-(--grid-col-med) place-content-center xl:grid-cols-3 xl:px-96 text-center w-full">
        <p className="text-sm">Help</p>
        <p className="text-sm">Conditions of Use</p>
        <p className="text-sm">Privacy Policy</p>
      </div>
      <img className="h-16 inline" src="img/Logo Eryc.png" alt="Logo ErycMovie Website"/>
      <p className="text-gray-400 text-sm">&copy; 2026 by Eryc.com, Inc</p>
    </footer>
  )
}

export default Footer