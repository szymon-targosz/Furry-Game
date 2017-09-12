const Game = require('./game.js');
document.addEventListener('DOMContentLoaded', function(){

    const game = new Game();
    game.startGame();
    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });

    const btnRestart = document.querySelector('#over button');
    btnRestart.addEventListener('click', function(){
        this.parentElement.classList.add('fadeOutDown');
        setTimeout(function(){
             window.location.reload()
         }, 900);

    });
});
