import Navbar from "../components/navbar"
import LeftSidebar from "../components/LeftSidebar"
import Feed from "../components/Feed"
import RightSidebar from "../components/RightSidebar"

export default function Homepage(){

    return (
        <div className="flex flex-col bg-[#040712] w-screen  justify-start">
            <Navbar />
            <div className="flex px-10 py-6 justify-evenly h-full">
                <LeftSidebar />
                <Feed />
                <RightSidebar />
            </div>
        </div>
        
    )
}