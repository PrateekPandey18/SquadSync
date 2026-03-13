import { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar"

const socket = io.connect("http://localhost:5000")

export default function Lobby(){
    const {roomId} = useParams()
    const [msg,setMsg] = useState("")
    // const [serverMsg,setServerMsg] = useState([])
    const [serverMsg,setServerMsg] = useState([])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/lobby/${roomId}`)
        .then((res)=>{
            setServerMsg(res.data)
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
            <div className="px-[10%] py-3 flex flex-col w-full">
                <div>
                    <p> <span>VALORANT LOBBY</span><span>#VAL-9410</span> </p>
                    <span>Mode</span>
                </div>
                <div className="flex w-full">
                    <div className="w-[45vw] border-2 border-amber-700 mr-5 h-[100vh]">hi</div>
                    <div className="w-[35vw] border-2 border-amber-700 h-[100vh] flex flex-col">
                        <div className="h-[10vh]">
                            <p>Squad Comms</p>
                        </div>
                        <div className="h-[80vh]">
                           {serverMsg.map((data,idx)=>(
                             <h1 key={idx}>{data.message}</h1>
                           ))}
                           
                        </div>
                        <div className="h-[10vh]">
                            <input type="text" value={msg} onChange={(e)=>{setMsg(e.target.value)} }/>
                            <button onClick={sendMsg}> send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}