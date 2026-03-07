import SelectCards from "./SelectCards"
import GameFilters from "./GameFilters";
import { useState,useEffect } from "react"
import axios from "axios"

// let selectionCards = [
//     {image: "https://imgs.search.brave.com/rK3cMLIx8cKugAKPyxRFX2AEBv_wkBY2nn-5Xlt0_KY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/LWxpYnJhcnkuY29t/L2ltYWdlcy9jbGFz/aC1vZi1jbGFucy1p/Y29uLXBuZy9jbGFz/aC1vZi1jbGFucy1p/Y29uLXBuZy0xOC5q/cGc",
//         title: "Clash Of Clans",
//         id: 1,
//         filters: {
//             modes: ["Clan War League", "Capital Raids", "Farming", "Trophy Push"],
//             rankLabel: "Town Hall (TH)",
//             rankOptions: ["TH 12", "TH 13", "TH 14", "TH 15", "TH 16"],
//             hasMicOption: true
//         }
        
//     },
//     {image:"https://imgs.search.brave.com/FLue9-x38wjcYr7-td-1xriKYIY4Y9agoIuHD6Iq5Nc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YnV6eW4yNWp6cjc2/MS5wbmc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPWM4YTU1OTcz/YjUyYTI3ZTAwMzI2/OTkxNGVkMWE4ODM4/NDljZTRiZGM",
//        title: "Valorant",
//        id: 2,
//        filters: {
//             modes: ["Competitive", "Unrated", "Premier", "Swiftplay", "Custom"],
//             rankLabel: "Rank",
//             rankOptions: [
//             "Any", "Unranked", "Iron", "Bronze", "Silver", "Gold", 
//             "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"
//             ],
//             hasMicOption: true
//         }
//     },
//     {
//         image:"https://rivalskins.com/wp-content/uploads/2024/12/cropped-logo-1.png",
//        title: "Marvel Rivals",
//        id:3,
//        filters: {
//             modes: ["Ranked", "Casual", "Custom"],
//             rankLabel: "Rank",
//             rankOptions: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Grandmaster"],
//             hasMicOption: true
//         }
//     },
//     {
//         image: "https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pokemon-GO-icon.png",
//         title: "Pokémon GO",
//         id: 4,
//         filters: {
//             modes: ["Raids", "GO Battle League", "Team GO Rocket", "Catching/Farming"],
//             rankLabel: "GBL Rank",
//             rankOptions: ["Rank 1-20", "Ace", "Veteran", "Expert", "Legend"],
//             hasMicOption: false
//         }
//     },
//     {
//         image: "https://m.media-amazon.com/images/I/41-A87tI75L.png",
//         title: "BGMI",
//         id: 5,
//         filters: {
//             modes: ["Classic (Erangel)", "TDM", "Arena Training", "Scrims"],
//             rankLabel: "Tier",
//             rankOptions: ["Platinum", "Diamond", "Crown", "Ace", "Ace Master", "Conqueror"],
//             hasMicOption: true
//         }
//     },
//     {
//         image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
//         title: "Minecraft",
//         id: 6,
//         filters: {
//             modes: ["Survival", "Creative", "Hardcore", "Bedwars", "Skywars"],
//             rankLabel: "Player Type",
//             rankOptions: ["Casual", "Builder", "Redstone Engineer", "Speedrunner", "PVP Pro"],
//             hasMicOption: true
//         }
//     },
//     {
//         image: "https://static.wikia.nocookie.net/apexlegends_gamepedia/images/0/0e/Apex_Legends_logo.png",
//         title: "Apex Legends",
//         id: 7,
//         filters: {
//             modes: ["Battle Royale (Ranked)", "Trios", "Duos", "Mixtape"],
//             rankLabel: "Rank",
//             rankOptions: ["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Predator"],
//             hasMicOption: true
//         }
//     }
// ]


export default function LeftSidebar(){
    let [currCard,setCurrCard] = useState();
    let [cards,setCards]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/gamedata')
        .then(res=>(setCards(res.data)))
    },[])


    let gameId=(_id)=>{
        setCurrCard(_id);
        
    }

    return(
        <div className="flex flex-col w-[20vw] p-3 bg-[#0d131f]  text-white">
            <p className="p-1 text-[19px] font-bold border-b border-[#6480c4]">Filters</p>
            <div className="flex flex-col">
                <p className="text-white mt-2">Game Selector</p>
                <SelectCards items={cards} onClick={gameId}/>
            </div>
            <div>
                <div>
                    
                    {cards.map((game)=>{
                        if(game._id===currCard){
                           return <GameFilters key={game._id} filters={game.filters}/>
                        }
                        return null
                    })}
                </div>
                

            </div>
        </div>
    )
}