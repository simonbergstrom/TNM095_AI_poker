//The main file for the game logic.
'use strict';

function Game(){
  this.player1 = { //Player
    name : "Player",
    cardsOnHand : {},
    money : 100
  };
  this.player2 = { //Computer
    name : "Computer",
    cardsOnHand : {},
    money : 100
  };

  //The cards on the table
  this.flop = {};
  this.turnCard = {};
  this.riverCard = {};


  this.aiPlayer = {};

  this.deckOfCards = new Cards();
  this.deckOfCards.shuffle();

  this.availableMoves = {
    "call": false,
    "bet": true,
    "check":true,
    "raise":false,
    "fold": false
  };
}


Game.prototype.playRound = function(){

  //******************************
  //Dealer deals the pocket Cards.
  //******************************

  this.player1.cardsOnHand = this.deckOfCards.getPocket();
  this.player2.cardsOnHand = this.deckOfCards.getPocket();

  //Bet will happen here.
  //Fold, Call etc...

  this.makeMove(this.player1);

  //******************************
  //Dealer deals the flop Cards.
  //******************************
  this.flop = this.deckOfCards.getFlop();

  //Betting again......
  //Bettingloop, if raise gör ett till varv

  //******************************
  //Dealer deals the turn Card.
  //******************************
  this.turnCard = this.deckOfCards.getOneCard();

  //Betting......

  //******************************
  //Dealer deals the river Card.
  //******************************
  this.riverCard = this.deckOfCards.getOneCard();

  //SHOWDOWN!!!!!!!!!


  console.log(this.player1, this.player2, this.flop, this.turnCard, this.riverCard);
};


Game.prototype.makeMove = function(player){
  //This function just figures out what move the player has to make?
  //Then call another function for just that move?
  //Only enable the buttons. The listeners live in main.js.
  //Should work since this instance of the object lives in main.js.
  if(player.name === "Player"){
    //Activate the buttons and wait for input
    if(this.availableMoves.call){
      $("#callButton").removeClass("button-disabled");
      $("#callButton").attr("disabled", false);
    }
    if(this.availableMoves.bet){
      $("#betButton").removeClass("button-disabled");
      $("#betButton").attr("disabled", false);
    }
    if(this.availableMoves.check){
      $("#checkButton").removeClass("button-disabled");
      $("#checkButton").attr("disabled", false);
    }
    if(this.availableMoves.raise){
      $("#raiseButton").removeClass("button-disabled");
      $("#raiseButton").attr("disabled", false);
    }
    if(this.availableMoves.fold){
      $("#foldButton").removeClass("button-disabled");
      $("#foldButton").attr("disabled", false);
    }
  }
  else if(player.name === "Computer"){
    //Run AI loop and then call function to do?
  }


};

//Calculate winner
Game.prototype.showDown = function(){

};

//Method stubs, maybe useful. I don't know.
Game.prototype.call = function(){

};

Game.prototype.bet = function(){
  this.availableMoves.call = true;
  this.availableMoves.bet = false;
  this.availableMoves.check = false;
  this.availableMoves.raise = true;
  this.availableMoves.fold = true;
};

Game.prototype.check = function(){
  console.log("check!");
  this.availableMoves.call = false;
  this.availableMoves.bet = true;
  this.availableMoves.check = true;
  this.availableMoves.raise = false;
  this.availableMoves.fold = false;
};

Game.prototype.raise = function(){

};

Game.prototype.fold = function(){

};

function evaluateCards(cardsOnHand,flop,turnCard,riverCard){
  //Evaluate a players hand and return the best combination of five cards for the player with some kind of type of score

  // 1) Trim from 7 to 5 best cards....

  // 2) Create Histogram of the cards numbers...

  // 3) Check if it's a flush

  // 4) Check if it's a straight

  // 5) Check if it's a straight flush

  // 6) If no match in the previous it's High Card

  // 7) Evaluate!

}
