const mongoose = require("mongoose");

const CartProducts = mongoose.Schema({
  userId: {
    type: String
  },
  productId: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  productImage: {
    type: String  ,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const cartProducts = mongoose.model("CartProducts", CartProducts);
module.exports = cartProducts;
