const express = require("express");
const router = express.Router();
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null, './uploads/')
  },
  filename: function(req,file,cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({storage: storage, fileFilter: fileFilter})

const { loginHandle, registerHandle, addProductsHandle, viewProductsHandle, getProductsHandle, deleteProductHandle, addCartProductHandle, viewProductHandle,getCartProductHandle, deleteCartProductHandle,verifyToken, updateCartProductHandle } = require("../controllers/index");

router.get("/dashboard", verifyToken , (req,res) => {
  getProductsHandle(req,res);
})

router.post("/login", (req, res) => {
  loginHandle(req, res);
});

router.post("/register", (req, res) => {
  registerHandle(req, res);
});

router.post('/add-products', upload.single('productImage'), (req,res) => {
  addProductsHandle(req,res) 
})

router.get('/view-products', (req,res) => {
  viewProductsHandle(req,res)
})

router.delete('/delete/:id',(req,res) => {
  deleteProductHandle(req,res)
})

router.get('/view-product/:id',(req,res) => {
  viewProductHandle(req,res)
})

router.post('/add-cartproduct', (req,res) => {
  addCartProductHandle(req,res)
})

router.get('/cartproducts',(req,res) => {
  getCartProductHandle(req,res)
})

router.delete('/deletecart/:id',(req,res) => {
  deleteCartProductHandle(req,res)
})

router.put('/updateCart/:id', (req,res) => {
  updateCartProductHandle(req,res)
})
// router.delete('/delete/:id',(req,res) => {
//   deleteProductHandle(req,res);
// })

module.exports = router;
