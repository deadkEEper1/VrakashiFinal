define([
    'text!templates/NavBarTemplate.html'
], function(NavBarTemplate){

    var NavBarView = Backbone.View.extend({
        el: '#navBar',
        template: _.template(NavBarTemplate),


        events:{
            'click #logOut'      : 'logOut'
        },

        initialize: function(){
            console.log('Navigation Bar Inited')
        },

        render: function(){
            this.$el.html(this.template)
        },


        logOut: function(){
            $.ajax({
                method: 'DELETE',
                url: '/session',
                success: function(){
                    Backbone.history.navigate('#', {trigger: true})
                }
            });

            this.undelegateEvents();
            this.$el.html('')
        },

        showAllUser: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger:true})
        },

        showAllPosts: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger:true})
        },

        myAccount: function(){

            Backbone.history.fragment = '';
            Backbone.history.navigate('#myaccount', {trigger:true})
        }
    });

    return NavBarView
});