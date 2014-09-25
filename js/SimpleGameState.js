function SimpleGameState(){

}
SimpleGameState.prototype.initFromGameState = function(state, move){
	this.bigBlind = state.bigBlind === 1 ? "human" : "ai";
	this.move = move;
	this.player = "ai";
	this.playerMoney = {"human": state.player1.money, "ai": state.player2.money};
	this.turn = state.turn;
	this.pot = state.moneyPot;
	this.cardOnHand = [state.player2.cardsOnHand.card1, state.player2.cardsOnHand.card1];
	this.cardsOnTable = [jQuery.extend(true, {}, state.flop.card1), jQuery.extend(true, {}, state.flop.card2),jQuery.extend(true, {}, state.flop.card3),
						 jQuery.extend(true, {}, state.turnCard), jQuery.extend(true, {}, state.riverCard)];
	this.availableMoves = jQuery.extend(true, {}, state.availableMoves);
	this.numberOfTimesRaised = state.numberRaised;
}
SimpleGameState.prototype.initFromSimpleState = function(state){
	this.player = state.player === "human" ? "ai" : "human";
	this.bigBlind = state.bigBlind;
	this.playerMoney = {"human": state.playerMoney["human"], "ai": state.playerMoney["ai"]};
	this.turn = state.turn;
	this.pot = state.pot;
	this.cardOnHand = state.cardOnHand;
	this.cardsOnTable = [jQuery.extend(true, {}, state.cardsOnTable[0]), jQuery.extend(true, {}, state.cardsOnTable[1]),jQuery.extend(true, {}, state.cardsOnTable[2]),
						 jQuery.extend(true, {}, state.cardsOnTable[3]), jQuery.extend(true, {}, state.cardsOnTable[4])];

	this.availableMoves = jQuery.extend(true, {}, state.availableMoves);
	this.numberOfTimesRaised = state.numberOfTimesRaised;
}
SimpleGameState.prototype.makeMove = function(move){
	var newState = new SimpleGameState();
	newState.initFromSimpleState(this);
	newState.move = move;
	newState.resetMoves();

	if(move === "check"){
		if((newState.player === "human" && newState.humanMoney > 0) || (newState.player === "ai" && newState.aiMoney > 0)){
			newState.availableMoves.bet = true;
		} 
        newState.availableMoves.check = true;

		if(newState.player === this.bigBlind){
			this.turn++;	
		}
	}
	else if(move === "fold"){
		if(newState.player === "human"){
			newState.playerMoney.ai += newState.pot;
		}
		else{
			newState.playerMoney.human += newState.pot;
		}
	}
	else if(move === "raise"){
		if(((newState.player === "human" && newState.humanMoney > 1) || (newState.player === "ai" && newState.aiMoney > 1)) && newState.numberOfTimesRaised < 6){
			newState.availableMoves.raise = true;
		}
        newState.availableMoves.call = true;
        newState.availableMoves.fold = true;

    	newState.playerMoney[newState.player] -= 2;
    	newState.pot += 2;

		newState.numberOfTimesRaised++;
	}
	else if(move === "bet"){
		if((newState.player === "human" && newState.humanMoney > 1) || (newState.player === "ai" && newState.aiMoney > 1)){
			newState.availableMoves.raise = true;
		}
        newState.availableMoves.call = true;
        newState.availableMoves.fold = true;

        newState.playerMoney[newState.player] -= 1;
        newState.pot += 1;
	}
	else if(move === "call"){
		newState.playerMoney[newState.player] -= 1;
        newState.pot += 1;

        if((newState.player === "human" && newState.humanMoney > 0) || (newState.player === "ai" && newState.aiMoney > 0)){
			newState.availableMoves.bet = true;
		}
        newState.availableMoves.check = true;

        this.turn++;
	}
	return newState;
}
SimpleGameState.prototype.resetMoves = function(){
	for(move in this.availableMoves){
		this.availableMoves[move] = false;
	}
}
SimpleGameState.prototype.getAvailableMoves = function(){
	var tmp = [];
	for(move in this.availableMoves){
		if(this.availableMoves[move]){
			tmp.push(move);
		}
	}
	return tmp;
}