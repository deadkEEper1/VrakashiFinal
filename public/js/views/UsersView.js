define([
        'text!templates/UsersTemplate.html'
    ],
    function(UsersTemplate) {

        var UsersView = Backbone.View.extend({
            el: '#content',
            template: _.template(UsersTemplate),

            initialize: function(){
                console.log('UsersView inited')
            },

            render: function(){
                this.$el.html(this.template(this.collection))
            }

        });

        return UsersView
    });