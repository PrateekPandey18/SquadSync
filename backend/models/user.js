const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lobby = require("./lobby")

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    lobbies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lobby",
        
    }],
    games:[{
        game:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Games"
        },
        rank:{
            type: String,
        },
        rankIndex: Number
    }],
    bio:String,
    avatar: String,
    

})

const User = new mongoose.model("User",userSchema)

module.exports = User