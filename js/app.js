document.addEventListener('DOMContentLoaded', function () {
  var Game = require("./game");

  var game = new Game();
  game.showFurry();
  game.showCoin();
  game.startGame();
  document.addEventListener('keydown', function(event){
    game.turnFurry(event);
  });

  var again = document.querySelector(".button");
  again.addEventListener('click', function() {
    var newGame = new Game();
    var over = document.querySelector('#over');
    over.classList.add("invisible");

    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();
    document.addEventListener('keydown', function(event){
      newGame.turnFurry(event);
    });
  });
});
