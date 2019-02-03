var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

//Array is outside the routes so there is less scoping issues, databases will fix this
friends = [
        "Tom", "Jonathan", "Brian"
        ]
        

app.get("/", function(req, res){
    res.render("index");
});

app.get("/friends",function(req,res){
    res.render("friends", {friendsList:friends});
});

app.post("/addfriend", function(req, res){
    res.redirect("/friends");
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
});

app.listen(process.env.PORT, process.env.ID, function(){
    console.log("Server started...");
});