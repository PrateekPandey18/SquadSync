import SelectCards from "./SelectCards"
import GameFilters from "./GameFilters";
import { useState,useEffect } from "react"
import axios from "axios"



export default function LeftSidebar({passData,onReset}){
    let [currCard,setCurrCard] = useState();
    let [cards,setCards]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/gamedata')
        .then(res=>(setCards(res.data)))
    },[])


    let gameId=(_id)=>{
        setCurrCard(_id);
        
    }
    let search = (mode,rank)=>{
        const selectedCard = cards.find((card) => card._id === currCard);
        passData(selectedCard.title,mode,rank)
    }

    return(
        <div className="flex flex-col w-[20vw] p-3 bg-[#0d131f] h-[100vh] text-white">
            <p className="p-1 text-[19px] font-bold border-b border-[#6480c4]">Filters</p>
            <button onClick={onReset} className="text-xs bg-slate-700 hover:bg-red-500/20 hover:text-red-400 px-2 py-1 rounded transition-colors">Reset</button>
            <div className="flex flex-col">
                <p className="text-white mt-2">Game Selector</p>
                <SelectCards items={cards} onClick={gameId}/>
            </div>
            <div>
                <div>
                    
                    {cards.map((game)=>{
                        if(game._id===currCard){
                           return <GameFilters key={game._id} search={search} filters={game.filters}/>
                        }
                        return null
                    })}
                </div>
                

            </div>
        </div>
    )
}