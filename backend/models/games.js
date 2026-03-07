const mongoose = require("mongoose");
const Schema = mongoose.Schema


const gameSchema = new Schema({
  title: String,
  image: String,
  filters:{
    modes:[String],
    rankLabel:[String],
    rankOptions:[String],
  }

})
const Games = mongoose.model("Games",gameSchema)
module.exports = Games