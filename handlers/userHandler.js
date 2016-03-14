var User = require('../mongoModels/User');
var crypto = require('crypto');


exports.getUser = function(req, res){
    var id = req.params.id;

    User.findById(id)
        .populate('posts')
        .exec(function(err, user){
            res.send(user);
        })
};

exports.saveUser =  function(req, res){
    var password = req.body.password;

    var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        password = shaSum.digest('hex');

    var data = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        admin: req.body.admin
    };

    var newUser = new User(data);

        newUser.save(function(err, user){
        if(err){
            console.log(err);
            res.status(400).send(err)

        }else{
            req.session.user = user;
            res.status(200).send(user)
        }
    });
};

exports.updateUser = function(req, res){
    var id = req.params.id;

    User.update({_id: id}, req.body, function(err, user){
        if(err){
            res.status(403).send('User with such email is already exist')
        }else{
            res.status(200).send(user)
        }
    })
};

exports.delteAccount = function(req, res){
    var id = req.params.id;

    User.findByIdAndRemove(id, function(err, user){
        if(req.session_id == id){
            req.session.destroy();
        }

        res.status(200).send({message: "User was deleted successfully"})
    })

};


exports.sendFriendReq = function (req, res) {
    var accountId      = req.body._id;
    var userId         = req.session.user._id;

    User.findOne({_id: userId}, function(err, user){
        user.sendFriendReq(userId, accountId);
        res.status(200).send({})
    });

};

exports.acceptFriend = function(req, res){
    var accId = req.body._id;
    var userId = req.session.user._id;

    User.findById(accId, function(err, user){
        user.acceptFriendRequest(userId, accId);
        res.status(200).send({})
    })
};


exports.deleteFriend = function(req, res){
    var accId = req.body._id;
    var userId = req.session.user._id;

    User.findById(userId, function(err, user){
        user.deleteFriend(userId, accId)
    });

    res.end()
};


exports.sendInvaite = function (req, res) {
    var nodemailer = require('nodemailer');
    var to = req.body.email;
    var userName = req.session.user.name;

    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'deadkEEper1@gmail.com',
            pass: 'de3ertir'
        }
    });

    var mailOptions = {
        to: to,
        subject: 'Inviting message',
        text: 'Hello, this is Vrokashi social network support team. Your friend '        +
        userName + ' wanna see you among the members of our network. Check out us here ' +
        "http://localhost:3030 " + 'Will be glad to see you.'
    };

    smtpTransport.sendMail(mailOptions, function(err, data){
        res.redirect('/#myaccount')
    })

};