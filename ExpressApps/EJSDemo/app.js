var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
    console.log("Home page was requested.");
});

app.get("/love/:thing", function(req, res){
    var thingaling = req.params.thing;
    res.render("love.ejs", {loveThing:thingaling});
    console.log("Love page was requested.");
});

// listen for request (listen for server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});