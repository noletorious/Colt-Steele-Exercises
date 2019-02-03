var express = require("express");
var app = express();

// Routes
app.get("/", function(req, res){
    res.send("Hello");
});

//category
app.get("/category/:categoryname", function(req, res){
    res.send("You made it to the " + req.params.categoryname + " category page.");
    console.log(req);
});

//post pages
app.get("/post/:id/", function(req, res){
    res.send("You made it to a post");
});

//404
app.get("*", function(req, res){
    res.send("404 Bro");
});


// listen for request (listen for server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});