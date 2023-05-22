const mongoose = require("mongoose");

const collectionName = "messages";

const chatsSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  message: String,
});
const chatsModel = mongoose.model(collectionName, chatsSchema);

module.exports = chatsModel;
