const mongoose              = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
    }
  });
  UserSchema.plugin(passportLocalMongoose)
  module.exports = mongoose.model("User", UserSchema)