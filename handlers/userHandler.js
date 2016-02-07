var User = require('../mongoModels/User');
var crypto = require('crypto');



exports.getUser = function(req, res){
    var id = req.params.id
    User.findById(id, function (err, user) {
        if(!user){
            res.status(404).end()
        }else{
            res.status(200).send(user)

        }
    })
};



exports.saveUser =  function(req, res){
    var password = req.body.password;
    var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        password = shaSum.digest('hex')


    var data = {
        name: req.body.name,
        email: req.body.email,
        password: password
    };

    var newUser = new User(data);


    newUser.save(function(err, user){
        if(err){
            console.log(err)
            res.status(400).send(err)

        }else{
            console.log('New user ' + user);
            req.session._id = user._id;
            console.log('Session opened ', req.session._id)
            res.status(200).send(user)

        }
    });
};

exports.updateUser = function(req, res){
    console.log(req.params)
    console.log(req.body)

    var id = req.params.id;

    User.update({_id: id}, req.body, function(err, user){
        if(err){
            console.log(err)
            res.status(403).send('User with such email is already exist')
        }else{
            res.status(200).send(user)
        }
    })

};

exports.delteAccount = function(req, res){
    console.log('Delete user handler');
    var id = req.params.id
    User.findByIdAndRemove(id, function(err, user){

        console.log('User deleted')
        req.session.destroy()
        res.status(200).send({message: "User was deleted successfully"})
    })

}