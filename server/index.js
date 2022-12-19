require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path')
const cors = require("cors");
// const DB_USER = process.env.DB_USER;
// const DB_NAME = process.env.DB_NAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const PORT = process.env.PORT;
const router = require("./routes/router");

const URL =
  "mongodb+srv://raj1234:raj1234@mycluster.9okjp.mongodb.net/ECommerce?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"/uploads/")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(5000, () => console.log(`running on server 5000`));
