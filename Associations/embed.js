var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo",{useNewUrlParser: true });

//Here we are associating data by embedding them into each other.
//USER can have many POSTS, POSTS can only have one User. 

//POST - title, content
var postSchema = new mongoose.Schema({
    title:String,
    content:String
});
var Post = mongoose.model("Post",postSchema);

//embedding postSchema into userSchema

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});
var User = mongoose.model("User", userSchema);


// make a new user - James
// var newUser = new User({
//     email:"james@gmail.com",
//     name:"James Darmady"
// });
// newUser.posts.push({
//     title:"I am a killer, so don't push me",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel luctus nisl. Donec non lorem non urna dapibus sagittis. Pellentesque ut aliquet felis. Morbi cursus vehicula mi vel elementum. Aenean fermentum, felis eu posuere tempor, elit diam feugiat orci, vel ultrices velit lorem ut lorem. Praesent sem dui, volutpat viverra tincidunt at, congue sit amet turpis. Sed vitae magna ut mauris vestibulum varius sed vel elit. Integer semper risus vitae mauris sollicitudin egestas. Etiam nec porta justo."
// });
// newUser.save(function(err, user){
//     if (err){
//         console.log(err) 
//     }else{
//         console.log(user)
//     }
// });

//make a new user - knucky
// var newUser = new User({
//     email:"knucky@gmail.com",
//     name:"Enoch Thompson"
// });
// newUser.save(function(err, user){
//     if (err){
//         console.log(err) 
//     }else{
//         console.log(user)
//     }
// });

//make a new post
// var newPost = new Post({
//     title:"How to get away with Murder",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel luctus nisl. Donec non lorem non urna dapibus sagittis. Pellentesque ut aliquet felis. Morbi cursus vehicula mi vel elementum. Aenean fermentum, felis eu posuere tempor, elit diam feugiat orci, vel ultrices velit lorem ut lorem. Praesent sem dui, volutpat viverra tincidunt at, congue sit amet turpis. Sed vitae magna ut mauris vestibulum varius sed vel elit. Integer semper risus vitae mauris sollicitudin egestas. Etiam nec porta justo."
// });
// newPost.save(function(err, post){
//     if (err){
//         console.log(err) 
//     }else{
//         console.log(post)
//     }
// });

//find user with no posts and push in posts
User.findOne({email:"knucky@gmail.com"}, function(err,user){
    if(err){
        console.log(err)
    }else{
        user.posts.push({
            title:"Hey, This is not what I signed up for",
            content:"Oh lordy, you better clean up all that blood son"
        });
        user.save(function(err, user){
            if(err){
                console.log(err)
            }else{
                console.log(user)
            }
        });
    }
})