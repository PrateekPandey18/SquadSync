require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io")
const cors = require('cors');
const mongoose = require("mongoose");
const Games = require("./models/games.js");
const Lobby = require("./models/lobby.js");
const { asyncWrapProviders } = require("async_hooks");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/user.js")
const {verifyToken} = require("./middleware.js")
const cookieParser = require("cookie-parser")

main().then(()=>{console.log("succuess")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SquadSync');
}

app.use(cookieParser());

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

    socket.on("join_lobby_room",async (lobbyId)=>{
        socket.join(lobbyId);
        let user = await Lobby.findByIdAndUpdate(lobbyId,{$push: {users:"user"}})
        socket.to(lobbyId).emit("user_joined",{
            user: user,
        })
    })
})

const saltRounds = 10;

app.post("/signup", async (req,res) => {
    const {username,email,password} = req.body;
    const hash = await bcrypt.hash(password,saltRounds);
    console.log(hash)
    const newUser = new User({username,email,password:hash})
    const saved = await newUser.save();
    console.log(saved)
    res.status(201).json({message:"userRegistered"})
})

app.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    const user =await User.findOne({username:username})
    if (!user) {
            return res.status(401).json({ message: "Invalid username " });
        }
    const match = await bcrypt.compare(password,user.password)
    if (!match) {
            return res.status(401).json({ message: "Invalid password" });
        }
    const token = jwt.sign(
        {id:user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:3600000
    })
    res.json({message:"logged in successfully"})

})

app.get("/api/homepage",verifyToken,(req,res)=>{
    res.status(200).json({ id: req.user.id, username:req.user.username, isAuthenticated: true});
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
    let lobby = await Lobby.findById(id)
    console.log(lobby.chats,lobby.users)
    res.status(201).json({
        chats:lobby.chats,
        users:lobby.users
    })
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