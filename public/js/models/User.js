define([

], function(){

    var User = Backbone.Model.extend({
        defaults:{
            admin: false
        },
        urlRoot: '/user',
        idAttribute: '_id'
    });

    return User
});