import Navbar from "../components/navbar"
import LeftSidebar from "../components/LeftSidebar"
import Feed from "../components/Feed"
import RightSidebar from "../components/RightSidebar"
import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function Homepage(){
    const navigate = useNavigate();
    const [serverMessage, setServerMessage] = useState("Loading...");

    useEffect(() => {
        const checkAuthAndFetchData = async ()=>{
            try {
                await axios.get("http://localhost:5000/api/homepage", {withCredentials:true})
                setServerMessage("authenticated")
            }
            catch (error) {
                navigate("/login")
            }
            
        } 
        checkAuthAndFetchData();
    }, [navigate]);

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