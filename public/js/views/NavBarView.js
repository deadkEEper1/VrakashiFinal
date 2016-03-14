define([
    'text!templates/NavBarTemplate.html'
], function(NavBarTemplate){

    var NavBarView = Backbone.View.extend({

        el: '#navBar',
        template: _.template(NavBarTemplate),


        initialize: function(){
            console.log('Navigation Bar Inited')
        },

        render: function(){
            this.$el.html(this.template)
        }
    });

    return NavBarView
});