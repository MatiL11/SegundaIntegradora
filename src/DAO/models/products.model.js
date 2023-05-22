const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const collectionName = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: {
    type: Number,
    default: 1,
  },
  category: String,
  thumbnail: String,
});

productSchema.plugin(paginate);

const productModel = mongoose.model(collectionName, productSchema);

module.exports = productModel;
