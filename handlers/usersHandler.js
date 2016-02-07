var User = require('../mongoModels/User');


exports.getAllUSers = function(req, res){
    console.log('getAllUsers')
    User.find({}, function(err, users){
        console.log(users)
        res.status(200).send(users)
    })
}