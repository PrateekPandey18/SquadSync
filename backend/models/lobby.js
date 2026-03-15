const mongoose = require("mongoose");
const Schema = mongoose.Schema

const lobbySchema = new Schema({
    title: String,
    mode:String,
    squadSize:Number,
    rankIndex:Number,
    description:String,
    users:[{
        type:String,
    }],
    chats: [{
        message:String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
})

const Lobby = mongoose.model("Lobby",lobbySchema);
module.exports = Lobby