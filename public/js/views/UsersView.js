define([
        'text!templates/UsersTemplate.html',
    ],
    function(UsersTemplate) {

        var UsersView = Backbone.View.extend({
            el: '#content',

            events: {

            },

            template: _.template(UsersTemplate),
            initialize: function(){
                console.log('UsersView inited')
                console.log(this.collection)

            },

            render: function(){
                this.$el.html(this.template(this.collection))
            },
        })

        return UsersView
    })