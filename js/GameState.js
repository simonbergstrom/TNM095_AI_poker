//The main file for the game logic.

function GameState(){
  removeCards();

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
  drawCard("player1_card1", this.player1.cardsOnHand.card1);
  drawCard("player1_card2", this.player1.cardsOnHand.card2);

  this.player2.cardsOnHand = this.deckOfCards.getPocket();
  drawCard("player2_card1", {suit: "Secret", number: ""});
  drawCard("player2_card2", {suit: "Secret", number: ""});

  //Moves available first round
  this.availableMoves = {
    "call": false,
    "bet": true,
    "check":true,
    "raise":false,
    "fold": false
  };

  this.turn = 1;
  this.numberRaised = 0;
}

//Static roundCounter
GameState.roundCounter = 0;

//Getters
GameState.prototype.getHumanPlayerCards = function(){
  return this.player1.cardsOnHand;
};

GameState.prototype.getHumanPlayer = function(){
  return this.player1;
}

GameState.prototype.doMove = function(player, move){
  var validMoves = this.getAvailableMoves();
  if(validMoves[move]){
    this.moveHelper(player, move);
  }
  else{
    console.log("Invalid Move");
  }
};

GameState.prototype.startNewRound = function(){
  console.log("Starting new round!");
  console.log("Dealing cards...");

  console.log("TURN: ", this.turn);

  this.availableMoves.call = false;
  this.availableMoves.bet = true;
  this.availableMoves.check = true;
  this.availableMoves.raise = false;
  this.availableMoves.fold = false;

  this.updateButtons();

  switch(this.turn){
    case 2:{
      this.flop = this.deckOfCards.getFlop();
      drawCard("dealer_card1", this.flop.card1);
      drawCard("dealer_card2", this.flop.card2);
      drawCard("dealer_card3", this.flop.card3);
      console.log("The flop: ", this.flop);
      break;
    }
    case 3:{
      this.turnCard = this.deckOfCards.getOneCard();
      drawCard("dealer_card4", this.turnCard);
      console.log("The turnCard: ", this.turnCard);
      break;
    }
    case 4:{
      this.riverCard = this.deckOfCards.getOneCard();
      drawCard("dealer_card5", this.riverCard);
      console.log("The turnCard: ", this.riverCard);
      break;
    }
    case 5:{
      //TODO the evaluation
      console.log("Figure out the winner!");
      var cardstoEvalplayer1 = [],cardstoEvalplayer2 = [];

      cardstoEvalplayer1 = [gameState.player1.cardsOnHand.card1,gameState.player1.cardsOnHand.card2,this.flop.card1,this.flop.card2,this.flop.card3,this.turnCard,this.riverCard];
      cardstoEvalplayer2 = [gameState.player2.cardsOnHand.card1,gameState.player2.cardsOnHand.card2,this.flop.card1,this.flop.card2,this.flop.card3,this.turnCard,this.riverCard];
      
      var res1 = rankHand(cardstoEvalplayer1);
      var res2 = rankHand(cardstoEvalplayer2);

      if(res1.primeScore == res2.primeScore){
        if(res1.secondaryScore > res2.secondaryScore){
          console.log("Player 1 wins with:",res1);
        }
        else if(res1.secondaryScore == res2.secondaryScore) {

          console.log("We have tie!!!");
        }
        else{
            console.log("Player 2 wins with: ",res2);
        }
      }
      else if (res1.primeScore > res2.primScore){
            console.log("Player 1 wins with: ",res1);
      }
      else{
            console.log("Player 2 wins with: ",res2); 
      }

    }
  }
};


GameState.prototype.moveHelper = function(player, move){
  if(move === "call"){
    this.call(player);
  }
  else if(move === "bet"){
    this.bet(player);
  }
  else if(move === "check"){
    this.check(player);
  }
  else if(move === "raise"){
    this.raise(player);
  }
  else if(move === "fold"){
    this.fold(player);
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


//All the moves the players can do.
GameState.prototype.call = function(player){

  //TODO Add the right number of money in the pot

  this.turn++;
  this.startNewRound();

  console.log(player.name + " called");
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

  console.log(player.name + " made a bet!");
}

GameState.prototype.check = function(player){
  this.availableMoves.call = false;
  this.availableMoves.bet = true;
  this.availableMoves.check = true;
  this.availableMoves.raise = false;
  this.availableMoves.fold = false;

  if(player.name === "Computer"){
    this.turn++;
    this.startNewRound();
  }

  //Nothing else do be done really. When checking?
  console.log(player.name + " checked!");
};

GameState.prototype.raise = function(player){
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

  if(player.name === "Computer"){
    this.numberRaised++;
    if(this.numberRaised === 3){
      this.turn++;
      this.startNewRound();
    }
  }

  console.log(player.name + " raised!");
};

GameState.prototype.fold = function(player){
  console.log(player.name + " lost!");
  //All the money goes to the other player! TODO
};

GameState.prototype.enemyMakeRandomMove = function(){
  //Generate random number between 1 and 5.
  while(true){ //Dangerous while true!
    var randomMove = Math.floor((Math.random() * 5) + 1);
    var availableMoves = this.getAvailableMoves();
    var computerMove;

    if(randomMove === 1){
      computerMove = "call";
    }
    else if(randomMove === 2){
      computerMove = "bet";
    }
    else if(randomMove === 3){
      computerMove = "check";
    }
    else if(randomMove === 4){
      computerMove = "raise";
    }
    else if(randomMove === 5){
      computerMove = "fold";
    }
    
    if(availableMoves[computerMove]){
      this.doMove(this.player2, computerMove);
      this.updateButtons();
      break;
    }
  }
};

GameState.prototype.enemyMakeAiMove = function(){

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
