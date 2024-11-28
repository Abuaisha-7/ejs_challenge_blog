const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {
        homeStartingContent: "Home",
        
    }); 

});




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });