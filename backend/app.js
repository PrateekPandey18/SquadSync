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
        console.log(data)
        await Lobby.findByIdAndUpdate(data.room,{$push: {chats:{message:data.message,sender:data.sender}}})
        
        io.to(data.room).emit("receive_message",data);
    })

    socket.on("leave_lobby",async (data)=>{
        const {room,user} = data;
        const updatedLobby = await Lobby.findByIdAndUpdate(room,{$pull:{users:{user:user}}},{new:true}).populate('users.user',"username")
        await User.findByIdAndUpdate(user,{$pull:{lobbies:room}})
        socket.to(room).emit("roster_update", updatedLobby.users);
        socket.leave(room)
    })

    socket.on("disconnect",async ()=>{
        if (socket.currentRoom && socket.currentUserId) {
                
                const updatedLobby = await Lobby.findOneAndUpdate(
                    { _id: socket.currentRoom, "users.user": socket.currentUserId },
                    { $set: { "users.$.online": false } }, 
                    { new: true }
                ).populate('users.user', 'username');

                if (updatedLobby && updatedLobby.users) {
                    socket.to(socket.currentRoom).emit("roster_update", updatedLobby.users);
                }}
    })

    socket.on("ready",async(data)=>{
        const {room,sender,status} = data;
        let updatedLobby = await Lobby.findOneAndUpdate({_id:room,"users.user":sender}, {$set:{"users.$.ready": status}}).populate("users.user","username")
        console.log(updatedLobby)
        io.to(room).emit("roster_update", updatedLobby.users);
    })

    socket.on("join_lobby_room",async (data)=>{
        const { roomId, user } = data;
        socket.currentRoom = roomId;
            socket.currentUserId = user;
        // console.log(user)
        socket.join(roomId);
        let lobby = await Lobby.findById(roomId);
        
        const isAlreadyInLobby = lobby.users.some(u => u.user && u.user.toString() === user.toString());
        if(isAlreadyInLobby){
            let populatedLobby = await Lobby.findOneAndUpdate({_id:roomId, "users.user":user},{$set:{"users.$.online":true}},{new:true}).populate("users.user","username");
            io.to(roomId).emit("roster_update", populatedLobby.users);
        }
        else if (lobby.users.length<lobby.squadSize){
            let updatedLobby = await Lobby.findByIdAndUpdate(roomId,{$addToSet:{users:{user:user,online:true}}},{new:true}).populate('users.user', 'username')
            await User.findByIdAndUpdate(user,{$addToSet:{lobbies:roomId}},{new:true})
            io.to(roomId).emit("roster_update", updatedLobby.users);
         } 
        else socket.emit("join_error", "redirect")
        
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
    console.log({id:user._id,username:user.username,isAuthenticated:true})
    res.json({id:user._id,username:user.username,isAuthenticated:true})

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
    let lobby = await Lobby.findById(id).populate("users","username")


    res.status(201).json({
        lobby:lobby
    })
})

app.post("/api/lobby", verifyToken,async (req,res)=>{
    let lobbydetail = req.body;
    
    const lobby = new Lobby({...lobbydetail,owner:req.user.id});
    console.log(lobby)
    const savedLobby = await lobby.save();
    await User.findByIdAndUpdate(req.user.id,{$addToSet:{lobbies:savedLobby._id}})
    console.log(savedLobby._id)
    io.emit("new_lobby",savedLobby);
    res.status(201).json(savedLobby)
   

}) 
app.get("/userLobbies",verifyToken,async(req,res)=>{

    let user = await User.findById(req.user.id).populate("lobbies","title description")
    console.log(user)
    res.status(200).json(user.lobbies)
})


server.listen(5000, ()=>{
    console.log("listening");
})