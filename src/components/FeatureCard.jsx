function FeatureCard({title, caption, icon: Icon}) {
  return (
    <div className="card bg-gray-50 border border-gray-200 max-w-sm w-full h-auto lg:h-72 p-6 gap-9 flex flex-col items-center shadow-lg cursor-pointer hover:-translate-y-3 transition-all duration-500 ease-in-out rounded-md">
      {Icon && <Icon className="text-black text-5xl self-start"/>}
      <div className="desc flex flex-col gap-2">
        <h4 className="font-semibold text-2xl">{title}</h4>
        <p className="text-base">{caption}</p>
      </div>
    </div>
  )
}

export default FeatureCard