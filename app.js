const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let posts = [];

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {
        startingContent: homeStartingContent
    }); 
    console.log(posts);
});

app.get("/about", function(req, res){
    res.render("about", {
        aboutContent: aboutContent
    });
    
});

app.get("/contact", function(req, res){
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req,res){
   
    const post = {
        title : req.body.postTitle,
        content : req.body.postBody
    }
    posts.push(post);
    res.redirect("/");
})




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });