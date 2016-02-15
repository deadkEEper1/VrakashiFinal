var User = require('../mongoModels/User');
var crypto = require('crypto');

exports.getSession =  function(req, res){
    if(req.session._id !== undefined){
        User.findById(req.session._id, function(err, user){
            console.log("User founded");
            res.send(user)
        })
    }else{
        res.status(401).send()
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
            req.session._id = user._id;
            res.send(user)
        }
    })
};

exports.logOut = function(req, res){

    req.session.destroy();
    res.send()
};
