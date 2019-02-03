var express = require("express");
var app = express();

//so we don't have to add .ejs to res.render(filename)
app.set("view engine", "ejs");

app.get("/", function(req, res){
    posts = [
        {title:"Title 1",author:"Tom Delonge"},
        {title:"Title 2",author:"Mark Hoppus"},
        {title:"Title 3",author:"Travis Barker"}
        ]
    res.render("index",{posts:posts});
    console.log("Home page requested");
});

app.use(express.static("public"));

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server is now serving...");
});