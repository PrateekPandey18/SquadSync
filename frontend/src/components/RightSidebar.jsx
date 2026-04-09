import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RightSidebar(){
    const { currentUser } = useAuth();
    const [lobbies, setLobbies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLobbies = async () => {
            try {
                const response = await axios.get("http://localhost:5000/userLobbies", { withCredentials: true });
                setLobbies(response.data);
            } catch (error) {
                console.error("Error fetching lobbies:", error);
            }
        };
        fetchLobbies();
    }, []);

    return(
        // Main Sidebar: Takes full height of screen (h-screen)
        <div className="flex flex-col w-[20vw] h-screen bg-[#0d131f] text-white border-l border-white/5">
            
            {/* --- TOP HALF: YOUR LOBBIES --- */}
            {/* h-1/2 forces this to take exactly 50% of the sidebar height. */}
            <div className="flex flex-col h-1/2 p-4 border-b border-white/10">
                
                <div className="mb-4 pb-2 border-b border-[#da63de]/30 shrink-0">
                    <h1 className="text-[#da63de] text-lg font-black uppercase tracking-widest">
                        Your Lobbies
                    </h1>
                </div>

                {/* Inner Scrollable Box */}
                <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1 pb-2 custom-scrollbar">
                    {lobbies.length === 0 ? (
                        <p className="text-gray-500 text-sm italic text-center mt-4">No lobbies found.</p>
                    ) : (
                        lobbies.map((data) => (
                            <div 
                                key={data._id} 
                                className="bg-[#1e1e24] border border-gray-700 hover:border-[#da63de]/60 rounded-lg p-2.5 flex items-center justify-between gap-3 transition-colors shadow-sm shrink-0"
                            >
                                <div className="flex flex-col overflow-hidden w-full">
                                    <span className="text-sm font-bold text-gray-200 truncate block">
                                        {data.description}
                                    </span>
                                    <span className="text-xs text-[#da63de]/70 font-semibold uppercase tracking-wider truncate block">
                                        {data.title}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => navigate(`/lobby/${data._id}`)}
                                    className="shrink-0 bg-[#0ab07a] hover:bg-[#089566] text-black text-xs font-bold uppercase px-3 py-1.5 rounded transition-colors"
                                >
                                    Join
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            

        </div>
    );
}