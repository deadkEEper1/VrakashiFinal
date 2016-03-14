var User = require('../mongoModels/User');


exports.getAllUSers = function(req, res){
    var UserId = req.session.user._id;

    User.find({})
        .where('_id').ne(UserId)
        .exec(function(err, users){
            res.status(200).send(users)
        })
};