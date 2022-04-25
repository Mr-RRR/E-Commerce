const userModel = require("../models/userSchema");
const productsModel = require('../models/productSchema')
const jwt = require("jsonwebtoken")

async function loginHandle(req, res) {
  try {
    const { email, password } = req.body;
      const data = await userModel.findOne({ "email": email });
      if (data && email == data.email && password == data.password) {
        let payload = { subject: data._id }
        let token = jwt.sign(payload, 'Secret Key')
        res.status(200).send({ token });
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
              res.status(200).send({ token })
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
    console.log(req.file)
    const data = req.body;
    const { title, quantity, price, description } = data
    const product = new productsModel({
      title: title,
      productImage: req.file.path,
      quantity: quantity,
      price: price,
      description: description,
    })
    await product.save((err, info) => {
      if(err) console.log(err)
      res.status(200).send(info)
    })
    console.log(req.body)
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
  let payload = jwt.verify(token, 'Secret Key')
  if(!payload) {
    return res.status(401).send("Unauthorized request")
  }
  req.userId = payload.subject
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

async function deleteProductHandle(req,res) {
  try {
    console.log(req.params.id)
    const deletedData = await productsModel.findByIdAndDelete(req.params.id)
    console.log(deletedData)
    res.status(200).send("Successful")
  } catch(err) {
    console.log(err)
  }
}

module.exports = { loginHandle, registerHandle, verifyToken, addProductsHandle, viewProductsHandle, getProductsHandle, deleteProductHandle };
