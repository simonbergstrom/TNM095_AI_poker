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
