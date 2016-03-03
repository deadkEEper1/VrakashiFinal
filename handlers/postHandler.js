var Post = require('../mongoModels/Post');
var User = require('../mongoModels/User');




exports.createPost = function(req, res){
    var title = req.body.title;
    var body  = req.body.body;
    var author = req.body.author;
    var availability = req.body.availability;

    var postId

    var newPost = new Post ({
        title: title,
        body: body,
        author: author,
        availability: availability
    });



    newPost.save(function(err, post){
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log(post)
            postId = post._id
            console.log('Post id is: '+ postId)
            res.status(200).send(post)
        }
    });
};

exports.getPost = function(req, res){
    var id = req.params.id;

    Post.findById(id)
        .populate('author')
        .exec(function(err, post){
            if(!err){
                res.status(200).send(post)
            }else{
                res.status(404).end()
            }
        })
};



exports.deletePost = function(req, res){
    var id = req.params.id;

    Post.findByIdAndRemove(id, function(err, post){
        if(err){
            res.status(404).send()
        }else{
            res.status(200).send(post)
        }
    })
};