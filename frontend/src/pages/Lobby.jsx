import { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar"
import LobbyRoster from "../components/LobbyRoster";

const socket = io.connect("http://localhost:5000")

export default function Lobby(){
    const {roomId} = useParams()
    const [users,setUsers] = useState([])
    const [msg,setMsg] = useState("")
    const [serverMsg,setServerMsg] = useState([])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/lobby/${roomId}`)
        .then((res)=>{
            setServerMsg(res.data.chats)
            setUsers(res.data.users)
        })

        socket.emit("join_lobby_room",roomId);
        socket.on("receive_message",(data)=>{
            setServerMsg((prev)=>[...prev,data]);
        })
        
        return () => {
            socket.emit('leave-room', roomId);
            socket.off("receive_message")
        };
    },[roomId])

    const sendMsg = ()=>{
        socket.emit("send_message",{
            message:msg,
            room:roomId,
        })
        setMsg("");
    }

    return (
        <div>
            <Navbar />
            <div className="bg-[#060a15] px-[8%] py-3 flex flex-col w-full border border-[#131925]">
                <div>
                    <p> <span className="text-[#da63de] text-2xl font-bold">VALORANT LOBBY</span><span>#VAL-9410</span> </p>
                    <span className="text-white ">Mode</span>
                </div>
                <div className="flex w-full mt-2">
                    <LobbyRoster users={users}/>
                    <div className="w-[35vw] border-2 border-amber-700  flex flex-col">
                        <div className="h-[8vh] bg-[#1b2134] flex justify-between p-2 items-center">
                            <p className="text-[#a0a6b9]">Squad Comms</p>
                            <button>Leave Squad</button>
                        </div>
                        <div className="h-[58vh] overflow-y-auto flex flex-col">
                           {serverMsg.map((data,idx)=>(
                             <h1 key={idx} className="text-white">{data.message}</h1>
                           ))}
                           
                        </div>
                        <div className="h-[8vh] bg-[#1b2134] flex  items-center p-3 gap-2 text-white">
                            <input className="bg-[#070a15]  py-1 px-3 w-[60%]" type="text" value={msg} onChange={(e)=>{setMsg(e.target.value)} }/>
                            <button className="w-[30%]"  onClick={sendMsg}> send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}