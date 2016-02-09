define([
    'text!templates/GameTemplate.html',

], function(GameTemplate){
    var GameView = Backbone.View.extend({
        el: '#content',

        template: _.template(GameTemplate),

        events: {
            'click .game': 'startTheGame'
        },

        initialize: function () {
            console.log('Game view inited')

        },

        render: function(){
            this.$el.html(this.template)
        },

        startTheGame: function(e){
            var usersChoice = e.currentTarget.id;
            var computerChoice;

            var random = Math.random()

                if(random <= 0.33){
                    computerChoice = 'rock'
                }else if( random <= 0.66){
                    computerChoice = 'paper'
                }else{
                    computerChoice = 'scisors'
                }

            console.log(random, computerChoice);

            if(usersChoice === computerChoice){
                alert('Dead heat, try again')
            }else{

                switch (usersChoice){
                    case 'rock':
                        if(computerChoice == 'paper'){
                            alert('You lose, rock defeated by paper')
                        }else{
                            alert('You won, rock smashed the scisors')
                        }
                        break;
                    case 'paper':
                        if(computerChoice == 'rock'){
                            alert('You won, paper smashed the rock')
                        }else{
                            alert('You lose, scissors cut your paper')
                        }
                        break;
                    case 'scisors':
                        if(computerChoice == 'rock'){
                            alert('You lose, scisors smashed by rock')
                        }else{
                            alert('You won, your scissors cut paper')
                        }
                        break;
                }

            }


            //var theGame = function(usersChoice){
            //    var random = Math.random()
            //        console.log(random)
            //
            //        if( random <= 0.33){
            //            computerChoice = 'rock'
            //        } else if(random <= 0.66){
            //            computerChoice = 'paper'
            //        }else{
            //            computerChoice = 'scisors'
            //        }
            //
            //        console.log("Computer choice is: " + computerChoice)
            //
            //
            //    if(usersChoice == computerChoice){
            //            alert('Dead heat, try again.')
            //        }else if(
            //            usersChoice    == 'rock' &&
            //            computerChoice == 'paper'
            //        ){
            //            alert('Lose')
            //        }else if(
            //            usersChoice    == 'rock'    &&
            //            computerChoice == 'scisors'
            //        ){
            //            alert('Win')
            //        }else if(
            //            usersChoice     == 'paper'  &&
            //            computerChoice  == 'rock'
            //        ){
            //            alert('Win')
            //        }else if(
            //            usersChoice     == 'paper'  &&
            //            computerChoice  == 'scisors'
            //        ){
            //            alert('Lose')
            //        }else if(
            //            usersChoice     == 'scisors' &&
            //            computerChoice  == 'rock'
            //        ){
            //            alert('Lose')
            //        }else{
            //            alert('Win.')
            //        }
            //
            //
            //
            //}
            //theGame(usersChoice)

        }
    })

    return  GameView
})