const mongoose = require("mongoose");

const collectionName = "users";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const Users = mongoose.model(collectionName, UserSchema);

module.exports = Users;
