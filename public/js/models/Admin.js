define([
    './User'
], function(User){
    var Admin = User.extend({
        defaults:{
            admin: true
        }
    });

    return Admin
});