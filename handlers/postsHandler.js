var Post = require('../mongoModels/Post')


exports.getAllPosts = function(req, res) {
    console.log(req.params)
    console.log(req.body)

    Post.find({})
        .populate('author')
        .exec(function(err, posts){
            if(err){
                res.send()
            }else{
                console.log(posts)
                res.status(200).send(posts)
            }
        })

};


exports.findByAuthor = function(req, res){
    var author = req.params.author;
    Post.find({author: author}, function(err, posts){
        res.send(posts)

    })
};