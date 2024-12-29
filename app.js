const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-heyru:Test123@cluster0.dqdps.mongodb.net/blogDB");

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);



app.get("/", function(req, res){

    Post.find().then(function(foundPosts){
        res.render("home", {
            startingContent: homeStartingContent,
            posts: foundPosts
        });
    });
    

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

app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase (req.params.postName);

    Post.find().then(function(foundPosts){

        foundPosts.forEach(function(post){
            const storedTitle = _.lowerCase (post._id);
            if(storedTitle === requestedTitle){
                res.render("post", {
                 post: post
                });
            } 
        })

    });
        
  
});

app.post("/compose", function(req,res){
   
    const newPost = new Post({
        title : req.body.postTitle,
        content : req.body.postBody
    });

    if(newPost.title === "" || newPost.content === ""){
        res.redirect("/compose");
    } else {
        newPost.save();
        res.redirect("/");
    }
   
    
})


const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Server started on port 3000");
  });