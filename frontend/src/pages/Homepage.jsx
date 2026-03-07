import Navbar from "../components/navbar"
import LeftSidebar from "../components/LeftSidebar"
import Feed from "../components/Feed"
import RightSidebar from "../components/RightSidebar"
import { useState,useEffect } from "react"
import axios from "axios"
export default function Homepage(){
    const [serverMessage, setServerMessage] = useState("Loading...");

    useEffect(() => {
        axios.get('http://localhost:5000/api/homepage')
        .then(res => setServerMessage(res.data.message))
        .catch(err => setServerMessage("Server is offline ❌"));
    }, []);

    return (
        <div className="flex flex-col bg-[#040712] w-screen  justify-start">
            <div>{serverMessage}</div>
            <Navbar />
            <div className="flex px-10 py-6 justify-evenly h-full">
                <LeftSidebar />
                <Feed />
                <RightSidebar />
            </div>
        </div>
        
    )
}