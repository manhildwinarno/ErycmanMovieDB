function FeatureCard({title, caption}) {
  return (
    <div className="card bg-gray-50 border border-gray-200 max-w-sm w-full h-auto lg:h-72 py-5 px-5 gap-9 flex flex-col justify-center items-center shadow-lg cursor-pointer hover:-translate-y-3 transition-all duration-500 ease-in-out rounded-md">
      <i className="fa-solid fa-magnifying-glass text-black text-5xl self-start"></i>
      <div className="desc flex flex-col gap-2">
        <h4 className="font-semibold text-2xl">{title}</h4>
        <p className="text-base">{caption}</p>
      </div>
    </div>
  )
}

export default FeatureCard