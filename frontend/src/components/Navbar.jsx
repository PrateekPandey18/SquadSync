import PFP from "./PFP"
export default function Navbar(){
    return(
        <div className="flex justify-between px-15 w-screen py-3 bg-[#080e1c]">
            <h2 className="font-bold text-2xl"><span className="text-[#a8eefd]">Squad</span><span className="text-[#307bfc]">Sync</span></h2>
            <input className="bg-[#1a2134] w-80 border-2  border-[#22293d] rounded-lg" type="text" name="" id="" />
            <PFP />
          
        </div>
    )

}