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
    const [lobbyTitle,setLobbyTitle] = useState("")
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/lobby/${roomId}`)
        .then((res)=>{
            
            setServerMsg(res.data.lobby.chats)
            setUsers(res.data.lobby.users)
            console.log(res.data)
           setLobbyTitle(res.data.lobby.description)
            console.log(lobbyTitle)
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
                <div className="bg-[#1e1e24] border border-[#da63de]/30 rounded-xl p-6 shadow-lg max-w-md">
    <div className="flex flex-col gap-1">
        {/* Main Lobby Title */}
        <h1 className="text-[#da63de] text-3xl font-black uppercase tracking-wider">
            {lobbyTitle}
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-gray-300 text-lg font-bold uppercase tracking-wide">
            {title}
        </h2>
        
        {/* Mode Badge */}
        <div className="mt-3">
            <span className="bg-[#da63de]/20 border border-[#da63de] text-[#da63de] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Mode: {mode}
            </span>
        </div>
    </div>
</div>
                <div className="flex w-full mt-2">
                    <LobbyRoster users={users} size={size} emitReady={toggleReady}/>
                    <div className="w-[35vw] h-[74vh] border border-amber-500/30 rounded-xl overflow-hidden flex flex-col shadow-lg">
    
    {/* --- HEADER --- */}
    <div className="bg-[#1b2134] shrink-0 flex justify-between px-4 py-3 items-center border-b border-amber-500/20">
        <p className="text-gray-300 font-bold text-lg tracking-wide uppercase">
            Squad Comms
        </p>
        <button 
            onClick={leaveLobby} 
            className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase px-3 py-1.5 rounded transition-colors"
        >
            Leave Squad
        </button>
    </div>

    
    <div className="flex-1 overflow-y-auto flex flex-col p-4 gap-3 bg-black/10">
        {serverMsg.length === 0 ? (
            <p className="text-gray-500 text-sm italic text-center mt-2">No messages yet. Say hi!</p>
        ) : (
            serverMsg.map((data, idx) => (
                <div 
                    key={idx} 
                    className="px-3 py-2 rounded-lg bg-[#2a3147] w-fit max-w-[85%] shadow-sm flex flex-col"
                >
                    <span className="text-amber-400 text-[11px] font-black uppercase tracking-wider mb-0.5">
                        {data.sender}
                    </span>
                    <span className="text-gray-200 text-sm leading-snug">
                        {data.message}
                    </span>
                </div>
            ))
        )}
    </div>

    
    <div className="bg-[#1b2134] shrink-0 flex items-center p-3 gap-3 border-t border-amber-500/20">
        <input 
            className="flex-1 bg-[#070a15] text-gray-200 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-shadow placeholder-gray-600 text-sm" 
            type="text" 
            placeholder="Type a message..."
            value={msg} 
            onChange={(e) => setMsg(e.target.value)} 
        />
        <button 
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-black font-extrabold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg transition-colors"  
            onClick={sendMsg}
        >
            Send
        </button>
    </div>
    
</div>
                </div>
            </div>
        </div>
    )
}