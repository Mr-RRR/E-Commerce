const userModel = require("../models/userSchema");
const productsModel = require('../models/productSchema')
const cartproduct = require('../models/cartSchema')
const jwt = require("jsonwebtoken")
const uuid = require("uuid");
// const cartProducts = require("../models/cartSchema");

async function loginHandle(req, res) {
  try {
    const { email, password } = req.body;
      const data = await userModel.findOne({ "email": email });
      if (data && email == data.email && password == data.password) {
        let payload = { subject: data._id }
        let token = jwt.sign(payload, 'Secret Key')
        res.status(200).send({ token, data});
      } else {
        res.send({ msg: "No User Found" });
      }
  } catch (err) {
    console.log(err);
  }
}

async function registerHandle(req, res) {
  try {
    const data = req.body;
    const { name, email, password, confirm_password } = data;
    const dataDB = await userModel.findOne({"email": email })
    console.log("DataDb ", dataDB)
    if(dataDB) {
      if(email == dataDB.email) {
        res.send({ msg: "User Alreay exists" })
      }
    } else {
        // if (password !== confirm_password) {
        //   res.send({ msg: "Password doesn't match" });
        // } else if (password.length < 7) {
        //   res.send({ msg: "Password length should be greater then 7" });
        // } else {
          const user = new userModel({
            name: name,
            email: email,
            password: password,
          });
          await user.save((err,registeredUser) => {
            if(err) console.log(err);
            else {
              let payload = { subject: registeredUser._id }
              let token = jwt.sign(payload, 'Secret Key')
              res.status(200).send({ token,user })
            }
          });
        // }
      } 
    }
    catch (err) {
      console.log(err);
  }
}

async function addProductsHandle(req,res) {
  try {
    const url = "http://localhost:5000/uploads/";
    const data = req.body;
    const { title, quantity, price, description } = data
    // if(quantity < 0) 
    const product = new productsModel({
      // id: uuid.v4(),
      title: title,
      productImage: url + req.file.filename,
      quantity: quantity,
      price: price,
      description: description,
    })
    await product.save((err, info) => {
      if(err) console.log(err)
      res.status(200).send(info)
    })
  } catch(err) {
    console.log(err)
  }
}

function verifyToken(req,res,next) {
  if(!req.headers.authorization) {
    return res.status(401).send("Unauthorized request")
  }
  let token = req.headers.authorization.split(" ")[1]
  if(token == "null") {
    return res.status(401).send("Unauthorized request")
  }
  jwt.verify(token, 'Secret Key', (err, decoded) => {
    if(err) console.log("ERROR")
    req.userId = decoded.subject
  })
  // if(!payload) {
  //   return res.status(401).send("Unauthorized request")
  // }
  next()
}

async function viewProductsHandle(req,res) {
  const data = await productsModel.find();
  res.status(200).send(data)
}

async function getProductsHandle(req,res) {
  const data = await productsModel.find();
  res.status(200).send(data)
}

async function addCartProductHandle(req,res) {
  try {
    const data = req.body;
    const {_id, id, title, productImage, price } = data
    // await cartproduct.findById(_id,(err,docs) => {
    //   if(err) console.log("No Product Found")
    //   console.log("info ",docs)
    // })
    // console.log("pre ", pre);
    // if(pre) {
    //   let q = pre.quantity + 1;
    //   await cartproduct.updateOne({ "_id" : req.body._id }, {$set : { quantity: q}})
    //   res.status(200).send("Successful")
    // } else {
        let q = 1;
        const product = new cartproduct({
        userId: id,
        productId: _id,
        title: title,
        productImage: productImage,
        quantity: q,
        price: price 
      })
      product.save((err,info) => {
        if(err) console.log(err)
        res.status(200).send(info)
      })
    // }
    
  } catch(err) {
    console.log(err)
  }
}

async function getCartProductHandle(req,res) {
  try {
    const data = await cartproduct.find()
    res.status(200).send(data)
  } catch(err) {
    console.log(err)
  }
}

async function deleteCartProductHandle(req,res) {
  try {
    const deletedData = await cartproduct.findByIdAndDelete(req.params.id)
    const data = await cartproduct.find()
    // console.log(deletedData)
    res.status(200).send(data)
  } catch(err) {
    console.log(err)
  }
}

async function updateCartProductHandle(req,res) {
  try {
    const id = req.params.id;
    const prevData = req.body
    await cartproduct.updateOne({productId: id}, {$set: {quantity: ++prevData.quantity}})
    const data = await cartproduct.find()
    res.send(data)
  } catch(err) {
    console.log(err)
  }
}


async function deleteProductHandle(req,res) {
  try {
    // console.log(req.params.id)
    const deletedData = await productsModel.findByIdAndDelete(req.params.id)

    // console.log(deletedData)
    res.status(200).send("Successful")
  } catch(err) {
    console.log(err)
  }
}

async function viewProductHandle(req,res) {
  try {
    const id = req.params.id;
    console.log(id)
    await productsModel.findById(id,(err,info) => {
      if(err) console.log(err)
      res.status(200).send(info)
    })

  } catch(err) {
    console.log(err)
  }
}



module.exports = { loginHandle, registerHandle, verifyToken, addProductsHandle, viewProductsHandle, getProductsHandle, deleteProductHandle, addCartProductHandle, viewProductHandle, getCartProductHandle, deleteCartProductHandle, updateCartProductHandle };
