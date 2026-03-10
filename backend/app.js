const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Games = require("./models/games.js");
const Lobby = require("./models/lobby.js")


main().then(()=>{console.log("succuess")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SquadSync');
}

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json())

app.get("/api/homepage",(req,res)=>{
    res.status(200).json({ message: "Server is up and running!" });
})
app.get("/api/gamedata",async (req,res)=>{
    let cards = await Games.find();
    res.status(200).json(cards)
    
})

app.post("/api/lobby", async (req,res)=>{
    let lobbydetail = req.body;
    
    const lobby = new Lobby(lobbydetail);
    const savedLobby = await lobby.save();

    console.log("Lobby created:", savedLobby);
    res.status(201).json(savedLobby);
})

app.listen(5000, ()=>{
    console.log("listening");
})