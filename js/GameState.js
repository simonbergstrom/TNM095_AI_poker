//The main file for the game logic.

function GameState(){
  this.player1 = { //Player
    name : "Player",
    cardsOnHand : {},
    money : 20
  };
  this.player2 = { //Computer
    name : "Computer",
    cardsOnHand : {},
    money : 20
  };

  //The cards on the table
  this.flop = {};
  this.turnCard = {};
  this.riverCard = {};


  //this.aiPlayer = {};

  this.deckOfCards = new Cards();
  this.deckOfCards.shuffle();

  this.moneyPot = 0;

  //Give the players their cards.
  this.player1.cardsOnHand = this.deckOfCards.getPocket();
  this.player2.cardsOnHand = this.deckOfCards.getPocket();

  //Moves available first round
  this.availableMoves = {
    "call": false,
    "bet": true,
    "check":true,
    "raise":false,
    "fold": false
  };

  this.turn = 1;
}

//Getters
GameState.prototype.getHumanPlayerCards = function(){
  return this.player1.cardsOnHand;
};

GameState.prototype.getHumanPlayer = function(){
  return this.player1;
}

GameState.prototype.doMove = function(player, move){
  switch(this.turn){
    case 1:{
        var validMoves = this.getAvailableMoves();
        console.log(validMoves);
        if(validMoves[move]){
          this.moveHelper(player, move);
        }
        else{
          console.log("Invalid Move");
        }
      break;
    }
    case 2:{
      //Dealer deals the turn card.
      this.turnCard = this.deckOfCards.getOneCard();
      break;
    }
    case 3:
      //Do shit
      break;
    case 4:
      //Do shit
      break;
    case 5:
      //Do shit
      //Evaluate cards maybe
      break;
    default:
      console.log("Game Over");
      break;
  }
};

GameState.prototype.moveHelper = function(player, move){
  if(move === "call"){

  }
  else if(move === "bet"){
    this.bet(player);
  }
  else if(move === "check"){

  }
  else if(move === "raise"){

  }
  else if(move === "fold"){

  }
};

GameState.prototype.updateButtons = function(){
  if(this.availableMoves.call){
    $("#callButton").removeClass("button-disabled");
    $("#callButton").attr("disabled", false);
  }
  else{
    $("#callButton").addClass("button-disabled");
    $("#callButton").attr("disabled", true);
  }

  if(this.availableMoves.bet){
    $("#betButton").removeClass("button-disabled");
    $("#betButton").attr("disabled", false);
  }
  else{
    $("#betButton").addClass("button-disabled");
    $("#betButton").attr("disabled", true);
  }

  if(this.availableMoves.check){
    $("#checkButton").removeClass("button-disabled");
    $("#checkButton").attr("disabled", false);
  }
  else{
    $("#checkButton").addClass("button-disabled");
    $("#checkButton").attr("disabled", true);
  }

  if(this.availableMoves.raise){
    $("#raiseButton").removeClass("button-disabled");
    $("#raiseButton").attr("disabled", false);
  }
  else{
    $("#raiseButton").addClass("button-disabled");
    $("#raiseButton").attr("disabled", true);
  }

  if(this.availableMoves.fold){
    $("#foldButton").removeClass("button-disabled");
    $("#foldButton").attr("disabled", false);
  }
  else{
    $("#foldButton").addClass("button-disabled");
    $("#foldButton").attr("disabled", true);
  }
};

GameState.prototype.getAvailableMoves = function(){
  var res = {};
  for(var key in this.availableMoves){
    if(this.availableMoves[key]){
      res[key] = this.availableMoves[key];
    }
  }
  return res;
};

GameState.prototype.call = function(){

}

GameState.prototype.bet = function(player){
  if(player.name === "Player"){ // The human player
    this.player1.money--;
  }
  else{ // The computer player
    this.player2.money--;
  }
  this.moneyPot++;

  this.availableMoves.call = true;
  this.availableMoves.bet = false;
  this.availableMoves.check = false;
  this.availableMoves.raise = true;
  this.availableMoves.fold = true;
}

GameState.prototype.check = function(){

}

GameState.prototype.raise = function(){

}

GameState.prototype.fold = function(){

}

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
