var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    name:{
        required: true,
        type: String
    },
    email:{
        unique: true,
        required: true,
        type: String

    },
    password:{
        required: true,
        type: String
    },

    admin: {
        type: Boolean,
        required: true
    },

    friends:{
       incomeRequests:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        outcomeRequests:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'

        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'

        }]
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }]

});


userSchema.methods.sendFriendReq = function(userId, accountId){

    User.findById(userId, function(err, user){
        user.friends.outcomeRequests.push(accountId);
        user.save();
        return

    });

    User.findById(accountId, function(err, user){
        user.friends.incomeRequests.push(userId);
        user.save();
        return
    });
};

userSchema.methods.acceptFriendRequest = function(userId, accountId){
    console.log('Accept friend');
    User.findById(userId, function(err, user){

         user.friends.incomeRequests.forEach(function(user, index, array){
             console.log(user)
             if(user == accountId){
                 array.splice(index, 1)
             }
         });
        user.friends.friends.push(accountId);
        user.save();
        return

    });

    User.findById(accountId, function(err, user){
         user.friends.outcomeRequests.forEach(function(user,index, array){
             console.log(user)
             if(user == userId){
                 array.splice(index, 1)
                 console.log('true')

             }
         });
        user.friends.friends.push(userId);
        user.save();
        return
    });
}

userSchema.methods.deleteFriend = function (userId, accountId) {

    console.log('Delete friend');
    User.findById(userId, function(err, user){

        user.friends.friends.forEach(function(user, index, array){
            if(user == accountId){
                array.splice(index, 1)
            }
        });
        user.save();
        return

    });

    User.findById(accountId, function(err, user){
        user.friends.friends.forEach(function(user,index, array){
            if(user == userId){
                array.splice(index, 1)

            }
        });
        user.save();
        return
    });
}
var User = mongoose.model('users', userSchema);



module.exports = User;
