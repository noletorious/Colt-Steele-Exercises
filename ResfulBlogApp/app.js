var express         = require("express"),
    expressSanitizer= require("express-sanitizer"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    ejs             = require("ejs"),
    app             = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",{useNewUrlParser: true });
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//SCHEMA/MODEL

var blogSchema = new mongoose.Schema({
    title:String,
    image:{
        type:String,
        default:"https://via.placeholder.com/1280x720.png?text=Noel's+Blog+App"
    },
    body:String,
    created:{
        type:Date,
        default:Date.now()
    }
});
var Blog = mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES

//Redirect to Index
app.get("/",function(req,res){
    res.redirect("/blog")
});

//Index
app.get("/blog",function(req,res){
    Blog.find({},function(err,posts){
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{posts:posts});
            console.log("INDEX REQUESTED")
        }
    });
});

//New - display form so we can create
app.get("/blog/new",function(req,res){
    res.render("new.ejs");
});

//Create - route that handles new info from New
app.post("/create", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, post){
        if(err){
            console.log(err);
            res.render("new.ejs");
        }else{
            res.redirect("/blog");
            console.log("post")
        }
    });
});

//Show - Showing a single post
app.get("/blog/:id",function(req, res){
    var id=req.params.id;
    Blog.findById(id, function(err, postContent){
        if(err){
            res.redirect("/");
            console.log(err);
        } else {
           res.render("post.ejs",{post:postContent}) 
        }
    });
    
});

//Edit - show a screen to edit an existing post
app.get("/blog/:id/edit", function(req, res){
    var id=req.params.id;
    Blog.findById(id, function(err, postContent){
        if(err){
            res.redirect("/");
            console.log(err);
        } else {
           res.render("edit.ejs",{post:postContent}) 
        }
    });
});

//Update - Showing a single post
app.put("/blog/:id",function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var id=req.params.id;
    var data=req.body.blog;
    Blog.findByIdAndUpdate(id, data, function(err, updatedContent){
        if(err){
            res.redirect("/");
            console.log(err);
        } else {
            
           res.redirect("/blog/"+ id);
        }
    });
});

//Delete - delete a single post
app.delete("/blog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog");
        }else{
            res.redirect("/blog");
        }
    });
})

//SETUP SERVER
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Blog app is now running...")
});
