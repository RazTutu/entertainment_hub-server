const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
// routes
const AuthRoute = require("./routes/authRoute")

// app config
const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected")
  })
  .catch(err => {
    console.error("db connection error:  ", err)
  })

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
}));

app.use(cookieSession({
  maxAge: 24*60*60*1000, // one day
  keys: ["someBigAndRandomKey394r9230fj"]  // encrypt_id
}));

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// ------------- routes ---------------
app.get("/", (req, res) => {
  res.status(200).send("hello here")
});
app.use("/auth", AuthRoute);

// listener
app.listen(process.env.PORT || port, () => {
  console.log(`server started on ${port}`)
});