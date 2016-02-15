define([
    '../models/User'
],function(UserModel) {

    var Users = Backbone.Collection.extend({
        model: UserModel,
        url: '/users'
    })

    return Users
});