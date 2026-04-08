const mongoose = require("mongoose");
const User = require("./user")
const Schema = mongoose.Schema

const lobbySchema = new Schema({
    title: String,
    mode:String,
    squadSize:Number,
    rankIndex:Number,
    description:String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    users:[
        { user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        online: {
            type:Boolean,
            default:true,
        },
        ready: {
            type:Boolean,
            default:false,
        }
    }],
    chats: [{
        message:String,
        sender:String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
})

const Lobby = mongoose.model("Lobby",lobbySchema);
module.exports = Lobby