var User = require('../mongoModels/User');
var crypto = require('crypto');

exports.getSession =  function(req, res){
    if(req.session.user && req.session.user._id !== undefined){

        User.findById(req.session.user._id)
            .populate('friends.outcomeRequests')
            .populate('friends.incomeRequests')
            .populate('friends.friends')
            .populate('posts')
            .exec(function (err, user) {
                if(!user){
                    console.log('err', err);
                    res.status(401).end()
                }else{
                    console.log('user', user);
                    res.send(user)
                }
            })
    }else{
        res.status(404).send()
    }

    };


exports.logIn = function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    var shaSum = crypto.createHash('sha256');

        shaSum.update(pass);
        pass = shaSum.digest('hex');

    User.findOne({email: email, password: pass}, function (err, user) {
        if(!user){
            res.status(404).send()
        }else{
            req.session.user = user;
            res.send(user)
        }
    })
};


exports.logOut = function(req, res){

    req.session.destroy();
    res.send()
};
