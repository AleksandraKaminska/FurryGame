/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(3);
var Coin = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener('DOMContentLoaded', function () {
  var Game = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Coin = function() {
  this.x = Math.floor(Math.random()*10);
  this.y = Math.floor(Math.random()*10);
}

module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Furry = function(){
  this.x = 0;
  this.y = 0;
  this.direction = 'right';
}

module.exports = Furry;


/***/ })
/******/ ]);