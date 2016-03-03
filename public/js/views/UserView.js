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
            'click #deleteThisUser' : 'deleteThisUser',
            'click .sendReq'          : 'sendFriendReq',
            'click .accept'           : 'acceptFriend',
            'click .waitForAccept'    : 'waitingForAccept',
            'click .removeFromFriends'               : 'removeFromFriends'
        },

        initialize: function(){
            var self = this;
            this.usersPosts = null;

            var usersPosts = new Posts();

                usersPosts.fetch({
                    url: '/posts/' + this.model._id,
                    async: false,

                    success: function(res, posts){
                        self.usersPosts = posts
                    }
                });


        },

        render: function(){
            console.log('rendered')
            var self = this;
            $.ajax({
                url: '/session',
                method: 'GET',

                success: function(user){
                    var friends =  user.friends;
                    var $friendBtn = $('#friendButton');
                    var $buttons = $('#buttons')

                    if(friends.incomeRequests.some(function(contact){
                            return contact._id === self.model._id
                        })){


                        $buttons.html('<button class="accept">Accept</button>')
                    }

                    if(friends.friends.some(function (contact) {
                            return contact._id === self.model._id
                        })){

                        $buttons.html('<button class="friends">Your friend </button>')
                        $buttons.append('<button class="removeFromFriends"> Delete</button>');

                        if(self.usersPosts.length){
                            console.log('Friends ');
                            $('#posts_list').html(self.usersPostsTemplate(self.usersPosts))
                        }else{
                            $('#posts_list').html('This user has no posts yet')
                        }
                    }
                    if(friends.outcomeRequests.some(function (contact) {
                            return contact._id === self.model._id
                        })){
                        //$friendBtn.removeClass('sendReq');
                        //$friendBtn.addClass('waitForAccept');

                        $buttons.html('<button class="waitForAccept">Waiting for accepting</button>')
                    }

                    if(user.admin){
                        $('#adminScope').html('<button id="deleteThisUser" class="btn btn-danger">Delete User(Admin button) </button>')

                    }
                }
            })
            this.$el.html(this.template(this.model));


        },

        deleteThisUser : function(){
            var thisUser = new User({_id: this.model._id});

                thisUser.destroy({
                    success: function(){
                        alert('You just deleted this user');

                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#users', {trigger:true})

                    }
                })
        },

        sendFriendReq : function(){
            var self = this
            $.ajax({
                method: 'POST',
                url: '/user/'+this.model._id+'/friends',

                data:{
                    _id: this.model._id
                },

                success: function () {
                    self.render()
                },

                error: function(err){
                    console.log('Error')
                }
            });



        },

        acceptFriend: function(){
            var userId = this.model._id;
            var self = this;

            $.ajax({
                url: '/user/'+userId+'/friends',
                method: 'PUT',

                data: {
                    _id: userId
                },

                success: function(){
                    self.render()
                }
            });
        },

        waitingForAccept: function(){
            alert('Waiting for accepting')
        },

        removeFromFriends: function(){
            console.log('Delete Friend')
        }
    });

    return UserView
});