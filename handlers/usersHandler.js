var User = require('../mongoModels/User');


exports.getAllUSers = function(req, res){
    User.find({}, function(err, users){
        res.status(200).send(users)
    })
};