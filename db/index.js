const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@coder.n7ppfjp.mongodb.net/coder?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
