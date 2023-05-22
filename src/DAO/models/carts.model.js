const mongoose = require("mongoose");

const collectionName = "carts";

const cartsSchema = new mongoose.Schema([
  {
    priceTotal: Number,
    quantityTotal: {
      type: Number,
      default: 0,
    },
    products: {
      type: [
        {
          products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number,
            default: 1,
          },
          id: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
]);

const cartsModel = mongoose.model(collectionName, cartsSchema);

module.exports = cartsModel;
