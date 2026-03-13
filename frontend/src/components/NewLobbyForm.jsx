import { useState } from "react";
import { useForm } from "react-hook-form"
import {useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function NewLobbyForm({display,onClose}){
    const [data,setData] = useState([])
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
  })

  const selectedGameTitle = watch("title");
  const currentSquadSize = watch("squadSize");
  const currentRankIndex = watch("rankIndex");
 
const selectedGame = data.find((game) => game.title === selectedGameTitle);


useEffect(()=>{
    axios.get("http://localhost:5000/api/gamedata")
    .then(res=>{setData(res.data),console.log(res.data)})
},[])


    

    const onSubmit = async (data) => {
        try{
            
            const res = await axios.post("http://localhost:5000/api/lobby",data)
            const newLobbyId = res.data._id; 
        
            navigate(`/lobby/${newLobbyId}`);
        } catch (error) {
            console.log(error);
        }
    }
    if(!display){
        return null;
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-[#0B0F19] rounded-xl border border-gray-700 shadow-2xl p-8">
                <div className="relative">
                    
                    <h2>HOST A NEW SQUAD</h2>
                    <p>Configure your lobby requirements</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4"> 
                        <div>
                            <p>Select Game</p>
                        <select {...register("title")} className="bg-[#0B0F19] ...">
                            <option value="">Choose a game</option>
                            {data.map((game) => (
                            <option key={game._id} value={game.title}>
                                {game.title}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div>
                            <p>Game Mode</p>
                            <select 
                                    {...register("mode")} 
                                    disabled={!selectedGame} // Disable if no game is selected
                                    className="bg-[#0B0F19] ..."
                                >
                                    <option value="">Select Mode</option>
                                    {selectedGame?.filters?.modes.map((mode) => (
                                    <option key={mode} value={mode}>
                                        {mode}
                                    </option>
                                    ))}
                                </select>
                                <p>Squad size</p>
                                <input type="range" min={2} max={6} set={2} {...register("squadSize",{ valueAsNumber: true })}/>
                                <p>{currentSquadSize}</p>
                                <p>Minimum Rank</p>
                                <input type="range" {...register("rankIndex",{ valueAsNumber: true })}  min={0} max={selectedGame ? selectedGame.filters.rankOptions.length-1 :0} />
                                <p>{selectedGame?.filters.rankOptions[currentRankIndex]}</p>
                                <p>lobby title</p>
                                <textarea {...register("description")}></textarea>
                                <button onClick={onClose} type="button">Cancel</button>
                                <button  type="submit">Create Squad</button>

                            
                        </div>
                        
                        
                    </form>
                    
                </div>
            </div>
        </div>
    )
}