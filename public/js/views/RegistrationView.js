define([
    'text!templates/RegistrationTemplate.html',
    '../models/User'

], function(RegistrationTemplate, User){

    var RegistrationView = Backbone.View.extend({

        el: '#content',

        template: RegistrationTemplate,

        events: {
          'click #submit' : 'registrate',
            'click #back' : 'back'
        },

        initialize: function(){
            console.log('Registration View Inited')
        },

        render: function(){
            this.$el.html(this.template)
        },

        registrate  : function(){
            var name = $('#name').val();

            var email = $('#email').val();
            var confirmEmail = $('#confirmEmail').val();

            var password = $('#password').val();
            var confirmPassword = $('#confirmPassword').val();


            if(
                name     == '' ||
                email    == '' ||
                password == ''
            ){

                alert('Please.Enter all fields.')
                $('.registration').val('')
            }else if(
                email    !== confirmEmail ||
                password !== confirmPassword

            ){  alert('Make sure that email and passwords are mathching.');
                $('.registration').val('')

            }else{
                var newUser = new User({
                    name: name,
                    email : email,
                    password: password
                });
                newUser.save({}, {
                    success: function(res, model){
                        Backbone.history.navigate('#myaccount',{trigger: true})
                        alert('Welcome to Vrokashi, '+ model.name + ' glad to see you here)')
                        $('#newNavBar').show();

                    },

                    error: function(err, ss, m){
                        alert("User with such email is alredy exist.");

                        $('.registration').val('')
                    }
                })

            }

        },

        back        : function(){
            Backbone.history.navigate('#', {trigger: true})
        }


    });

    return RegistrationView
});