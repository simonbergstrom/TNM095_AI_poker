//The main file for the game logic.

function Game(){
  this.player1 = { //Player
    cardsOnHand : {}
  };
  this.player2 = { //Computer
    cardsOnHand : {}
  };

  //The cards on the table
  this.flop = {};
  this.turnCard = {};
  this.riverCard = {};


  this.aiPlayer = {};

  this.deckOfCards = new Cards();
  this.deckOfCards.shuffle();

  //console.log(this.player1, this.player2, this.deckOfCards);
}


Game.prototype.playRound = function(){

  //******************************
  //Dealer deals the pocket Cards.
  //******************************

  this.player1.cardsOnHand = this.deckOfCards.getPocket();
  this.player2.cardsOnHand = this.deckOfCards.getPocket();

  //Bet will happen here.
  //Fold, Call etc...


  //******************************
  //Dealer deals the flop Cards.
  //******************************
  this.flop = this.deckOfCards.getFlop();

  //Betting again......

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
