const mongoose = require("mongoose");
const Schema = mongoose.Schema

const lobbySchema = new Schema({
    title: String,
    mode:String,
    squadSize:Number,
    rankIndex:Number,
    description:String,
})

const Lobby = mongoose.model("Lobby",lobbySchema);
module.exports = Lobby