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
        {image: "https://imgs.search.brave.com/HfygyCpB7s1nhJl4r4VgGJmjSCXYbg0o2OejB0QBox4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9zRm1XZlliWXBf/MmVhN1ZSTVRud2Qz/Z2pJQnJQR1hIal9k/X2FiMV9rMXExcDJP/TWs0cmlHTUYxdnF4/ZGhPTk90VFlPdF9C/VnBrN2E0QVljS1U2/OExOR1E9dzI0MC1o/NDgwLXJ3",
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
        image: "https://imgs.search.brave.com/iklQqbxDCKNU_tDvIAdccS9yVJ4ALaBc1RyZ5-Pg8o8/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMGY1YTAzOTUz/OWNjYmY2N2I5MGVi/YzQyYmU0YzQ3Yzhh/NjFjNmJkM2UwNDM5/YWY5ODA4MTEzNzUw/MzkxNzE0Yy9wb2tl/bW9uZ28uY29tLw",
        title: "Pokémon GO",
        filters: {
            modes: ["Raids", "GO Battle League", "Team GO Rocket", "Catching/Farming"],
            rankLabel: "GBL Rank",
            rankOptions: ["Rank 1-20", "Ace", "Veteran", "Expert", "Legend"],
        }
    },
    {
        image: "https://imgs.search.brave.com/jtOedlCZmL9R2p4t_rIt2tCZDW_id0MHxHoAr6QFUtM/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMDExMWJmMjI1/MzFhNDY3ZjViOTFh/MTM3OGYyZDdmYjIz/NjQyZmFhZDI1MTI5/MDg0MDRkN2QxOTFm/NDcyYzM4MS93d3cu/YmF0dGxlZ3JvdW5k/c21vYmlsZWluZGlh/LmNvbS8",
        title: "BGMI",

        filters: {
            modes: ["Classic (Erangel)", "TDM", "Arena Training", "Scrims"],
            rankLabel: "Tier",
            rankOptions: ["Platinum", "Diamond", "Crown", "Ace", "Ace Master", "Conqueror"],
        }
    },
    {
        image: "https://imgs.search.brave.com/-287umXlR6B6sDfw8L4roXFzWDRvgnTRtJggLu0gqzw/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvYTE3MTAxZTdj/OTZkOGQ0MWY0NmI3/MGY0Y2ZmM2I2MTll/OGM5OGQxN2IyNTQ0/MzY1OTY4NjFlOTU2/YjlhM2I3OC93d3cu/bWluZWNyYWZ0Lm5l/dC8",
        title: "Minecraft",
        filters: {
            modes: ["Survival", "Creative", "Hardcore", "Bedwars", "Skywars"],
            rankLabel: "Player Type",
            rankOptions: ["Casual", "Builder", "Redstone Engineer", "Speedrunner", "PVP Pro"],
        }
    },
    {
        image: "https://imgs.search.brave.com/xXNxh7k8q9LORByB-QrtZXWvbrRxgnpy45H7EUZ27qA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/bWFkZS1hLWN1c3Rv/bS1hcGV4LWxvZ28t/aW0tdXNpbmctaXQt/YXMtdGhlLWRlc2t0/b3AtaWNvbi12MC1i/MGo3NzAwdGtpc2Ex/LnBuZz93aWR0aD02/NDAmY3JvcD1zbWFy/dCZhdXRvPXdlYnAm/cz05YzJlYmU2ZmZm/YzhlNzA3Y2NhODVm/ZGQ2ODEzMGUyYjNj/NjU2YmMy",
        title: "Apex Legends",
        filters: {
            modes: ["Battle Royale (Ranked)", "Trios", "Duos", "Mixtape"],
            rankLabel: "Rank",
            rankOptions: ["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Predator"],
        }
    }
    ]
    await Games.deleteMany({});
    const result = await Games.insertMany(gamesto)
    console.log(result);
})


app.listen(5000,()=>{
    console.log("listening")
})