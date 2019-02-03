var mongoose = require("mongoose"),
    User = require("./models/users"),
    Post = require("./models/posts");
    
mongoose.connect("mongodb://localhost/blog_demo",{useNewUrlParser: true });

//USER can have many POSTS, POSTS can only have one User. 


//create a user: James Franco
User.create({
    user:"James Franco",
    email:"james@gmail.com"
}, function(err, user){
    if(err){
        console.log(err)
    }else{
        console.log(user)
    }
});

//create a post, find James Franco, and insert post into user array 
// Post.create({
//     title:"This is a stick up!",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis odio purus, pulvinar ullamcorper urna scelerisque et. Pellentesque massa quam."
// },function(err,postCreated){
//     if(err){
//         console.log(err)
//     }else{
//         User.findOne({user:"James Franco"}, function(err,userFound){
//             if(err){
//                 console.log(err)   
//             }else{
//                 userFound.posts.push(postCreated._id);
//                 userFound.save(function(err,data){
//                     if(err){
//                         console.log(err)
//                     }else{
//                         console.log(data)
//                     }
//                 });
//             }
//         });
//     }
// })

User.remove({}, function() {
    Post.remove({}, function() {
        User.create({
            email: "bob@gmail.com",
            name: "Bob Belcher"
        }, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, foundUser){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(foundUser);
                        Post.create({
                          title: "How to cook the best burger pt. 2",
                          content: "blah blah blah blah blah"
                        }, function(err, post){
                            if(err) {
                                console.log(err);
                            } else {
                                User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        foundUser.posts.push(post._id);
                                        foundUser.save(function(err, data){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                console.log(data);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
 
    });
});