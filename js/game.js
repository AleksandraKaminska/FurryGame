var Furry = require("./furry");
var Coin = require("./coin");

var Game = function() {
  this.board = document.querySelectorAll('#board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  this.htmlScore = document.querySelector('#score strong');
  this.htmlScore.innerText = this.score;

  this.index = function(x, y) {
    return x + (y * 10);
  };

  this.hideVisibleFurry = function() {
    this.classFurry = document.querySelector('.furry');
    this.classFurry.classList.remove('furry');
  };

  this.showFurry = function() {
    this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
  };

  this.showCoin = function() {
    this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
  };

  this.moveFurry = function () {
    this.hideVisibleFurry();

    if (this.furry.direction === 'right') {
      this.furry.x += 1;
    }
    else if (this.furry.direction === 'left') {
      this.furry.x -= 1;
    }
    else if (this.furry.direction === 'up') {
      this.furry.y -= 1;
    }
    else if (this.furry.direction === 'down') {
      this.furry.y += 1;
    }

    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
  };

  this.startGame = function() {
    var self = this;
    this.idSetInterval = setInterval( function() {
        self.moveFurry();
      }, 250);
  };

  this.turnFurry = function(event) {
    switch (event.which) {
      case 37:
        this.furry.direction = 'left';
        break;
      case 38:
        this.furry.direction = 'up';
        break;
      case 39:
        this.furry.direction = 'right';
        break;
      case 40:
        this.furry.direction = 'down';
    }
  };

  this.checkCoinCollision = function () {
    if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
      this.board[ this.index(this.coin.x, this.coin.y) ].classList.remove('coin');

      this.score++;
      this.htmlScore.innerText = this.score;

      this.coin = new Coin();
      this.showCoin();
    }
  };

  this.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      clearInterval(this.idSetInterval);
      this.board[ this.index(this.coin.x, this.coin.y) ].classList.remove('coin');

      this.over = document.querySelector('#over');
      this.over.classList.remove("invisible");

      this.result = over.querySelector("span");
      this.result.innerText = ' ' + this.score;

      this.hideVisibleFurry();
    }
  };
};

module.exports = Game;
