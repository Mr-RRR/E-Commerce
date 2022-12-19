const mongoose = require("mongoose");

const products = mongoose.Schema({
  // id: {
  //   type: Number,
  // },
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
  },
  description: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", products);
module.exports = Products;
