var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user.js"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

var app = express();
app.use(bodyParser.urlencoded({extended: true})); //anytime using a form 
app.use(require("express-session")({
  secret:"Hay bae bae, hay bae bae.",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


//passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);


app.get("/",function(req,res){
   res.render("home.ejs"); 
});

//page after login
app.get("/secret",isLoggedIn,function(req,res){
   res.render("secret.ejs"); 
});

//Register
app.get("/register", function(req, res){
   res.render("register.ejs"); 
});
app.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("register.ejs")
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret")
            });
    });
});

//Login
app.get("/login", function(req, res){
   res.render("login.ejs"); 
});
app.post("/login", passport.authenticate("local",{   
    successRedirect: '/secret',
    failureRedirect: '/login' 
    }), function(req,res){
});

//Logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
})


//middleware to check if user is logged in

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//start server
app.listen(process.env.PORT, process.env.ID, function(){
    console.log("Server running...")
});