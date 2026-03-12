import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function FeedCard({card}){
    let {_id,title,mode,squadSize,rankIndex,description}=card;

    const navigate = useNavigate();

    const handleCardClick = () => {
        
        navigate(`/lobby/${_id}`);
    };

    return (
        <div className="w-[90%] aspect-square p-4 m-4 bg-[#192037] flex flex-col justify-evenly gap-1  rounded-2xl border-2 border-[#76719f]">
            <p>{title}</p>
            <p>{mode}</p>
            <p>{squadSize}</p>
            <p>{rankIndex}</p>
            <p>{description}</p>
            <div className="flex justify-center bg-[#0ab07a] px-1 text-lg text-black">
                <button className="w-full" onClick={handleCardClick}>Join</button>
            </div>
        </div>
    )
    
}