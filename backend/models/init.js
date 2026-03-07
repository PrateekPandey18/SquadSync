const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Games = require("./games.js")

main().then(()=>{console.log("succuess")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SquadSync');
}
app.get("/",async (req,res)=>{
    const gamesto = [
        {image: "https://imgs.search.brave.com/rK3cMLIx8cKugAKPyxRFX2AEBv_wkBY2nn-5Xlt0_KY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/LWxpYnJhcnkuY29t/L2ltYWdlcy9jbGFz/aC1vZi1jbGFucy1p/Y29uLXBuZy9jbGFz/aC1vZi1jbGFucy1p/Y29uLXBuZy0xOC5q/cGc",
        title: "Clash Of Clans",
        filters: {
            modes: ["Clan War League", "Capital Raids", "Farming", "Trophy Push"],
            rankLabel: "Town Hall (TH)",
            rankOptions: ["TH 12", "TH 13", "TH 14", "TH 15", "TH 16"],
           
        }
        
    },
    {image:"https://imgs.search.brave.com/FLue9-x38wjcYr7-td-1xriKYIY4Y9agoIuHD6Iq5Nc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YnV6eW4yNWp6cjc2/MS5wbmc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPWM4YTU1OTcz/YjUyYTI3ZTAwMzI2/OTkxNGVkMWE4ODM4/NDljZTRiZGM",
       title: "Valorant",
       filters: {
            modes: ["Competitive", "Unrated", "Premier", "Swiftplay", "Custom"],
            rankLabel: "Rank",
            rankOptions: [
            "Any", "Unranked", "Iron", "Bronze", "Silver", "Gold", 
            "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"
            ],
        }
    },
    {
        image:"https://rivalskins.com/wp-content/uploads/2024/12/cropped-logo-1.png",
       title: "Marvel Rivals",
       filters: {
            modes: ["Ranked", "Casual", "Custom"],
            rankLabel: "Rank",
            rankOptions: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Grandmaster"],
        }
    },
    {
        image: "https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pokemon-GO-icon.png",
        title: "Pokémon GO",
        filters: {
            modes: ["Raids", "GO Battle League", "Team GO Rocket", "Catching/Farming"],
            rankLabel: "GBL Rank",
            rankOptions: ["Rank 1-20", "Ace", "Veteran", "Expert", "Legend"],
        }
    },
    {
        image: "https://m.media-amazon.com/images/I/41-A87tI75L.png",
        title: "BGMI",

        filters: {
            modes: ["Classic (Erangel)", "TDM", "Arena Training", "Scrims"],
            rankLabel: "Tier",
            rankOptions: ["Platinum", "Diamond", "Crown", "Ace", "Ace Master", "Conqueror"],
        }
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
        title: "Minecraft",
        filters: {
            modes: ["Survival", "Creative", "Hardcore", "Bedwars", "Skywars"],
            rankLabel: "Player Type",
            rankOptions: ["Casual", "Builder", "Redstone Engineer", "Speedrunner", "PVP Pro"],
        }
    },
    {
        image: "https://static.wikia.nocookie.net/apexlegends_gamepedia/images/0/0e/Apex_Legends_logo.png",
        title: "Apex Legends",
        filters: {
            modes: ["Battle Royale (Ranked)", "Trios", "Duos", "Mixtape"],
            rankLabel: "Rank",
            rankOptions: ["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Predator"],
        }
    }
    ]
    const result = await Games.insertMany(gamesto)
    res.send(result);
})


app.listen(5000,()=>{
    console.log("listening")
})