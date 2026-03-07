export default function Cards({image,title,onClick,_id}){
    return(
        <div className="flex flex-col w-20 h-30 border border-[#1a202c] p-2  items-center" onClick={()=>onClick(_id)}>
            <img className="w-full aspect-square object-cover "  src={image}  />
            <p className="text-white text-sm text-center">{title}</p>
        </div>
    )
}