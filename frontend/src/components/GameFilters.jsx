import { useState } from "react";
export default function GameFilters({filters}){
    if (!filters) return <p className="text-gray-500 p-4">Select a game to see filters</p>;

    const [rankIndex, setRankIndex] = useState(0);
    const ranks = filters.rankOptions;


    return(
        <div className="w-100%">
            
            <div className="w-100% p-3">
                <p>Game Mode</p>
                {filters.modes.map((mode,index)=>(
                    <div key={index} className="filter-item w-100%">
                    <label htmlFor={`mode-${index}`} className="flex items-center justify-evenly gap-2 mb-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
                    
                    <span>{mode}</span>
                    
                    <input 
                        type="checkbox" 
                        id={`mode-${index}`} 
                        value={mode} 
                    />
                    </label>
                </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 w-64 p-4">
                <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Rank:</span>
                <span className="font-bold text-blue-600">{ranks[rankIndex]}</span>
                </div>

                <input
                type="range"
                min="0"
                max={ranks.length - 1}
                step="1"
                value={rankIndex}
                onChange={(e) => setRankIndex(e.target.value)}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
            <button className="w-full bg-amber-200">Submit</button>
        </div>
    )
}