var express = require("express");
var app = express();

// Routes
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment.");
});

//category
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig:"Oink",
        cow:"Moo",
        dog:"Woof Woof"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " goes '" + sound + "'");
});

//post pages
app.get("/repeat/:repeatname/:number/", function(req, res){
        var message = req.params.repeatname;
        var times = Number(req.params.number);
        var result = "";
        for(var i =0;i<times;i++){
            result += message + " ";
        }
        res.send(result);
        console.log(req)
});

//404
app.get("*", function(req, res){
    res.send("404 Bro");
});


// listen for request (listen for server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});