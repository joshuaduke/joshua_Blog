let express = require('express');
let app = express();
let mongoose = require("mongoose");
let bodyParser = require('body-parser');

app.set("view engine", "ejs"); // ejs files

app.get("/", (req, res)=>{
  res.send("This is the homepage");
});

app.listen("3000", process.env.PORT, ()=>{
  console.log("Server 3000 running...");
});