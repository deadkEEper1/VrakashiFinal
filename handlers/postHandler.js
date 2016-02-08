var Post = require('../mongoModels/Post');



exports.createPost = function(req, res){
    var title = req.body.title;
    var body  = req.body.body;
    var author = req.body.author;

    var newPost = new Post ({
        title: title,
        body: body,
        author: author
    });

    newPost.save(function(err, post){
        if(!err){
            res.send(post)
        }
    });
};

exports.getPost = function(req, res){
    var id = req.params.id
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
}