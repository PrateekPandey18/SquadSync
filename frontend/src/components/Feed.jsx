import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import io from "socket.io-client"
import axios from "axios"
import FeedCard from "./FeedCard"
import NewLobbyForm from "./NewLobbyForm";

const socket = io.connect("http://localhost:5000")

export default function Feed(){

    const [lobbies,setLobbies]=useState([]);
    const [lobbyForm,setLobbyForm]= useState(false);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/lobby")
        .then(res=>setLobbies(res.data))

        const handleNewLobby = (data) => {
            setLobbies((prev) => [data, ...prev]);
        };

        socket.on("new_lobby", handleNewLobby);

        return () => {
            socket.off("new_lobby", handleNewLobby);
        };
    },[])


    let renderForm = ()=>{
        setLobbyForm(true);
    }

    return (
        <div className="flex flex-col items-center justify-start text-white w-[50vw] p-3   mt-4 ">
            <button className="w-full py-2 bg-linear-to-r from-blue-500 to-purple-600" onClick={renderForm}>Host Squad</button>
            <NewLobbyForm display={lobbyForm} onClose={() => setLobbyForm(false)}/>
            <div className="w-full mt-6">
                <p>Active Lobbies</p>
                <div className="w-full grid grid-cols-3 ">
                    {lobbies.map((card)=>{
                        return <FeedCard key={card._id} card={card}/>
                    })}

                </div>
            </div>
        </div>
    )
}