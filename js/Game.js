//The main file for the game logic.

function Game(){
  this.player1 = { //Player
    cardsOnHand : {
        "card1" : {},
        "card2" : {}
    }
  };
  this.player2 = { //Computer
    cardsOnHand : {
        "card1" : {},
        "card2" : {}
    }
  };
  this.cardsOnTable = {};
  this.aiPlayer = {};

  this.deckOfCards = new Cards();
  this.deckOfCards.shuffle();

  console.log(this.player1, this.player2, this.deckOfCards);
}


Game.prototype.playRound = funtion(){
  
};
