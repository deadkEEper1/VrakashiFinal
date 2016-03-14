define([
    'text!templates/AccountTemplate.html',
    '../collections/Posts',
    'text!templates/PostsListTemplate.html',
    '../models/User'

], function(AccountTemplate, Posts, PostsListTemplate, User){

    var AccountView = Backbone.View.extend({

        el: '#content',
        template: _.template(AccountTemplate),
        myPostsTemplate: _.template(PostsListTemplate),

        events :{
            'click #update': 'update',
            'click #saveChanges'	: 'saveChanges',
            'click #cancelUpdating' : 'cancelUpdating',

            'click #addPost'        : 'addPost',
            'click #delete'         : 'deleteAccount'
        },

        initialize: function(){
            var self = this;
            var posts = new Posts();
            var id = this.model._id;

                posts.fetch({
                    async: false,
                    url: '/posts/' + id ,
                    success: function(res, posts){
                        self.myPosts = posts
                    }
                })
        },

        render: function(){
            var self = this;
            var myPosts = this.myPosts

            this.$el.html(self.template(this.model));
            if(myPosts.length){
                $('#posts_list').html(this.myPostsTemplate(myPosts))
            }
        },

        update: function(){
            $("#edit").show()
        },

        saveChanges: function(){
            var newName = $('#newName').val();
            var newEmail = $('#newEmail').val();

            if(newName && newEmail){
                var user = new User({_id: this.model._id});
                user.save({
                        name: newName,
                        email: newEmail
                    },
                    {
                        success:function(){
                            alert('Your information changed and saved');

                            Backbone.history.fragment = '';
                            Backbone.history.navigate('#myaccount', {trigger: true})
                        },

                        error: function(res, obj){
                            alert(obj.responseText)
                        }
                    })
            }else{
                alert('Please, enter new name and email')
            }
        },

        cancelUpdating: function(){
            $('#edit').hide()
        },

        addPost: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#newpost', {trigger: true})
        },

        deleteAccount: function(){
            var condirmDeleting = confirm('Are you sure want to delete your account?');

            if(condirmDeleting){
                var id = this.model._id;
                var user = new User({_id: id});

                    user.destroy({
                        success: function(){
                            alert('Your account was deleted.');
                            Backbone.history.navigate('#', {trigger: true});
                        }
                    })
            }
        }
    });

    return AccountView
});