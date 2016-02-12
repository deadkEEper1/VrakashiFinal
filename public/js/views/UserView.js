define([
    'text!templates/UserTemplate.html',
    '../collections/Posts',
    'text!templates/PostsListTemplate.html',
    '../models/User'

], function(UserTemplate, Posts, PostsListTemplate, User){
    var UserView = Backbone.View.extend({

        el: '#content',

        template: _.template(UserTemplate),
        usersPostsTemplate: _.template(PostsListTemplate),

        events:{
            'click #deleteThisUser' : 'deleteThisUser'
        },

        initialize: function(){
            console.log('User View inited');
            var that = this
            this.usersPosts = null

            var usersPosts = new Posts();
                usersPosts.fetch({
                    url: '/posts/' + this.model._id,
                    async: false,

                    success: function(res, posts){
                        that.usersPosts = posts
                    }
                })

            $.ajax({
                url: '/session',
                method: 'GET',

                success: function(user){
                    if(user.admin){
                        $('#adminScope').html('<button id="deleteThisUser">Delete User(Admin button) </button>')
                    }

                }
            })
        },

        render: function(){
            this.$el.html(this.template(this.model));
            if(this.usersPosts.length){
                $('#posts_list').html(this.usersPostsTemplate(this.usersPosts))
            }
        },

        deleteThisUser : function(){
            var thisUser = new User({_id: this.model._id});
                thisUser.destroy({
                    success: function(){
                        alert('You just deleted this user')

                        Backbone.history.fragment = ''
                        Backbone.history.navigate('#users', {trigger:true})

                    }
                })

        }
    })

    return UserView
})