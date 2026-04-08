import { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"
import LobbyRoster from "../components/LobbyRoster";
import { useAuth } from "../context/AuthContext"; 

const socket = io.connect("http://localhost:5000")

export default function Lobby(){
    const navigate = useNavigate();
    const {roomId} = useParams()
    const {currentUser} = useAuth()
    const [users,setUsers] = useState([])
    const [msg,setMsg] = useState("")
    const [serverMsg,setServerMsg] = useState([])
    const [title,setTitle] = useState("")
    const [mode,setMode] = useState("")
    const [size,setSize] = useState("")
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/lobby/${roomId}`)
        .then((res)=>{
            
            setServerMsg(res.data.lobby.chats)
            setUsers(res.data.lobby.users)
            
            setTitle(res.data.lobby.title)
            setMode(res.data.lobby.mode)
            setSize(res.data.lobby.squadSize)
            socket.emit("join_lobby_room", {roomId: roomId, user: currentUser.id});
        })

        // socket.emit("join_lobby_room",{roomId:roomId,user:currentUser.id});
        socket.on("receive_message",(data)=>{
            
            setServerMsg((prev)=>[...prev,data]);
        })
        const handleUserJoined = (updatedRoster) => {
            
            setUsers(updatedRoster); 
        };
        socket.on("roster_update", handleUserJoined);
        socket.on("join_error", () => navigate("/homepage"))
        
        return () => {
            socket.off("join_lobby_room")
            socket.emit('leave-room', roomId);
            socket.off("receive_message")
        };
    },[roomId,currentUser])

    const sendMsg = ()=>{
        if (!msg.trim()) return;
        socket.emit("send_message",{
            message:msg,
            room:roomId,
            sender:currentUser.username
        })
        setMsg("");
    }

    const leaveLobby = ()=>{
        socket.emit("leave_lobby",{
            room:roomId,
            user:currentUser.id
        })
        navigate("/homepage")
    }
    const toggleReady = (status)=>{
        
        socket.emit("ready",{
            room:roomId,
            sender:currentUser.id,
            status:status,
        })
    }

    return (
        <div>
            <Navbar />
            <div className="bg-[#060a15] px-[8%] py-3 flex flex-col w-full border border-[#131925]">
                <div>
                    <p> <span className="text-[#da63de] text-2xl font-bold">{title} LOBBY</span><span>#VAL-9410</span> </p>
                    <span className="text-white ">Mode: {mode} </span>
                </div>
                <div className="flex w-full mt-2">
                    <LobbyRoster users={users} size={size} emitReady={toggleReady}/>
                    <div className="w-[35vw] border-2 border-amber-700  flex flex-col">
                        <div className="h-[8vh] bg-[#1b2134] flex justify-between p-2 items-center">
                            <p className="text-gray-300 font-semibold text-lg tracking-wide">Squad Comms</p>
                            <button onClick={leaveLobby} className="bg-amber-500 p-2 rounded-2xl">Leave Squad</button>
                        </div>
                        <div className="h-[58vh] overflow-y-auto flex flex-col p-2">
                           {serverMsg.map((data,idx)=>(
                            
                            <div key={idx} className="m-2 px-2 pr-4 py-1 rounded bg-[#2a3147] w-fit">
                             <h1 className="text-amber-400 text-sm font-semibold">{data.sender}</h1>
                             
                             <h1  className="text-gray-200 text-sm">{data.message}</h1>
                             </div>
                             
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