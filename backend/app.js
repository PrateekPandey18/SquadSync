const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io")
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
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET","POST","PUT"],
    }
})

io.on("connection",(socket)=>{

    socket.on("send_message", async (data)=>{
        await Lobby.findByIdAndUpdate(data.room,{$push: {chats:{message:data.message}}})
        
        io.to(data.room).emit("receive_message",data);
    })

    socket.on("join_lobby_room", (lobbyId)=>{
        socket.join(lobbyId);
    })
})

app.get("/api/homepage",(req,res)=>{
    res.status(200).json({ message: "Server is up and running!" });
})
app.get("/api/gamedata",async (req,res)=>{
    let cards = await Games.find();
    res.status(200).json(cards)
    
})

app.get("/api/lobby",async(req,res)=>{
    let lobbies = await Lobby.find();
    res.status(200).json(lobbies);
})

app.get("/lobby/:id",async (req,res)=>{
    let {id} = req.params;
    let chats = await Lobby.findById(id)
    console.log(chats.chats)
    res.status(201).json(chats.chats)
})

app.post("/api/lobby", async (req,res)=>{
    let lobbydetail = req.body;
    
    const lobby = new Lobby(lobbydetail);
    const savedLobby = await lobby.save();
    console.log(savedLobby._id)
    io.emit("new_lobby",savedLobby);
    res.status(201).json(savedLobby)
   

})


server.listen(5000, ()=>{
    console.log("listening");
})