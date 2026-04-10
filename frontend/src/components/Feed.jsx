import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import axios from "axios";
import FeedCard from "./FeedCard";
import NewLobbyForm from "./NewLobbyForm";
import { useAuth } from "../context/AuthContext"; 

const socket = io.connect("http://localhost:5000");

export default function Feed({ filters }) {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);

    const [lobbies, setLobbies] = useState([]);
    const [lobbyForm, setLobbyForm] = useState(false);

    
    useEffect(() => {
        if (!currentUser?.id) return;
        
        axios.get(`http://localhost:5000/users/${currentUser.id}`)
            .then(res => setUserData(res.data.user))
            .catch(err => console.error("Failed to fetch user data:", err));
    }, [currentUser]);

    
    useEffect(() => {
        axios.get("http://localhost:5000/api/lobby")
            .then(res => setLobbies(res.data))
            .catch(err => console.error("Failed to fetch lobbies:", err));
        
        const handleNewLobby = (data) => {
            setLobbies((prev) => [data, ...prev]);
        };

        socket.on("new_lobby", handleNewLobby);

        return () => {
            socket.off("new_lobby", handleNewLobby);
        };
    }, []);

    const renderForm = () => {
        setLobbyForm(true);
    };

    const displayedLobbies = (filters && filters.title) 
        ? lobbies.filter(lobby => {
            return (
                lobby.title === filters.title && 
                lobby.mode === filters.mode &&
                lobby.rankIndex <= filters.rankIndex
            );
          })
        : lobbies;

    return (
        <div className="flex flex-col items-center justify-start text-white w-[50vw] p-3 h-[100vh] overflow-y-auto mt-4">
            <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded" onClick={renderForm}>
                Host Squad
            </button>
            
            <NewLobbyForm display={lobbyForm} onClose={() => setLobbyForm(false)}/>
            
            <div className="w-full mt-6">
                <p className="font-bold mb-4 border-b border-gray-700 pb-2">Active Lobbies</p>
                <div className="w-full grid grid-cols-3 gap-4">
                    {displayedLobbies.length > 0 ? (
                        displayedLobbies.map((card) => (
                            <FeedCard key={card._id} card={card} userData={userData} />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-slate-400 mt-10">No active lobbies match your filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
}