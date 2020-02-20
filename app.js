let methodOverride  = require('method-override');
let bodyParser      = require('body-parser');
let mongoose        = require("mongoose");
let express         = require('express');
let app             = express();

app.set("view engine", "ejs"); // ejs files
mongoose.connect("mongodb://localhost/JOSHUA_BLOG" ,{ useNewUrlParser: true }); //mongoose connection
app.use(express.static("public")); // To use css stylesheets
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); //look for _method take whatever its equal to and treat that request as a put or delete request

//database schema

/*
  Title
  Image
  Body
  Tags
*/
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now},
  tags: []
});

let Blog = mongoose.model("Blog", blogSchema);


app.get("/", (req, res)=>{
  res.redirect("/blogs");
});

//INDEX ROUTE

app.get("/blogs", (req, res)=>{
  res.render("index");
});

app.listen("3000", process.env.PORT, ()=>{
  console.log("Server 3000 running...");
});