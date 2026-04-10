import Navbar from "../components/navbar"
import { useState } from "react"
import LeftSidebar from "../components/LeftSidebar"
import Feed from "../components/Feed"
import RightSidebar from "../components/RightSidebar"

export default function Homepage(){
    const [card,setCard] = useState(null)
    const passData = (title,mode,rankIndex)=>{
        setCard({title,rankIndex,mode})
        
    }
    const resetFilters = () => {
        setCard(null);
    };
    
    return (
        <div className="flex flex-col bg-[#040712] w-screen  justify-start">
            <Navbar />
            <div className="flex px-10 py-6 justify-evenly h-full">
                <LeftSidebar passData={passData} onReset={resetFilters}/>
                <Feed filters={card} />
                <RightSidebar />
            </div>
        </div>
        
    )
}