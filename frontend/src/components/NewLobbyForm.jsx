import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function NewLobbyForm({ display, onClose }) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "squadSize": 4,
            "rankIndex": 0
        }
    });

    const selectedGameTitle = watch("title");
    const currentSquadSize = watch("squadSize");
    const currentRankIndex = watch("rankIndex");
    
    const selectedGame = data.find((game) => game.title === selectedGameTitle);

    useEffect(() => {
        axios.get("http://localhost:5000/api/gamedata")
            .then(res => { setData(res.data) })
            .catch(err => console.error(err));
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/api/lobby", data);
            const newLobbyId = res.data._id;
            navigate(`/lobby/${newLobbyId}`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!display) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            
            {/* Modal Container */}
            <div className="w-full max-w-lg bg-[#1e1e24] rounded-2xl border border-[#da63de]/30 shadow-[0_0_40px_rgba(218,99,222,0.15)] p-8">
                
                {/* Header */}
                <div className="mb-6 border-b border-gray-700/50 pb-4">
                    <h2 className="text-3xl font-black text-[#da63de] tracking-widest uppercase">Host a Squad</h2>
                    <p className="text-gray-400 text-sm mt-1">Configure your lobby requirements and recruit players.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    
                    {/* Row 1: Game and Mode side-by-side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Select Game</label>
                            <select 
                                {...register("title")} 
                                className="w-full bg-[#070a15] text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-[#da63de] focus:ring-1 focus:ring-[#da63de]/50 transition-all text-sm"
                            >
                                <option value="">Choose a game...</option>
                                {data.map((game) => (
                                    <option key={game._id} value={game.title}>{game.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Game Mode</label>
                            <select 
                                {...register("mode")} 
                                disabled={!selectedGame}
                                className="w-full bg-[#070a15] text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-[#da63de] focus:ring-1 focus:ring-[#da63de]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                <option value="">Select Mode</option>
                                {selectedGame?.filters?.modes.map((mode) => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Squad Size */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Squad Size</label>
                            <span className="text-[#da63de] font-black text-lg">{currentSquadSize}</span>
                        </div>
                        <input 
                            type="range" 
                            min={2} 
                            max={6} 
                            step={1} 
                            {...register("squadSize", { valueAsNumber: true })}
                            className="w-full accent-[#da63de] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-1">
                            <span>2</span>
                            <span>6</span>
                        </div>
                    </div>

                    {/* Row 3: Minimum Rank */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Minimum Rank</label>
                            <span className="text-amber-400 font-bold text-sm tracking-wide">
                                {selectedGame?.filters.rankOptions[currentRankIndex] || "Any Rank"}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min={0} 
                            max={selectedGame ? selectedGame.filters.rankOptions.length - 1 : 0} 
                            disabled={!selectedGame}
                            {...register("rankIndex", { valueAsNumber: true })}
                            className="w-full accent-amber-500 cursor-pointer disabled:opacity-50"
                        />
                    </div>

                    {/* Row 4: Lobby Title/Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Lobby Title</label>
                        <textarea 
                            {...register("description")}
                            placeholder="e.g., Looking for a chill unrated group..."
                            rows="2"
                            className="w-full bg-[#070a15] text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-[#da63de] focus:ring-1 focus:ring-[#da63de]/50 transition-all resize-none text-sm"
                        ></textarea>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end items-center gap-3 mt-2 pt-4 border-t border-gray-800">
                        <button 
                            onClick={onClose} 
                            type="button"
                            className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-6 py-2.5 bg-[#0ab07a] hover:bg-[#089566] text-black text-sm font-extrabold uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-[#0ab07a]/20"
                        >
                            Create Squad
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}