var Post = require('../mongoModels/Post');
var User = require('../mongoModels/User');


exports.getAllPosts = function(req, res) {
    var id = req.session.user._id;
    var f;
    User.findById(id, function(err, user){
        f = user.friends.friends;
        f.push(id)
    })
        .exec(function(){
        Post.find({})
            .where('author').in(f)
            .exec(function(err, posts){
                console.log('posts', posts);
                res.send(posts)

            })
    });
};


exports.findByAuthor = function(req, res){
    var author = req.params.author;

    Post.find({author: author}, function(err, posts){
        res.send(posts)

    })
};