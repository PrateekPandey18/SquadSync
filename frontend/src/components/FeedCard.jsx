import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedCard({card}){
    let { _id, title, mode, squadSize, rankIndex, description } = card;

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/lobby/${_id}`);
    };

    return (
        <div className="bg-[#1e1e24] border border-[#da63de]/30 rounded-xl p-5 m-4 shadow-lg flex flex-col justify-between gap-4 hover:border-[#da63de]/70 hover:shadow-[#da63de]/10 hover:shadow-xl transition-all w-[90%] max-w-sm">
            
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[#da63de] text-2xl font-black uppercase tracking-wider truncate">
                    {description}
                </h1>
                <h2 className="text-gray-300 text-sm font-bold uppercase tracking-wide truncate">
                    {title}
                </h2>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Neon Mode Badge */}
                <span className="bg-[#da63de]/20 border border-[#da63de] text-[#da63de] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    Mode: {mode}
                </span>
                
                {/* Subtle Stat Badges */}
                <span className="bg-white/5 text-gray-300 text-xs font-semibold px-2 py-1 rounded-md uppercase border border-white/10">
                    👥 {squadSize}
                </span>
                <span className="bg-white/5 text-gray-300 text-xs font-semibold px-2 py-1 rounded-md uppercase border border-white/10">
                    🏆 {rankIndex}
                </span>
            </div>

            {/* Action Button */}
            <button 
                onClick={handleCardClick}
                className="w-full bg-[#0ab07a] hover:bg-[#089566] text-black text-sm font-extrabold uppercase tracking-widest py-3 rounded-lg transition-colors mt-2"
            >
                Join Squad
            </button>
            
        </div>
    );
}