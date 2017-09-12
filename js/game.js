const Furry = require('./furry.js');
const Coin = require('./coin.js');

class Game{
    constructor(){
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
    }

    index(x, y){
        return x + (y * 10);
    }

    showFurry(){
        this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    }

    showCoin(){
        this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
    }

    startGame(){
        this.showFurry();
        this.showCoin();
        this.furryInterval = setInterval(() => {
            this.moveFurry();
        }, 250);
    }

    moveFurry(){
        this.hideVisibleFurry();
        if(this.furry.direction === "right") {
            this.furry.x++;
        } else if(this.furry.direction === "left") {
            this.furry.x--;
        } else if(this.furry.direction === "down") {
            this.furry.y++;
        } else if(this.furry.direction === "up") {
            this.furry.y--;
        };

        this.checkCoinCollision();
        this.gameOver();
        if(this.furry.x <= 9 && this.furry.x >= 0){
            this.showFurry();
        }
    }

    hideVisibleFurry(){
        let divFurry = document.querySelector('.furry');
        if (divFurry != null) {
            divFurry.classList.remove('furry');
        };
    }

    turnFurry(event){
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        };
    }

    checkCoinCollision(){
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.score++;
            document.querySelector('#score strong').innerHTML = this.score;
            document.querySelector('.coin').classList.remove('coin');
            this.coin = new Coin();
            this.showCoin();
        };
    }

    gameOver(){
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
            this.hideVisibleFurry();
            clearInterval(this.furryInterval);
            document.querySelector('#over h2').innerHTML = `Points: ${this.score}`
            document.querySelector('#over').style.display = 'block';
            document.querySelector('#over').classList.add('fadeInUpBig');
        };
    }
}

module.exports = Game;
