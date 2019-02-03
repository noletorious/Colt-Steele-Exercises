var express = require("express");
var app = express();
var request = require("request");

//set so we don't need to add extension
//app.set("view engine", "ejs");

app.get("/", function(req, res){
    console.log("Home page requested...");
    res.render("search.ejs");
});

//when user searches, results pages does the API call
app.get("/results",function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=9034a733&s=" + query;
    request(url,function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results.ejs", {data:data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is now being served...");
});