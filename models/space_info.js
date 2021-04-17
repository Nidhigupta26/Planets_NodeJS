const mongoose = require("mongoose")

const SpaceSchema = new mongoose.Schema({
  type: String,
  description: String
})

module.exports = mongoose.model("Space", SpaceSchema)