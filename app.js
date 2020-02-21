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

// Blog.create({
//   title: "How to get started in Web Development in 2020",
//   image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
//   body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
//   tags: ["webDev", "2020", "development", "general"]
// });

app.get("/", (req, res)=>{
  res.redirect("/blogs");
});

//INDEX ROUTE blogs

app.get("/blogs", (req, res)=>{
  Blog.find({}, (err, blogs)=>{
    if(err){
      console.log("Index route ERR");
    } else {
      res.render("index", {blogs: blogs})
    }
  });
});

//INDEX ROUTE tags

//NEW ROUTE

app.get("/blogs/new", (req,res)=>{
   res.render("new");
});

//SHOW ROUTE blog posts
app.get("/blogs/:id", (req, res)=>{
  Blog.findById(req.params.id, (err, foundPost)=>{
    if(err){
      console.log("Show route Error");
      res.redirect("/blogs");
    } else {
      res.render("show", {post : foundPost});
    }
  });
});

//SHOW ROUTE tags


//EDIT ROUTE


app.listen("3000", process.env.PORT, ()=>{
  console.log("Server 3000 running...");
});