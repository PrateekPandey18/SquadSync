const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Games = require("./models/games.js");


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

app.listen(5000, ()=>{
    console.log("llistening");
})