import { useState } from "react"
import FeedCard from "./FeedCard"
import NewLobbyForm from "./NewLobbyForm";
export default function Feed(){

    let lobbyCards = [
        {
            id: 1,
            username: "demo",
            gameName:"marvel rivals",
            mode:"Ranked",
            Rank:"platinum",
        },
        {
            id: 2,
            username: "TrainerRed",
            gameName: "Pokémon GO",
            mode: "Battle League",
            Rank: "Ace",
        },
        {
            id: 3,
            username: "ChiefPekka",
            gameName: "Clash of Clans",
            mode: "Home Village",
            Rank: "Titan I",
        },
        {
            id: 4,
            username: "JettMain99",
            gameName: "Valorant",
            mode: "Competitive",
            Rank: "Diamond 3",
        },
        {
            id: 5,
            username: "WraithSweat",
            gameName: "Apex Legends",
            mode: "Battle Royale Ranked",
            Rank: "Predator",
        },
        {
            id: 6,
            username: "SoloConqueror",
            gameName: "BGMI",
            mode: "Squad Ranked",
            rank: "Ace Dominator",
        },
        {
            id: 7,
            username: "SoloConqueror",
            gameName: "BGMI",
            mode: "Squad Ranked",
            rank: "Ace Dominator",
        }
    ]
    const [lobbyForm,setLobbyForm]= useState(false);

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
                    {lobbyCards.map((card)=>{
                        return <FeedCard key={card.id} card={card}/>
                    })}

                </div>
            </div>
        </div>
    )
}